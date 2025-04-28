import { expect, Page } from '@playwright/test';
import { BasePageModel } from './BasePageModel';
import { PageURL } from '../common/enum/urls';
import { BasketModel } from '../pageObjects/basketModel/basketModel.ui.model';
import { SwagProducts } from '../common/enum/products';

export class BasketPage extends BasePageModel {
    readonly basketPage: BasketModel;

    constructor(page: Page, url: string = `**${PageURL.CART}`) {
        super(page, url);
        this.basketPage = new BasketModel(page);
    };

    async openBasket(): Promise<void> {
        await this.basketPage.openBasketIcon.click();
    };

    async verifyProductInBasket(productToVerify: SwagProducts[]): Promise<void> {
        for (const product of productToVerify) {
            const productLocator = this.basketPage.basketProduct.locator(`text=${product}`)
            await expect(productLocator).toHaveText(product);
        }
    };

    async basketCheckoutButton(): Promise<void> {
        await this.basketPage.checkoutButton.click();
    };

};
