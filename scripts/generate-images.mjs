// Generates the link-preview card and favicons into public/ (see issues/007-define-page-metadata.md).
// Run by hand when the name, title or subline change:  npm run images
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const intro = await readFile(
  new URL("../src/content/intro.md", import.meta.url),
  "utf8",
);
const field = (key) =>
  intro.match(new RegExp(`^${key}: (.+)$`, "m"))?.[1].trim() ?? "";
const escape = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const name = escape(field("name"));
const title = escape(field("title"));
const subline = escape(field("subline"));
const initials = field("name")
  .split(" ")
  .slice(0, 2)
  .map((part) => part[0])
  .join("");
const url = "ehelgueroc.github.io";
const font = "Helvetica Neue, Helvetica, Arial, sans-serif";

const gradients = `
  <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#6d4aff" />
    <stop offset="1" stop-color="#00b3d6" />
  </linearGradient>
  <linearGradient id="title" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#a593ff" />
    <stop offset="1" stop-color="#3cc8e6" />
  </linearGradient>
  <linearGradient id="tile" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#6d4aff" />
    <stop offset="1" stop-color="#0a7f9c" />
  </linearGradient>`;

const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>${gradients}</defs>
  <rect width="1200" height="630" fill="#0e0f16" />
  <rect x="0" y="0" width="12" height="630" fill="url(#accent)" />
  <rect x="96" y="96" width="96" height="96" rx="24" fill="url(#tile)" />
  <text x="144" y="160" text-anchor="middle" font-family="${font}" font-size="40" font-weight="700" fill="#ffffff">${initials}</text>
  <text x="96" y="330" font-family="${font}" font-size="76" font-weight="800" letter-spacing="-2" fill="#eef0f8">${name}</text>
  <text x="96" y="400" font-family="${font}" font-size="40" font-weight="700" fill="url(#title)">${title}</text>
  <text x="96" y="458" font-family="${font}" font-size="28" fill="#9aa0b8">${subline}</text>
  <text x="96" y="550" font-family="${font}" font-size="26" font-weight="600" fill="#a593ff">${url}</text>
</svg>`;

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <defs>${gradients}</defs>
  <rect width="64" height="64" rx="14" fill="url(#tile)" />
  <text x="32" y="42" text-anchor="middle" font-family="system-ui, -apple-system, ${font}" font-size="28" font-weight="800" fill="#ffffff">${initials}</text>
</svg>`;

const out = (file) => new URL(`../public/${file}`, import.meta.url);

await writeFile(out("favicon.svg"), `${favicon}\n`);
await sharp(Buffer.from(card)).png().toFile(out("og.png").pathname);
// The apple touch icon is shown on iOS home screens, which add their own rounding, so it's square.
await sharp(Buffer.from(favicon.replace('rx="14"', 'rx="0"')))
  .resize(180, 180)
  .png()
  .toFile(out("apple-touch-icon.png").pathname);
await sharp(Buffer.from(favicon))
  .resize(32, 32)
  .png()
  .toFile(out("favicon-32.png").pathname);

console.log(
  "Wrote public/og.png, favicon.svg, favicon-32.png, apple-touch-icon.png",
);
