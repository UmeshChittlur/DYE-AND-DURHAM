import { test } from '@playwright/test';
import { LoginDetailsPage } from '../pages/LoginDetailsPage';
import { CheckoutProducts } from '../common/types';
import { Password, Users } from '../common/enum/customerIdentifier';
import { InventoryPage } from '../pages/InventoryPage';
import { PageURL } from '../common/enum/urls';
import { SwagProducts } from '../common/enum/products';
import { BasketPage } from '../pages/basketPage';
import { PageTitle } from '../common/enum/title';
import { CheckoutPage } from '../pages/checkoutPage';
import { CustomerPersonalDetails } from '../common/enum/customerDetails';

test.describe('Product checkout', () => {
    let loginDetails: LoginDetailsPage;
    let inventoryPage: InventoryPage;
    let basketPage: BasketPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginDetails = new LoginDetailsPage(page);
        inventoryPage = new InventoryPage(page);
        basketPage = new BasketPage(page);
        checkoutPage = new CheckoutPage(page);

    });

    test('Confirm that a product can be added to a basket and checkout can be completed', async () => {
        test.slow();
        const testData: CheckoutProducts = {
            userDetails: {
                users: Users.STANDARD_USER,
                password: Password.VALID_PASSWORD
            },
            productsToBuy: [SwagProducts.SAUCE_LABS_BACKPACK, SwagProducts.SAUCE_LABS_BIKE_LIGHT],
            customerDetails: {
                firstName: CustomerPersonalDetails.FIRST_NAME,
                lastName: CustomerPersonalDetails.LAST_NAME,
                postalCode: CustomerPersonalDetails.ZIP_POSTAL_CODE
            }
        };

        await loginDetails.navigate();
        await loginDetails.authenticateLogin(testData.userDetails!);

        await inventoryPage.verifyURL(PageURL.INVENTORY);
        await inventoryPage.addProductAndVerify(testData.productsToBuy!);

        await basketPage.openBasket();
        await basketPage.verifyURL(PageURL.CART);
        await basketPage.verifyPageTitleTextVisible(PageTitle.YOUR_CART_TITLE);
        await basketPage.verifyProductInBasket(testData.productsToBuy!);
        await basketPage.basketCheckoutButton();

        await checkoutPage.verifyURL(PageURL.CHECKOUT_STEP_ONE);
        await checkoutPage.verifyPageTitleTextVisible(PageTitle.CHECKOUT_YOUR_INFORMATION);
        await checkoutPage.enterCustomerDetails(testData.customerDetails!);
        await checkoutPage.clickCheckoutContinue();
        await checkoutPage.verifyURL(PageURL.CHECKOUT_STEP_TWO);
        await checkoutPage.verifyPageTitleTextVisible(PageTitle.CHECKOUT_OVERVIEW);
        await checkoutPage.checkoutOrderConfirmation();
        await checkoutPage.clickFinishButton()
        await checkoutPage.verifyPageTitleTextVisible(PageTitle.CHECKOUT_COMPLETE);
        await checkoutPage.orderConfirmationText();
    });
});
