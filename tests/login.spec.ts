import { test } from '@playwright/test';
import { LoginDetailsPage } from '../pages/LoginDetailsPage';
import { UserDetails } from '../common/types';
import { Password, Users } from '../common/enum/customerIdentifier';
import { InventoryPage } from '../pages/InventoryPage';
import { PageURL } from '../common/enum/urls';
import { LoginPageContent } from '../pageObjects/LoginPageModel/loginPageContent';
import { PageTitle } from '../common/enum/title';

test.describe('Login functionality', () => {
    let loginDetails: LoginDetailsPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginDetails = new LoginDetailsPage(page);
        inventoryPage = new InventoryPage(page);

    });

    test('Confirm that a valid login takes you to the product screen', async () => {
        test.slow();
        const testData: UserDetails = {
            users: Users.STANDARD_USER,
            password: Password.VALID_PASSWORD
        };

        await loginDetails.navigate();
        await loginDetails.authenticateLogin(testData);
        await inventoryPage.verifyURL(PageURL.INVENTORY);
        await inventoryPage.verifyLogoutVisible();
        await inventoryPage.verifyPageTitleTextVisible(PageTitle.PRODUCT_TITLE);
    });

    test('Confirm that a locked user is unable to login', async () => {
        test.slow();
        const testData: UserDetails = {
            users: Users.LOCKED_OUT_USER,
            password: Password.VALID_PASSWORD
        };

        await loginDetails.navigate();
        await loginDetails.authenticateLogin(testData);
        await loginDetails.verifyURL('/');
        await loginDetails.loginErrorMessage(LoginPageContent.LOCKED_OUT_USER)
    });

    test('Confirm that a user that is not stored in the sauce labs service is unable to log in', async () => {
        test.slow();
        const testData: UserDetails = {
            users: Users.USER_NOT_IN_SERVICE,
            password: Password.VALID_PASSWORD
        };

        await loginDetails.navigate();
        await loginDetails.authenticateLogin(testData);
        await loginDetails.verifyURL('/');
        await loginDetails.loginErrorMessage(LoginPageContent.NON_EXISTENT_USER)
    });

    test('Confirm that an appropriate error message is displayed when no username is entered', async () => {
        test.slow();
        const testData: UserDetails = {
            users: Users.BLANK_USERNAME,
            password: Password.VALID_PASSWORD
        };

        await loginDetails.navigate();
        await loginDetails.authenticateLogin(testData);
        await loginDetails.verifyURL('/');
        await loginDetails.loginErrorMessage(LoginPageContent.USERNAME_REQUIRED)
    });

    test('Confirm that an appropriate error message is displayed when no password is entered', async () => {
        test.slow();
        const testData: UserDetails = {
            users: Users.STANDARD_USER,
            password: Password.BLANK_PASSWORD
        };

        await loginDetails.navigate();
        await loginDetails.authenticateLogin(testData);
        await loginDetails.verifyURL('/');
        await loginDetails.loginErrorMessage(LoginPageContent.PASSWORD_REQUIRED)
    });


});