import { test, expect } from "../src/fixtures/pagefixtures";
import { CsvHelper } from "../src/utils/CsvHelper";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.navigateToRegisterPage();
});

test("Validate the Register Page title - Test", async ({ registerPage }) => {
  expect(await registerPage.getRegisterPageTitle()).toBe("Register Account");
});

//Register user by providing the hard code data in test
test("@regression Register Account - Test", async ({
  loginPage,
  registerPage,
  accountPage,
}) => {
  let timestamp = await registerPage.getTimeStamp();
  console.log("Generated Timestamp: ", timestamp);
  await registerPage.doRegisterAccount(
    "Manish",
    "Kumar",
    `Manish_${timestamp}@gmail.com`,
    "0123456789",
    "Assignment@123",
    "Yes",
  );
  let successMessage = await accountPage.getAccountCreationSuccessHeader();
  expect(successMessage).toBe("Your Account Has Been Created!");
  await accountPage.doClickContinue();
  await accountPage.doLogout();
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
