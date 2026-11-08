import { test, expect } from "@playwright/test";

test.describe("Storefront & Navigation", () => {
  test("storefront homepage loads and displays placeholder", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("store");
  });

  test("admin route loads successfully", async ({ page }) => {
    await page.goto("/admin");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("admin");
  });
});
