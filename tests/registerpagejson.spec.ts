import { test, expect } from "../src/fixtures/pagefixtures";
import { JsonHelper } from "../src/utils/JsonHelper";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.navigateToRegisterPage();
});

//Reading the JSON file
let registerData = JsonHelper.readJson("src/testdata/register_data.json");

for (let row of registerData) {
  test(`Register the user with JSON Data- ${row.firstName} - ${row.lastName}`, async ({
    accountPage,
    registerPage,
  }) => {
    let timestamp = await registerPage.getTimeStamp();
    console.log("Generated Timestamp For Email: ", timestamp);

    await registerPage.doRegisterAccount(
      row.firstName,
      row.lastName,
      `${row.firstName}_${timestamp}@gmail.com`,
      row.phoneNo,
      row.password,
      await registerPage.toSubscription(row.subscription),
    );
    let successMessage = await accountPage.getAccountCreationSuccessHeader();
    expect(successMessage).toBe(row.successMessage);
    await accountPage.doClickContinue();
    await accountPage.doLogout();
  });
}
