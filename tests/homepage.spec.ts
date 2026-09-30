import { test, expect } from "../src/fixtures/pagefixtures"; //Importing my own fixtures which we gave created (custom + inbuilt) fixture

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});

test("Validate HomePage Title - Test", async ({ homePage }) => {
  let pageTitle = homePage.getHomePageTitle();
  expect(await pageTitle).toBe("My Account");
});

test("Logout Link Exist on HomePage - Test", async ({ homePage }) => {
  expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test("@Sanity Validate the Headers exist on HomePage - Test", async ({
  homePage,
}) => {
  let allHeaders = await homePage.getHomePageHeaders();
  console.log("All Headers: ", allHeaders);
  expect.soft(allHeaders).toHaveLength(4); //Validating the length of all headers
  expect
    .soft(allHeaders)
    .toEqual(["My Account", "My Orders", "My Affiliate Account", "Newsletter"]); //Order should be same because of array it check the indexing value
});

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
