// @ts-check
import { defineConfig } from "astro/config";

// Fully static output (Choose the stack), served from GitHub Pages at the root URL (Choose the hosting platform).
export default defineConfig({
  site: "https://ehelgueroc.github.io",
  output: "static",
});
