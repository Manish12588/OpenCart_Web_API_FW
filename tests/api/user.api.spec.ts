import { test, expect } from "../../src/fixtures/apifixtures";

const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER = {
  Authorization: `Bearer ${TOKEN}`,
};
let userId: number;

//describe = Test Suite
//Serial = Run in seq mode
test.describe.serial("Running e2e fo rest crud api tests", () => {
  //GET Test
  test("GET API - get all users", async ({ apiHelper }) => {
    let response = await apiHelper.get("/public/v2/users", AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
  

  //POST
  test("POST API - Create a User", async ({ apiHelper }) => {
    let userData = {
      name: "Manish Kumar",
      email: `test_${Date.now()}@open.com`,
      gender: "male",
      status: "active",
    };

    let response = await apiHelper.post(
      "/public/v2/users",
      userData,
      AUTH_HEADER,
    );
    expect(response.status).toBe(201);
    userId = response.body.id;
    console.log("User id: ", userId);
    expect(userData).not.toBeNull();
  });

  //PUT
  test("PUT API - Update a User", async ({ apiHelper }) => {
    let userData = {
      name: "Manish Kumar Automation",
    };

    let response = await apiHelper.put(
      `/public/v2/users/${userId}`,
      userData,
      AUTH_HEADER,
    );
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userData.name);
  });

  //DELETE
  test("DELET API - Delet a User", async ({ apiHelper }) => {
    let response = await apiHelper.put(
      `/public/v2/users/${userId}`,
      AUTH_HEADER,
    );
    expect(response.status).toBe(204);
  });

  //GET
  test("GET API - Validate User Deleted", async ({ apiHelper }) => {
    let response = await apiHelper.get(
      `/public/v2/users/${userId}`,
      AUTH_HEADER,
    );
  });
});
