//Importing my own fixtures which we gave created (custom + inbuilt) fixture
import { test, expect } from "../src/fixtures/pagefixtures";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});

test("Validate the Cart Page title - Test", async ({
  productInfoPage,
  cartPage,
}) => {
  await productInfoPage.goToShopingCart();
  expect(await cartPage.getCartPageTitle()).toBe("Shopping Cart");
});

test("Validate the product quantity in shopping cart - Test", async ({
  homePage,
  searchResultPage,
  productInfoPage,
  cartPage,
}) => {
  await homePage.doSearch("macbook");
  await searchResultPage.selectProduct("MacBook Pro");
  await productInfoPage.addProductToCart("10");
  let successMessage = await productInfoPage.getAddToCartSucessMessage();
  console.log("Success Message: ", successMessage);

  await productInfoPage.goToShopingCart();
  expect(
    await cartPage.validateTheProductQuantityOnCartPage("MacBook Pro"),
  ).toBe("10");
});

test("Remove the product from shopping cart - Test", async ({
  productInfoPage,
  cartPage,
  page,
}) => {
  await productInfoPage.goToShopingCart();
  await cartPage.removeProductFromShoppingCart("MacBook Pro");

  expect(await cartPage.getEmptyCartMessage()).toBe(
    "Your shopping cart is empty!",
  );
});
