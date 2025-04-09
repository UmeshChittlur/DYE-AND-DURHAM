import { Page, Locator } from '@playwright/test';

export class InventoryModel {
    readonly page: Page;
    
    readonly itemNames: Locator;
    readonly dropdown: Locator;
    readonly itemPrices: Locator;
    readonly removeText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dropdown = page.locator('[data-test="product-sort-container"]');
        this.itemNames = page.locator('[data-test="inventory-item-name"]');
        this.itemPrices = page.locator('[data-test="inventory-item-price"]');
        this.removeText = page.locator('[data-test*="remove"]');

    };
};
