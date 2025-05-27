import { test } from '@playwright/test';
import { LoginDetailsPage } from '../pages/LoginDetailsPage';
import { UserDetails } from '../common/types';
import { Password, Users } from '../common/enum/customerIdentifier';
import { InventoryPage } from '../pages/InventoryPage';
import { PageURL } from '../common/enum/urls';
import { ProductSortOrder } from '../common/enum/productSortOrder';
import { SwagProducts } from '../common/enum/products';

test.describe('Product sort order', () => {
    let loginDetails: LoginDetailsPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginDetails = new LoginDetailsPage(page);
        inventoryPage = new InventoryPage(page);

    });

    test.only('Confirm that the product ordering works according to the text in the dropdown list', async () => {
        test.slow();
        const testData: UserDetails = {
            users: Users.STANDARD_USER,
            password: Password.VALID_PASSWORD
        };

        const productName = SwagProducts.SAUCE_LABS_BACKPACK;
        const productName1 = SwagProducts.TEST_ALL_THE_THINGS;

        await loginDetails.navigate();
        await loginDetails.authenticateLogin(testData);

        await inventoryPage.verifyURL(PageURL.INVENTORY);
        await inventoryPage.addFilteredProduct(productName);
        await inventoryPage.addFilteredProduct(productName1);
        
    });
});
