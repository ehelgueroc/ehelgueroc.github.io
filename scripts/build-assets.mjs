// Renders the build's binary assets from pages in dist/ with headless Chrome, so they're never committed and
// can't drift from src/content/ (issues/007-define-page-metadata.md, issues/010-decide-cv-download.md):
//   /cv/   → esteban-helguero-cardiff-cv.pdf  (A4, at most 2 pages)
//   /og/   → og.png                           (1200×630 link-preview card)
//   /icon/ → apple-touch-icon.png (180×180) and favicon-32.png
// Fonts are bundled (Inter), so output is the same on a Mac and on CI Linux. Runs after `astro build` as part
// of `npm run build`, and fails the build if Chrome is missing or anything isn't produced.
import { execFile, execFileSync } from "node:child_process";
import { existsSync, readFileSync, rmSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import sharp from "sharp";

const MAX_CV_PAGES = 2;
const dist = new URL("../dist/", import.meta.url).pathname;
const out = (file) => join(dist, file);

const fail = (message) => {
  console.error(`✗ assets: ${message}`);
  process.exit(1);
};

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ].filter(Boolean);
  for (const path of candidates) if (existsSync(path)) return path;
  for (const name of [
    "google-chrome",
    "google-chrome-stable",
    "chromium",
    "chromium-browser",
  ]) {
    try {
      return execFileSync("which", [name], { encoding: "utf8" }).trim();
    } catch {
      // Not on PATH; try the next name.
    }
  }
  return null;
}

// Serve dist/ over HTTP: the pages reference fonts by absolute path (/_astro/...), which file:// can't resolve.
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};
const server = createServer((req, res) => {
  const path = normalize(
    decodeURIComponent(new URL(req.url, "http://x").pathname),
  );
  let file = join(dist, path);
  if (!file.startsWith(dist)) return res.writeHead(403).end();
  if (existsSync(file) && statSync(file).isDirectory())
    file = join(file, "index.html");
  if (!existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, {
    "content-type": types[extname(file)] ?? "application/octet-stream",
  });
  res.end(readFileSync(file));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;

const chrome = findChrome();
if (!chrome) {
  server.close();
  fail("Chrome not found (set CHROME_PATH to a Chrome or Chromium binary)");
}

async function render(page, flags) {
  if (!existsSync(join(dist, page, "index.html")))
    fail(`dist/${page}/ not found; run astro build first`);
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--virtual-time-budget=10000", // let fonts finish loading before capturing
    ...flags,
    `${base}/${page}/`,
  ];
  if (process.getuid?.() === 0) args.unshift("--no-sandbox"); // Chrome refuses to sandbox as root
  // Async: Chrome fetches from the server running in this same process, so the event loop must stay free.
  await new Promise((resolve, reject) =>
    execFile(chrome, args, { timeout: 60_000 }, (error) =>
      error ? reject(error) : resolve(),
    ),
  ).catch((error) => fail(`Chrome failed on /${page}/ (${error.message})`));
}

const produced = (file) =>
  existsSync(out(file)) && statSync(out(file)).size > 0;

try {
  await render("cv", [
    "--no-pdf-header-footer",
    `--print-to-pdf=${out("esteban-helguero-cardiff-cv.pdf")}`,
  ]);
  await render("og", [
    "--window-size=1200,630",
    `--screenshot=${out("og.png")}`,
  ]);
  await render("icon", [
    "--window-size=180,180",
    `--screenshot=${out("apple-touch-icon.png")}`,
  ]);
} finally {
  server.close();
}

for (const file of [
  "esteban-helguero-cardiff-cv.pdf",
  "og.png",
  "apple-touch-icon.png",
]) {
  if (!produced(file)) fail(`${file} was not produced`);
}
await sharp(out("apple-touch-icon.png"))
  .resize(32, 32)
  .png()
  .toFile(out("favicon-32.png"));

const pdf = readFileSync(out("esteban-helguero-cardiff-cv.pdf"), "latin1");
const pages = (pdf.match(/\/Type\s*\/Page(?!s)/g) ?? []).length;
if (pages > MAX_CV_PAGES)
  fail(`the CV is ${pages} pages; the limit is ${MAX_CV_PAGES}`);

// The card and icon pages only exist to be captured; they aren't part of the published site.
rmSync(join(dist, "og"), { recursive: true });
rmSync(join(dist, "icon"), { recursive: true });

const size = (file) => `${(statSync(out(file)).size / 1024).toFixed(1)} KB`;
console.log(
  `✓ CV                         ${pages} page(s), ${size("esteban-helguero-cardiff-cv.pdf")}`,
);
console.log(
  `✓ Preview card + icons       og.png ${size("og.png")}, apple-touch-icon.png ${size("apple-touch-icon.png")}`,
);
