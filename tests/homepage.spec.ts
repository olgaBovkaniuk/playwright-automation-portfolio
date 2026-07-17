import { test, expect } from '@playwright/test';

test('Playwright homepage has the expected title', async ({page}) => {
    await page.goto('https://playwright.dev/');

    await expect(page).toHaveTitle(/Playwright/);
});