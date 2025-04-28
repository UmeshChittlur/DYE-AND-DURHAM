import { expect, Page } from '@playwright/test';
import { BasePageModel } from './BasePageModel';
import { PageURL } from '../common/enum/urls';

import { CheckoutModel } from '../pageObjects/checkoutModel/checkoutModel.ui.model';
import { SwagProducts } from '../common/enum/products';
import { CheckoutPageContent } from '../pageObjects/checkoutModel/checkoutPageContent';
import { CustomerDetails } from '../common/types';

export class CheckoutPage extends BasePageModel {
    readonly checkoutPage: CheckoutModel;

    constructor(page: Page, url: string = `**${PageURL.CHECKOUT_STEP_ONE}`) {
        super(page, url);
        this.checkoutPage = new CheckoutModel(page);
    };

    async enterCustomerDetails(customerDetails: CustomerDetails): Promise<void> {
        await this.checkoutPage.firstName.fill(customerDetails.firstName!);
        await this.checkoutPage.lastName.fill(customerDetails.lastName!);
        await this.checkoutPage.postalCode.fill(customerDetails.postalCode!);
        await this.page.waitForTimeout(2000);
    };

    async clickCheckoutContinue(): Promise<void> {
        await this.checkoutPage.continueButton.click();
        await this.page.waitForTimeout(1000);
    };

    async checkoutOrderConfirmation(): Promise<void> {
        await expect(this.checkoutPage.productName).toHaveText(SwagProducts.SAUCE_LABS_BACKPACK);
        await expect(this.checkoutPage.productDescription).toContainText(CheckoutPageContent.DESCRIPTION);
        await expect(this.checkoutPage.productPrice).toContainText(CheckoutPageContent.PRICE);
        await expect(this.checkoutPage.productItemTotal).toContainText(CheckoutPageContent.ITEM_TOTAL);
        await expect(this.checkoutPage.productTax).toContainText(CheckoutPageContent.TAX);
        await expect(this.checkoutPage.productTotal).toContainText(CheckoutPageContent.TOTAL);
    };

    async clickFinishButton(): Promise<void> {
        await this.checkoutPage.finishButton.click();
        await this.page.waitForTimeout(1000);
    };

    async orderConfirmationText(): Promise<void> {
        await expect(this.checkoutPage.thankYouText).toContainText(CheckoutPageContent.THANK_YOU_TEXT);
        await expect(this.checkoutPage.orderDispatchText).toContainText(CheckoutPageContent.ORDER_DISPATCH_TEXT);
    };
};