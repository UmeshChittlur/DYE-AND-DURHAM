import { expect, Locator, Page } from '@playwright/test';
import { BasePageModel } from './BasePageModel';
import { InventoryModel } from '../pageObjects/InventoryPageModel/inventory.ui.model';
import { PageURL } from '../common/enum/urls';
import { Utils } from '../common/utils';
import { ProductSortOrder } from '../common/enum/productSortOrder';
import { SwagProducts } from '../common/enum/products';


export class InventoryPage extends BasePageModel {
    readonly inventoryPage: InventoryModel;
    readonly utils: Utils

    constructor(page: Page, url: string = `**${PageURL.INVENTORY}`) {
        super(page, url);
        this.inventoryPage = new InventoryModel(page);
        this.utils = new Utils(page);
    }

    async productDropdown(productSortOrder: ProductSortOrder): Promise<void> {
        await this.inventoryPage.dropdown.selectOption(productSortOrder);
        await expect(this.inventoryPage.dropdown).toContainText(productSortOrder);
        await this.page.waitForTimeout(2000);
    };

    async getProductNames(): Promise<string[]> {
        const items = await this.inventoryPage.itemNames.allTextContents();
        return items.map((item) => item.trim());
    }

    async sortProductItemFromZtoA(): Promise<void> {
        const productNames = await this.getProductNames();
        const sortFromZtoA = [...productNames].sort((a, b) => b.localeCompare(a));
        if (productNames.length == sortFromZtoA.length) {
            for (let i = 0; i < productNames.length; i++) {
                expect(productNames[i]).toEqual(sortFromZtoA[i]);
            }
        };
    };

    async getProductPrices(): Promise<number[]> {
        const itemPrices = await this.inventoryPage.itemPrices.allTextContents();
        return itemPrices.map(price => parseFloat(price.replace('$', '').trim()));
    }

    async sortPriceLowToHigh(): Promise<void> {
        const productPrices = await this.getProductPrices();
        const sortFromLowToHigh = [...productPrices].sort((a, b) => a - b);
        if (productPrices.length == sortFromLowToHigh.length) {
            for (let i = 0; i < productPrices.length; i++) {
                expect(productPrices[i]).toEqual(sortFromLowToHigh[i]);
            }
        };
    };

    async sortPriceHighToLow(): Promise<void> {
        const productPrices = await this.getProductPrices();
        const sortFromHighToLow = [...productPrices].sort((a, b) => b - a);
        if (productPrices.length == sortFromHighToLow.length) {
            for (let i = 0; i < productPrices.length; i++) {
                expect(productPrices[i]).toEqual(sortFromHighToLow[i]);
            }
        };
    };

    private getLocatorFromProductName = (productName: SwagProducts): Locator => {
        const hyphenatedProductName = productName.toLowerCase().replace(/\s/g, '-');
        return this.page.locator(`[data-test="add-to-cart-${hyphenatedProductName}"]`);
    };

    async addProductToBasket(productName: SwagProducts): Promise<void> {
        const addToCart: Locator = this.getLocatorFromProductName(productName);
        await addToCart.click();
        await this.page.waitForTimeout(1000);
        await expect(this.inventoryPage.removeText).toBeVisible();
        await expect(this.inventoryPage.removeText).toHaveText('Remove');
    };
}
