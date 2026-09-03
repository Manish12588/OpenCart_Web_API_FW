import { test, expect } from "../src/fixtures/pagefixtures";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.navigateToRegisterPage();
});

test("Validate the Register Page title - Test", async ({
  loginPage,
  registerPage,
}) => {
  expect(await registerPage.getRegisterPageTitle()).toBe("Register Account");
});

test("Register Account - Test", async ({
  loginPage,
  registerPage,
  accountPage,
}) => {
  let timestamp = await registerPage.getTimeStamp();
  console.log("Generated Timestamp: ", timestamp);
  await registerPage.doRegisterAccount(
    "Manish",
    "Kumar",
    `Manish${timestamp}@gmail.com`,
    "0123456789",
    "Assignment@123",
    "Yes",
  );
  let successMessage = await accountPage.getAccountCreationSuccessHeader();
  expect(successMessage).toBe("Your Account Has Been Created!");
  await accountPage.doClickContinue();
  await accountPage.doLogout();
});
