import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Inventory', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('inventory page displays all products', async () => {
        await expect(inventoryPage.inventoryItems).toHaveCount(6);
    });

    test('user can add a product to the cart', async () => {
        await inventoryPage.addProductToCart('Sauce Labs Backpack');

        await expect(inventoryPage.cartBadge).toHaveText('1');
    });
})