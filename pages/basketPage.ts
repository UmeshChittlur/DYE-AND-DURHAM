import { expect, Page } from '@playwright/test';
import { BasePageModel } from './BasePageModel';
import { PageURL } from '../common/enum/urls';
import { BasketModel } from '../pageObjects/basketModel/basketModel.ui.model';

export class BasketPage extends BasePageModel {
    readonly basketPage: BasketModel;

    constructor(page: Page, url: string = `**${PageURL.CART}`) {
        super(page, url);
        this.basketPage = new BasketModel(page);
    };

    async openBasket(): Promise<void> {
        await this.basketPage.openBasketIcon.click();
    };

    async verifyProductInBasket(productToVerify: string): Promise<void> {
        await expect(this.basketPage.basketProduct).toHaveText(productToVerify);
    };

    async basketCheckoutButton(): Promise<void> {
        await this.basketPage.checkoutButton.click();
    };

};
