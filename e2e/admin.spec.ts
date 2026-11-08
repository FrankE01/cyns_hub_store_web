import { test, expect } from "@playwright/test";

test.describe("Admin Portal & CMS", () => {
  test("route guard protects /admin and redirects to login", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Sign In to Cyn's Hub Admin/i);
    await expect(page.getByLabel(/owner email address/i)).toBeVisible();
    await expect(page.getByLabel(/^password$/i)).toBeVisible();
  });

  test("rejects invalid login credentials with an error message", async ({ page }) => {
    await page.goto("/admin/login");

    await page.getByLabel(/owner email address/i).fill("wrong@cynshub.com");
    await page.getByLabel(/^password$/i).fill("wrongpassword");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Verify error alert
    const errorAlert = page.getByRole("alert").filter({ hasText: /invalid/i });
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText(/invalid email or password/i);
  });

  test("logs in with valid credentials and views dashboard KPIs", async ({ page }) => {
    await page.goto("/admin/login");

    await page.getByLabel(/owner email address/i).fill("admin@cynshub.com");
    await page.getByLabel(/^password$/i).fill("admin123456");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Verify redirected to /admin dashboard
    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByRole("heading", { name: /store performance & operations/i })).toBeVisible();

    // Verify KPI indicators
    await expect(page.getByText(/revenue collected/i)).toBeVisible();
    await expect(page.getByText(/pending fulfillment/i)).toBeVisible();
    await expect(page.getByText(/active pre-orders/i)).toBeVisible();
  });

  test("navigates to orders & dispatch management", async ({ page }) => {
    // Log in first
    await page.goto("/admin/login");
    await page.getByLabel(/owner email address/i).fill("admin@cynshub.com");
    await page.getByLabel(/^password$/i).fill("admin123456");
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page).toHaveURL(/\/admin$/);

    // Navigate to /admin/orders
    await page.goto("/admin/orders");
    await expect(page.getByRole("heading", { name: /order management & dispatch/i })).toBeVisible();
    await expect(page.getByText(/ama owusu/i).first()).toBeVisible();
  });
});
