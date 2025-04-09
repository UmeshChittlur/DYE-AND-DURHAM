import { Locator, Page, expect } from '@playwright/test';
import { PageTitle } from '../common/enum/title';
import { Utils } from '../common/utils';

export abstract class BasePageModel {
    readonly page: Page;
    readonly url: string;
    readonly openBurgerMenu: Locator;
    readonly closeBurgerMenu: Locator;
    readonly logout: Locator;
    readonly title: Locator;
    readonly utils: Utils

    constructor(page: Page, url: string) {
        this.page = page;
        this.url = url;
        this.utils = new Utils(page);
        this.openBurgerMenu = page.locator("button[id='react-burger-menu-btn']");
        this.closeBurgerMenu = page.locator("button[id='react-burger-cross-btn']");
        this.logout = page.locator("[data-test='logout-sidebar-link']");
        this.title = page.locator('span[data-test="title"]');

    }

    async navigate(url?: string, options?: { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' }): Promise<void> {
        url ? await this.page.goto(url, options) : await this.page.goto(this.url, options)
    };

    async verifyURL(url: string | RegExp): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded', { timeout: 2000 });
        await this.page.waitForTimeout(2000);
        await expect(this.page).toHaveURL(url);
    };

    async verifyLogoutVisible(): Promise<void> {
        await this.openBurgerMenu.click();
        await expect(this.logout).toBeVisible();
        await expect(this.logout).toHaveText('Logout');
        await this.closeBurgerMenu.click();
    };

    async verifyPageTitleTextVisible(title: PageTitle): Promise<void> {
        await this.utils.verifyExpectedTitleIsDisplayed(this.title, title);
    };
}
