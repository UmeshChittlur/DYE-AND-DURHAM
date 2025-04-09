import { Page, Locator } from '@playwright/test';

export class LoginDetailsModel {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('input[id="user-name"]');
        this.password = page.locator('input[id="password"]');
        this.loginButton = page.locator('input[id="login-button"]');
        this.loginError = page.locator('h3[data-test="error"]');
    }
}
