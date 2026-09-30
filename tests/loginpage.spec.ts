import { base } from "@faker-js/faker";
import { test, expect } from "../src/fixtures/pagefixtures"; //Importing my own fixtures which we gave created (custom + inbuilt) fixture
import { CsvHelper } from "../src/utils/CsvHelper";
import { ExcelHelper } from "../src/utils/ExcelHelper";
import { JsonHelper } from "../src/utils/JsonHelper";
import * as allure from "allure-js-commons";
import { log, meta, testData } from "reporting-labs";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
});

test("@smoke @regression @sanity Login Page Title - Test", async ({
  loginPage,
}) => {
  //reporting lab
  meta({
    priority: "P2",
    severity: "minor",
    owner: "Manish",
    story: "JIRA-01",
    epic: "EPIC-100",
    feature: "FEATURE-01",
  });

  let pageTitle = await loginPage.getPageTitle();
  console.log("Login Page Title: ", pageTitle);
  await log("Login Page Title: ", pageTitle); //log() functions from reporting lab

  expect(pageTitle).toBe("Account Login"); //Assertions
});

test("Forgot Password Link Exist - Test", async ({ loginPage }) => {
  meta({
    priority: "P2",
    severity: "minor",
    owner: "Manish",
    story: "JIRA-02",
    epic: "EPIC-100",
    feature: "FEATURE-02",
  });
  expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();
});

test("@smoke @regression @sanity  User is Able to Login to Application with valid credentials - Test", async ({
  loginPage,
  homePage,
}) => {
  await testData(
    {
      username: process.env.APP_USERNAME!,
      password: process.env.APP_PASSWORD!,
    },
    "Login",
  );
  meta({
    priority: "P1",
    severity: "blocker",
    owner: "Manish",
    story: "JIRA-03",
    epic: "EPIC-100",
    feature: "FEATURE-03",
  });
  await allure.suite("Login Tests");
  await allure.severity("critical");
  await allure.feature("Authentication");
  await allure.story("Valid Login");
  await allure.description("Verify user can login with valid credentials");

  await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
  expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy(); //Validating user is successfully login
  expect.soft(await homePage.getHomePageTitle()).toBe("My Account"); //Adding soft assertions, Because it's not good thing to add two hard assertions
});

//DD_1: Read the CSV data directly from the CSV file aand loop the test method row wise..
let testCsvData = CsvHelper.readCsv("src/testdata/logindata_negative.csv");
for (let row of testCsvData) {
  test(`User Login to Application with invalid credentials : ${row.username} - ${"*".repeat(row.password.length)}`, async ({
    loginPage,
  }) => {
    meta({
      priority: "P2",
      severity: "major",
      owner: "Manish",
      story: "JIRA-04",
      epic: "EPIC-100",
      feature: "FEATURE-04",
    });
    await testData(testCsvData, "Invalid Login Data");
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  });
}

//cons:
//1. maintenance
//2. MS Licenses
//DD_2: read xlsx data directly fromn the excel file and loop the test method row wise...
//NOTE: I am Skipping this because of excel licensed issue
let testExcelData = ExcelHelper.readExcel(
  "src/testdata/opencartdata.xlsx",
  "login",
);
for (let row of testExcelData) {
  test.skip(`login to app with invalid credentials with Excel Data- ${row.username} - ${row.password}`, async ({
    loginPage,
    homePage,
  }) => {
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  });
}

//Pros:
//1. inbuilt method: parse, lightweight, smaller data source
//DD_3: read JSON data directly fromn the JSON file and loop the test method row wise...
let testJSONData = JsonHelper.readJson("src/testdata/logindata.json");
for (let row of testJSONData) {
  test(`@smoke @regression @sanity login to app with invalid credentials with JSON Data- ${row.username} - ${"*".repeat(row.password.length)}`, async ({
    loginPage,
    homePage,
  }) => {
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  });
}

// Common features test
test("@smoke Company Logo visible on Login page", async ({ basePage }) => {
  expect(await basePage.isLogoVisible()).toBeTruthy();
});

test("@smoke Search Box visible on Login page", async ({ basePage }) => {
  expect(await basePage.isSerachBoxVisible()).toBeTruthy();
});

test("@smoke Cart button visible on Login page", async ({ basePage }) => {
  expect(await basePage.isCartButtonVisible()).toBeTruthy();
});

test("@smoke Footers links visible on Login page", async ({ basePage }) => {
  expect(await basePage.getPageFootersCount()).toBe(16);
});
