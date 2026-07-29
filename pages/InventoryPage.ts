import { Locator, Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly inventoryList: Locator; 
    readonly inventoryItems: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.inventoryList = page.locator('[data-test="inventory-list"]');
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    async addProductToCart(productName: string) {
        const product = this.inventoryItems.filter({hasText: productName});
        
        await product.getByRole('button', {name: 'Add to cart'}).click();
    }
}