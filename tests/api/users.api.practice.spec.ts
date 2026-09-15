import { test, expect, request, APIResponse } from "@playwright/test";

let AUTH_TOKEN = {
  Authorization:
    "Bearer e0165eb438a8667aa47522bc036d731ae868f542eff0afabfa0d46eb0376fe64",
};

test("get all users GET api test", async ({ request }) => {
  let response: APIResponse = await request.get(
    "https://gorest.co.in/public/v2/users",
    {
      headers: AUTH_TOKEN,
    },
  );

  let jsonBody = await response.json();
  console.log("Response", jsonBody);
});

test("Create a user POST api test", async ({ request }) => {
  let userData = {
    name: "Manish",
    email: `automation_${Date.now()}@open.com`,
    gender: "male",
    status: "active",
  };

  //JS Object --> JSON (Serialization)
  //JSON.stringify();
  //You can directly apply JSON object it will automatically serialize
  let response: APIResponse = await request.post(
    "https://gorest.co.in/public/v2/users",
    {
      headers: AUTH_TOKEN,
      data: userData,
    },
  );

  let jsonBody = await response.json();
  console.log(jsonBody);
  console.log(response.status());
});

test("Update a user using PUT", async ({ request }) => {
  let userData = {
    name: "Manish Kumar",
    email: "manish13@open.com",
    gender: "male",
    status: "active",
  };
  let response: APIResponse = await request.put(
    "https://gorest.co.in/public/v2/users/8616252",
    {
      headers: AUTH_TOKEN,
      data: userData,
    },
  );

  let jsonBody = await response.json();
  console.log(jsonBody);
  console.log(response.status());
});

test("Update a user using DELETE", async ({ request }) => {
  let response: APIResponse = await request.delete(
    "https://gorest.co.in/public/v2/users/8616252",
    {
      headers: AUTH_TOKEN,
    },
  );
  console.log(response.status());
  expect(response.status()).toBe(204);
});
