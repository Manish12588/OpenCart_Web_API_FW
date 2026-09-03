import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.doLogin("pwapril@pw.com", "pw123");
  homePage = new HomePage(page);
});

test.skip("Validate HomePage Title - Test", async () => {
  let pageTitle = homePage.getHomePageTitle();
  expect(await pageTitle).toBe("My Account");
});

test.skip("Logout Link Exist on HomePage - Test", async () => {
  expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test.skip("Validate the Headers exist on HomePage - Test", async () => {
  let allHeaders = await homePage.getHomePageHeaders();
  console.log("All Headers: ", allHeaders);
  expect.soft(allHeaders).toHaveLength(4);
  expect
    .soft(allHeaders)
    .toEqual(["My Account", "My Orders", "My Affiliate Account", "Newsletter"]);
});

//Validating the length of all headers
//Order should be same because of array it check the indexing value
