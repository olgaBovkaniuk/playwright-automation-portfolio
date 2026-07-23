import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage'

test.describe('Login', () => { 
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.goto();
    });

    test('user can log in with valid credentials', async ({page}) => {
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory/);
        await expect(inventoryPage.pageTitle).toHaveText('Products');
        await expect(inventoryPage.inventoryList).toBeVisible();
    });

    test('user sees an error with invalid credentials', async ({page}) => {
        await loginPage.login('invalid_user', 'wrong_password');

        await expect(loginPage.errorMessage).toContainText(
        'Username and password do not match',
    );

        await expect(page).toHaveURL('https://www.saucedemo.com/');
    })
})

