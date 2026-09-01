import { test, expect } from "@playwright/test";
import { LoginPgae } from "../src/pages/LoginPage";

let loginPage: LoginPgae;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPgae(page);
  await loginPage.goToLoginPage();
});

test("Login Page Title - Test", async () => {
  let pageTitle = await loginPage.getLoginPageTitle();
  console.log("Login Page Title: ", pageTitle);
  expect(pageTitle).toBe("Account Login"); //Assertions
});

test("Forgot Password Link Exist - Test", async () => {
  expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();
});

test("User is Able to Login to Application - Test", async () => {
  await loginPage.doLogin("manishkumar@gmail.com", "Automation@123");
});

test("Fetch All Links - Test", async () => {
  expect(await loginPage.getAllRightHandColumnLinks()).toContain(
    "Order History",
  );
  //await loginPage.getAllRightHandColumnLinks();
});
