import { test, expect } from '@playwright/test';

test('aggdc test', async ({ page }) => {
  await page.goto('https://data.agingames.com/');
  page.fill('#inputAccount', "bdajl10");
  page.fill('#inputPassword', "Alw4yzM0n3yCom3");
  await page.locator('#loginButton').click();
});