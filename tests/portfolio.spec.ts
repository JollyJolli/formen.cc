import { expect, test } from "@playwright/test";

test("project index searches, combines filters, and recovers from no results", async ({
  page,
}) => {
  await page.goto("/");
  const rows = page.locator(".index-row");
  await expect(rows).toHaveCount(25);
  await page.getByLabel("Find a project").fill("weather");
  await expect(rows).toHaveCount(1);
  await expect(rows).toContainText("Weather");
  await page.getByLabel("Category", { exact: true }).selectOption("Game");
  await expect(page.getByText("No projects found.")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(rows).toHaveCount(25);
  await page
    .getByLabel("Category", { exact: true })
    .selectOption("Contribution");
  await expect(rows).toHaveCount(3);
});

for (const width of [320, 390, 768, 1440, 1920]) {
  test(`layout and images at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Formen", level: 1 }),
    ).toBeVisible();
    const images = page.locator(".project-preview img");
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      expect(
        await image.evaluate(
          (element: HTMLImageElement) => element.naturalWidth,
        ),
      ).toBeGreaterThan(0);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: `test-results/portfolio-${width}.png`,
      fullPage: true,
      animations: "disabled",
    });
  });
}

test("keyboard skip link and section navigation work", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "about" })
    .click();
  await expect(page).toHaveURL(/#about$/);
  await expect(
    page.getByRole("navigation").getByRole("link", { name: "about" }),
  ).toHaveAttribute("aria-current", "location");
});
