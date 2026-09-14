import { test, expect } from "../src/fixtures/pagefixtures";
import { CsvHelper } from "../src/utils/CsvHelper";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.navigateToRegisterPage();
});

//Reading the CSV file
let registerData = CsvHelper.readCsv("src/testdata/register_data.csv");

//Register User with data given in CSV file
for (let data of registerData) {
  test(`Register Account with username ${data.firstName} via CSV file - Test`, async ({
    registerPage,
    accountPage,
  }) => {
    let timestamp = await registerPage.getTimeStamp();
    console.log("Generated Timestamp For Email: ", timestamp);

    await registerPage.doRegisterAccount(
      data.firstName,
      data.lastName,
      `${data.firstName}_${timestamp}@gmail.com`,
      data.phoneNo,
      data.password,
      await registerPage.toSubscription(data.subscription),
    );
    let successMessage = await accountPage.getAccountCreationSuccessHeader();
    expect(successMessage).toBe(data.successMessage);
    await accountPage.doClickContinue();
    await accountPage.doLogout();
  });
}
