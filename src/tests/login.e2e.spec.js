import { test, expect } from "@playwright/test";

test.describe("Tela de Login", () => {

  test("✅ Login com sucesso", async ({ page }) => {
    await page.goto("http://localhost:3000/html/login.html");

    await page.fill("#email", "empresa@teste.com");
    await page.fill("#password", "123456");
    await page.click("button");

    await expect(page).toHaveURL(/index.html/);
  });

  test("❌ Erro ao logar com dados inválidos", async ({ page }) => {
    await page.goto("http://localhost:3000/html/login.html");

    await page.fill("#email", "errado@email.com");
    await page.fill("#password", "0000");
    await page.click("button");

    await expect(page.locator("text=Erro")).toBeVisible();
  });

});
