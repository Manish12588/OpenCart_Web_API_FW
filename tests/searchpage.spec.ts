//Importing my own fixtures which we gave created (custom + inbuilt) fixture
import { test, expect } from "../src/fixtures/pagefixtures";
import { CsvHelper } from "../src/utils/CsvHelper";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});

test("Verify search results count - Test", async ({
  homePage,
  searchResultPage,
}) => {
  await homePage.doSearch("macbook");
  let resultCount = await searchResultPage.getProductSearchResultsCount();
  console.log("Search Result Count: ", resultCount);
  expect(resultCount).toBe(3);
});

test("Verify user is able to select the product - Test", async ({
  homePage,
  searchResultPage,
  page,
}) => {
  await homePage.doSearch("macbook");
  await searchResultPage.selectProduct("MacBook Pro");
  expect(await page.title()).toBe("MacBook Pro");
});
