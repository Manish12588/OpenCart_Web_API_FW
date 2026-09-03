import { test, expect } from "../src/fixtures/pagefixtures"; //Importing my own fixtures which we gave created (custom + inbuilt) fixture

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
});

test("Login Page Title - Test", async ({ loginPage }) => {
  let pageTitle = await loginPage.getLoginPageTitle();
  console.log("Login Page Title: ", pageTitle);
  expect(pageTitle).toBe("Account Login"); //Assertions
});

test("Forgot Password Link Exist - Test", async ({ loginPage }) => {
  expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();
});

test("User is Able to Login to Application - Test", async ({
  loginPage,
  homePage,
}) => {
  await loginPage.doLogin(process.env.APP_USERNAME, process.env.APP_PASSWORD);
  expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy(); //Validating user is successfully login
  expect.soft(await homePage.getHomePageTitle()).toBe("My Account"); //Adding soft assertions, Because it's not good thing to add two hard assertions
});
