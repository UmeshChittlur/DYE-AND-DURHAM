import { Page, Locator } from '@playwright/test';

export class BasketModel {
    readonly page: Page;
    readonly openBasketIcon: Locator;
    readonly basketProduct: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.openBasketIcon = page.locator('[data-test="shopping-cart-link"]');
        this.basketProduct = page.locator('[data-test="inventory-item-name"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');

    };
};
