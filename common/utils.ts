import { expect, Locator, Page } from '@playwright/test';

export class Utils {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyExpectedTextIsDisplayed(locator: Locator, expectedText: string): Promise<void> {
        await expect(locator, `"${expectedText}" is not displayed`).toHaveText(expectedText);
    };

    async verifyExpectedTitleIsDisplayed(locator: Locator, expectedText: string): Promise<void> {
        await expect(locator, `"${expectedText}" is not displayed`).toHaveText(expectedText);
    };

}
