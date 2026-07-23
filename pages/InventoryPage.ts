import { Locator, Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly inventoryList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.inventoryList = page.locator('[data-test="inventory-list"]');
    }
}