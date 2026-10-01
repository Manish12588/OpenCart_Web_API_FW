import { test, expect } from "../../src/fixtures/apifixtures";
import { HerokuappPage } from "../../src/pages/HerokuappPage";
import { faker } from "@faker-js/faker";

let tokenID: string;
let userEmail: string;
let contactIdsList: Array<string> = [];

test.describe.serial(" @regression @smoke Test User Contacts", () => {
  test("Add a user - Test", async ({ apiHelper, page }) => {
    let user = {
      firstName: "Manish",
      lastName: "Kumar",
      email: `manish_${Date.now()}@test.com`,
      password: "Automation@123",
    };
    let userResponse = await apiHelper.post(
      `${process.env.HEROKUAPP_BASE_URL}/users`,
      {
        type: "json",
        data: user,
      },
    );
    expect(userResponse.status).toBe(201);
    tokenID = userResponse.body.token;
    userEmail = userResponse.body.user.email;
    console.log("User Email: ", userEmail);
  });

  test("Get User Profile - Test", async ({ apiHelper }) => {
    let response = await apiHelper.get(
      `${process.env.HEROKUAPP_BASE_URL}/users/me`,
      { Authorization: `Bearer ${tokenID}` },
    );
    expect(response.status).toBe(200);
    console.log(response.body);
  });

  test("Adding contacts to created user", async ({ apiHelper }) => {
    for (let i = 0; i < 5; i++) {
      const generatedFirstName = faker.person.firstName();
      const generatedLastName = faker.person.lastName();
      let contacts = {
        firstName: generatedFirstName,
        lastName: generatedLastName,
        birthdate: "1970-01-01",
        email: `${generatedFirstName}.${generatedLastName}@fake.com`,
        phone: "8005555555",
        street1: "1 Main St.",
        street2: "Apartment A",
        city: "Anytown",
        stateProvince: "KS",
        postalCode: "12345",
        country: "USA",
      };

      let response = await apiHelper.post(
        `${process.env.HEROKUAPP_BASE_URL}/contacts`,
        {
          type: "json",
          data: contacts,
        },
        { Authorization: `Bearer ${tokenID}` },
      );
      expect(response.status).toBe(201);
      contactIdsList.push(response.body._id);
      console.log(
        `Contact ${generatedFirstName}.${generatedLastName} created at ${i} index, with _id :`,
        response.body._id,
      );
    }
  });

  //Time to test it on web
  test("Validate contacts added to user dashboard", async ({ page }) => {
    const herokuappPage = new HerokuappPage(page);
    await page.goto(`${process.env.HEROKUAPP_BASE_URL}`);
    await herokuappPage.doLogin(userEmail, "Automation@123");
    let actualContancts = await herokuappPage.getTotalContacts();
    expect(actualContancts).toBe(5);
  });

  test("Delete contact", async ({ apiHelper }) => {
    console.log("Token being used: ", tokenID);
    let respose = await apiHelper.delete(
      `${process.env.HEROKUAPP_BASE_URL}/contacts/${contactIdsList[0]}`,
      {
        Authorization: `Bearer ${tokenID}`,
      },
    );
    expect(respose.status).toBe(200);
  });

  test("Validate contacts counts after delete", async ({ page }) => {
    const herokuappPage = new HerokuappPage(page);
    await page.goto(`${process.env.HEROKUAPP_BASE_URL}`);
    await herokuappPage.doLogin(userEmail, "Automation@123");
    let actualContancts = await herokuappPage.getTotalContacts();
    expect(actualContancts).toBe(4);
    await herokuappPage.goLogout();
  });
});
