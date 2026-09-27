import { HerokuappPage } from "../src/pages/HerokuappPage";
import { test, expect } from "../src/fixtures/apifixtures";

test.skip("Validate contacts added to uer dashboard", async ({ page }) => {
  const herokuappPage = new HerokuappPage(page);
  await page.goto(`${process.env.HEROKUAPP_BASE_URL}`);
  await herokuappPage.doLogin(
    "manish_1789845198062@test.com",
    "Automation@123",
  );
  let actualContancts = await herokuappPage.getTotalContacts();
  console.log("total contancts ", actualContancts);
  await page.pause();
});

test("Delete contact", async ({ apiHelper }) => {
  let tokenId =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YWFlZjI1N2IzN2VkMTAwMTViZTg0YTkiLCJpYXQiOjE3ODk4NTAyMDB9.6ZBKYYIz58KgNXHMyYALKh1wZ4tuvS-dlIIXCv06g-0";
  let contactId = "6aaef268b37ed10015be84ab";
  let respose = await apiHelper.delete(
    `${process.env.HEROKUAPP_BASE_URL}/contacts/${contactId}`,
    {
      Authorization: `Bearer ${tokenId}`,
    },
  );
  expect(respose.status).toBe(200);
});
