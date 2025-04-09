import { test } from '@playwright/test';
import { LoginDetailsPage } from '../pages/LoginDetailsPage';
import { UserDetails } from '../common/types';
import { Password, Users } from '../common/enum/customerIdentifier';
import { InventoryPage } from '../pages/InventoryPage';
import { PageURL } from '../common/enum/urls';
import { ProductSortOrder } from '../common/enum/productSortOrder';

test.describe('Product sort order', () => {
    let loginDetails: LoginDetailsPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginDetails = new LoginDetailsPage(page);
        inventoryPage = new InventoryPage(page);

    });

    test('Confirm that the product ordering works according to the text in the dropdown list', async () => {
        test.slow();
        const testData: UserDetails = {
            users: Users.STANDARD_USER,
            password: Password.VALID_PASSWORD
        };

        await loginDetails.navigate();
        await loginDetails.authenticateLogin(testData);

        await inventoryPage.verifyURL(PageURL.INVENTORY);
        await inventoryPage.productDropdown(ProductSortOrder.Z_TO_A);
        await inventoryPage.sortProductItemFromZtoA();
        await inventoryPage.productDropdown(ProductSortOrder.PRICE_LOW_TO_HIGH);
        await inventoryPage.sortPriceLowToHigh();
        await inventoryPage.productDropdown(ProductSortOrder.PRICE_HIGH_TO_LOW);
        await inventoryPage.sortPriceHighToLow();
    });
});
