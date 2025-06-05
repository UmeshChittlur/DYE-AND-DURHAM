import { Page, Locator } from '@playwright/test';

export class CheckoutModel {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly productName: Locator;
    readonly productDescription: Locator;
    readonly productPrice: Locator;
    readonly productItemTotal: Locator;
    readonly productTax: Locator;
    readonly productTotal: Locator;
    readonly finishButton: Locator;
    readonly thankYouText: Locator;
    readonly orderDispatchText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.productDescription = page.locator('[data-test="inventory-item-desc"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
        this.productItemTotal = page.locator('[data-test="subtotal-label"]');
        this.productTax = page.locator('[data-test="tax-label"]');
        this.productTotal = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.thankYouText = page.locator('[data-test="complete-header"]');
        this.orderDispatchText = page.locator('[data-test="complete-text"]');
    };
};
