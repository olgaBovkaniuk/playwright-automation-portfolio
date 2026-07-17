import { test, expect } from '@playwright/test';

test.describe('Login', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test('user can log in with valid credentials', async ({page}) => {
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', {name: 'Login'}).click();

        await expect(page).toHaveURL(/inventory/);
        await expect(page.getByText('Products')).toBeVisible();
    });

    test('user sees an error with invalid credentials', async ({page}) => {
        await page.getByPlaceholder('Username').fill('invalid_user');
        await page.getByPlaceholder('Password').fill('wrong_password');
        await page.getByRole('button', {name: 'Login'}).click();

        await expect(
            page.getByText(
                'Epic sadface: Username and password do not match any user in this service',
            ),
        ).toBeVisible();

        await expect(page).toHaveURL('https://www.saucedemo.com/');
    })
})

