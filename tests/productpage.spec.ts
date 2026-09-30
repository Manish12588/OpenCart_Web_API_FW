//Importing my own fixtures which we gave created (custom + inbuilt) fixture
import { test, expect } from "../src/fixtures/pagefixtures";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});

test("@Smoke Verify the product header - Test", async ({
  homePage,
  searchResultPage,
  productInfoPage,
}) => {
  await homePage.doSearch("macbook");
  await searchResultPage.selectProduct("MacBook Pro");
  let actualProductHeader = await productInfoPage.getProductHeader();
  expect(actualProductHeader).toBe("MacBook Pro");
});

test("@Regression Verify the product images count - Test", async ({
  homePage,
  searchResultPage,
  productInfoPage,
}) => {
  await homePage.doSearch("macbook");
  await searchResultPage.selectProduct("MacBook Pro");
  let actualProductImageCount = await productInfoPage.getProductImagesCount();
  expect(actualProductImageCount).toBe(4);
});

test("@Sanity Verify the product Information", async ({
  homePage,
  searchResultPage,
  productInfoPage,
}) => {
  await homePage.doSearch("macbook");
  await searchResultPage.selectProduct("MacBook Pro");
  let actualProductInfoMap = await productInfoPage.getProductInfo();
  console.log("Actual Product Info Details: ", actualProductInfoMap);

  expect.soft(actualProductInfoMap.get("productHeader")).toBe("MacBook Pro");
  expect.soft(actualProductInfoMap.get("productImagesCount")).toBe(4);
  expect.soft(actualProductInfoMap.get("Brand")).toBe("Apple");
  expect.soft(actualProductInfoMap.get("Product Code")).toBe("Product 18");
  expect.soft(actualProductInfoMap.get("Reward Points")).toBe("800");
  expect.soft(actualProductInfoMap.get("productprice")).toBe("$2,000.00");
  expect.soft(actualProductInfoMap.get("extaxprice")).toBe("$2,000.00");
});

test("Select the quantity and add product to cart - Test", async ({
  homePage,
  searchResultPage,
  productInfoPage,
}) => {
  await homePage.doSearch("macbook");
  await searchResultPage.selectProduct("MacBook Pro");
  await productInfoPage.addProductToCart("20");

  let actualAddToCartSuccessMessage =
    await productInfoPage.getAddToCartSucessMessage();
  console.log("Success Message: ", actualAddToCartSuccessMessage);
});

test("Validate the shopping cart - Test", () => {});

// Common features test
test("Company Logo visible on Login page", async ({ basePage }) => {
  expect(await basePage.isLogoVisible()).toBeTruthy();
});

test("Search Box visible on Login page", async ({ basePage }) => {
  expect(await basePage.isSerachBoxVisible()).toBeTruthy();
});

test("Cart button visible on Login page", async ({ basePage }) => {
  expect(await basePage.isCartButtonVisible()).toBeTruthy();
});

test("Footers links visible on Login page", async ({ basePage }) => {
  expect(await basePage.getPageFootersCount()).toBe(16);
});
