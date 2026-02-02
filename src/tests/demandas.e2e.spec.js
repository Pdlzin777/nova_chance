import { test, expect } from "@playwright/test";

test.describe("Tela de Demandas", () => {

  test("❌ Bloqueia acesso sem login", async ({ page }) => {
    await page.goto("http://localhost:3000/html/index.html");
    await expect(page).toHaveURL(/login.html/);
  });

  test("✅ Exibe demandas após login", async ({ page }) => {
    await page.goto("http://localhost:3000/html/login.html");

    await page.fill("#email", "empresa@teste.com");
    await page.fill("#password", "123456");
    await page.click("button");

    await page.goto("http://localhost:3000/html/index.html");
    await expect(page.locator("text=Demandas")).toBeVisible();
  });

});
