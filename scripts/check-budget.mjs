// Fails the build when the page outgrows its weight budget (see issues/008-set-quality-bar.md).
// Runs after `astro build` as part of `npm run build`, so CI refuses to deploy an oversized page.
import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const KB = 1024;
const BUDGET = { text: 30 * KB, photo: 60 * KB, page: 100 * KB };
const dist = new URL("../dist/", import.meta.url).pathname;

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? files(path) : [path];
    }),
  );
  return nested.flat();
}

const all = await files(dist);

// Text the page loads: HTML plus any emitted CSS/JS, measured gzipped like the browser receives them.
let text = 0;
for (const file of all.filter((f) => /\.(html|css|js)$/.test(f))) {
  text += gzipSync(await readFile(file)).length;
}

// The photo's largest optimised variant (what a high-density phone downloads). Absent until it's added.
let photo = 0;
for (const file of all.filter((f) =>
  /\/_astro\/photo\.[^/]+\.(webp|avif|jpe?g|png)$/.test(f),
)) {
  photo = Math.max(photo, (await stat(file)).size);
}

const page = text + photo;
const rows = [
  ["HTML + CSS + JS (gzip)", text, BUDGET.text],
  ["Photo (largest variant)", photo, BUDGET.photo],
  ["Whole page", page, BUDGET.page],
];

let over = false;
for (const [label, size, budget] of rows) {
  const ok = size <= budget;
  over ||= !ok;
  console.log(
    `${ok ? "✓" : "✗"} ${label.padEnd(26)} ${(size / KB).toFixed(1).padStart(6)} KB / ${budget / KB} KB`,
  );
}

if (over) {
  console.error("Page-weight budget exceeded (issues/008-set-quality-bar.md).");
  process.exit(1);
}
