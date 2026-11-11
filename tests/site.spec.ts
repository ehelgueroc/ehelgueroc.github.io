import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("accessibility", () => {
  for (const colorScheme of ["light", "dark"] as const) {
    test(`no axe violations in ${colorScheme} mode`, async ({ page }) => {
      // Reduced motion shows every section at once, so axe checks the final colours, not mid-fade ones.
      await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
      await page.goto("/");
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  }
});

test("loads without console errors or CSP violations", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  expect(errors).toEqual([]);
});

test("theme switch toggles and is remembered", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");

  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(
    page.getByRole("button", { name: "Switch to light mode" }),
  ).toBeVisible();
});

test("Timeline entries open and close from the keyboard", async ({ page }) => {
  await page.goto("/");
  const entry = page.locator(".tl details").first();
  const summary = entry.locator("summary");

  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(entry).toHaveAttribute("open", "");
  await expect(
    entry.getByText("Own the internal Renovate setup", { exact: false }),
  ).toBeVisible();

  await page.keyboard.press("Space");
  await expect(entry).not.toHaveAttribute("open"); // after the 260 ms collapse animation
});

test("Highlights count up to their real values", async ({ page }) => {
  await page.goto("/");
  const values = page.locator(".highlights .value");
  await values.first().scrollIntoViewIfNeeded();
  await expect(values).toHaveText(["15+", "40", "3", "Monthly"]);
});

test("with reduced motion everything is visible without scrolling", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const opacities = await page
    .locator("[data-reveal]")
    .evaluateAll((elements) =>
      elements.map((el) => getComputedStyle(el).opacity),
    );
  expect(opacities.length).toBeGreaterThan(0);
  expect(new Set(opacities)).toEqual(new Set(["1"]));
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("all content is visible and entries still expand", async ({ page }) => {
    await page.goto("/");
    const opacities = await page
      .locator("[data-reveal]")
      .evaluateAll((elements) =>
        elements.map((el) => getComputedStyle(el).opacity),
      );
    expect(new Set(opacities)).toEqual(new Set(["1"]));

    // The theme switch needs JS, so it's hidden rather than broken.
    await expect(page.locator(".theme-toggle")).toBeHidden();

    const entry = page.locator(".tl details").first();
    await entry.locator("summary").click();
    await expect(entry).toHaveAttribute("open", "");
  });
});

test("the CV link serves a PDF", async ({ page, request }) => {
  await page.goto("/");
  const href = await page
    .getByRole("link", { name: "Download CV (PDF)" })
    .getAttribute("href");
  expect(href).toBe("/esteban-helguero-cardiff-cv.pdf");

  const response = await request.get(href!);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("unknown pages show the 404 page with a way home", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "This page doesn't exist" }),
  ).toBeVisible();
  await page.getByRole("link", { name: /Go to/ }).click();
  await expect(page).toHaveURL("/");
});
