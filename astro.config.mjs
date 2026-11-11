// @ts-check
import { defineConfig } from "astro/config";

// Fully static output (Choose the stack), served from GitHub Pages at the root URL (Choose the hosting platform).
export default defineConfig({
  site: "https://ehelgueroc.github.io",
  output: "static",
  // Inline the small stylesheet to avoid a render-blocking request (Set the performance and accessibility bar).
  build: { inlineStylesheets: "always" },
  // Content Security Policy as a <meta> tag (GitHub Pages can't send headers). Astro adds hashes for its own
  // scripts and styles to script-src/style-src, so no 'unsafe-inline' is needed. Inline style="" attributes
  // would be blocked; the code sets dynamic values through CSSOM instead.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self'",
        "font-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
      ],
    },
  },
});
