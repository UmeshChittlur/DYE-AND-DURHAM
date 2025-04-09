import { Page } from '@playwright/test';
import { LoginDetailsModel } from '../pageObjects/LoginPageModel/loginDetails.ui.model';
import { UserDetails } from '../common/types';
import { BasePageModel } from './BasePageModel';
import { Utils } from '../common/utils';
import { LoginPageContent } from '../pageObjects/LoginPageModel/loginPageContent';

export class LoginDetailsPage extends BasePageModel {
    readonly loginDetails: LoginDetailsModel;
    readonly utils: Utils

    constructor(page: Page) {
        super(page, '/');
        this.loginDetails = new LoginDetailsModel(page);
        this.utils = new Utils(page);

    };

    async authenticateLogin(loginDetails: UserDetails): Promise<void> {
        await this.loginDetails.username.fill(loginDetails.users!);
        await this.loginDetails.password.fill(loginDetails.password!);
        await this.loginDetails.loginButton.click();
    };

    async loginErrorMessage(loginErrorMessage: LoginPageContent): Promise<void> {
        await this.utils.verifyExpectedTextIsDisplayed(this.loginDetails.loginError, loginErrorMessage)
    };
}
