# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/users.api.practice.spec.ts >> Update a user using DELETE
- Location: tests/api/users.api.practice.spec.ts:64:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 204
Received: 404
```

# Test source

```ts
  1  | import { test, expect, request, APIResponse } from "@playwright/test";
  2  | 
  3  | let AUTH_TOKEN = {
  4  |   Authorization:
  5  |     "Bearer e0165eb438a8667aa47522bc036d731ae868f542eff0afabfa0d46eb0376fe64",
  6  | };
  7  | 
  8  | test("get all users GET api test", async ({ request }) => {
  9  |   let response: APIResponse = await request.get(
  10 |     "https://gorest.co.in/public/v2/users",
  11 |     {
  12 |       headers: AUTH_TOKEN,
  13 |     },
  14 |   );
  15 | 
  16 |   let jsonBody = await response.json();
  17 |   console.log("Response", jsonBody);
  18 | });
  19 | 
  20 | test("Create a user POST api test", async ({ request }) => {
  21 |   let userData = {
  22 |     name: "Manish",
  23 |     email: `automation_${Date.now()}@open.com`,
  24 |     gender: "male",
  25 |     status: "active",
  26 |   };
  27 | 
  28 |   //JS Object --> JSON (Serialization)
  29 |   //JSON.stringify();
  30 |   //You can directly apply JSON object it will automatically serialize
  31 |   let response: APIResponse = await request.post(
  32 |     "https://gorest.co.in/public/v2/users",
  33 |     {
  34 |       headers: AUTH_TOKEN,
  35 |       data: userData,
  36 |     },
  37 |   );
  38 | 
  39 |   let jsonBody = await response.json();
  40 |   console.log(jsonBody);
  41 |   console.log(response.status());
  42 | });
  43 | 
  44 | test("Update a user using PUT", async ({ request }) => {
  45 |   let userData = {
  46 |     name: "Manish Kumar",
  47 |     email: "manish13@open.com",
  48 |     gender: "male",
  49 |     status: "active",
  50 |   };
  51 |   let response: APIResponse = await request.put(
  52 |     "https://gorest.co.in/public/v2/users/8616252",
  53 |     {
  54 |       headers: AUTH_TOKEN,
  55 |       data: userData,
  56 |     },
  57 |   );
  58 | 
  59 |   let jsonBody = await response.json();
  60 |   console.log(jsonBody);
  61 |   console.log(response.status());
  62 | });
  63 | 
  64 | test("Update a user using DELETE", async ({ request }) => {
  65 |   let response: APIResponse = await request.delete(
  66 |     "https://gorest.co.in/public/v2/users/8616252",
  67 |     {
  68 |       headers: AUTH_TOKEN,
  69 |     },
  70 |   );
  71 |   console.log(response.status());
> 72 |   expect(response.status()).toBe(204);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  73 | });
  74 | 
```