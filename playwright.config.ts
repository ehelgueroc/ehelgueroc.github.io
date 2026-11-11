import { defineConfig } from "@playwright/test";

// Behaviour tests against the production build (run `npm run build` first). They cover what the README's
// manual checklist used to: keyboard, theme switch, reduced motion, no-JS, accessibility, CSP and the CV.
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: "http://localhost:4329",
    // The installed Chrome (on the Mac and on GitHub's runners), so no browser download is needed.
    channel: "chrome",
  },
  webServer: {
    // Its own port, so it never collides with a dev server on 4321.
    command: "npx astro preview --port 4329 --ignore-lock",
    url: "http://localhost:4329",
    reuseExistingServer: !process.env.CI,
  },
});
