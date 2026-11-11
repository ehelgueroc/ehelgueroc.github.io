// Prints dist/cv/index.html to the downloadable CV with headless Chrome (see issues/010-decide-cv-download.md).
// Runs after `astro build` as part of `npm run build`. It fails the build when Chrome is missing, the PDF
// isn't produced, or the CV runs past 2 pages, so the Contact Section never links to a missing or bloated CV.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { pathToFileURL } from "node:url";

const MAX_PAGES = 2;
const dist = new URL("../dist/", import.meta.url).pathname;
const source = `${dist}cv/index.html`;
const output = `${dist}esteban-helguero-cardiff-cv.pdf`;

const fail = (message) => {
  console.error(`✗ CV: ${message}`);
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

if (!existsSync(source)) fail(`${source} not found; run astro build first`);
const chrome = findChrome();
if (!chrome)
  fail("Chrome not found (set CHROME_PATH to a Chrome or Chromium binary)");

const args = [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  `--print-to-pdf=${output}`,
  pathToFileURL(source).href,
];
if (process.getuid?.() === 0) args.unshift("--no-sandbox"); // Chrome refuses to sandbox as root (some CI images)

try {
  execFileSync(chrome, args, { stdio: "ignore", timeout: 60_000 });
} catch (error) {
  fail(`Chrome failed to print the CV (${error.message})`);
}

if (!existsSync(output) || statSync(output).size === 0)
  fail("the PDF was not produced");
const pages = (
  readFileSync(output, "latin1").match(/\/Type\s*\/Page(?!s)/g) ?? []
).length;
if (pages > MAX_PAGES)
  fail(`the CV is ${pages} pages; the limit is ${MAX_PAGES}`);

console.log(
  `✓ CV                         ${pages} page(s), ${(statSync(output).size / 1024).toFixed(1)} KB`,
);
