import { test, expect } from "../../src/fixtures/apifixtures";

let bookingId: number;
let TOKEN: string;

test.describe.serial("Restful Booker -Test ", () => {
  test("GET - Getting All booking Ids", async ({ apiHelper }) => {
    let response = await apiHelper.get("/booking");
    console.log("Response: ", response.body);
    expect(response.status).toBe(200);
  });

  //Create booking and store the booking id into varibale
  test("POST - Create Booking", async ({ apiHelper }) => {
    let userData = {
      firstname: "Manish",
      lastname: "Kumar",
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: "2026-09-15",
        checkout: "2026-09-20",
      },
      additionalneeds: "Breakfast",
    };
    let response = await apiHelper.post("/booking", userData);
    console.log("Response: ", response.body);
    expect(response.status).toBe(200);

    bookingId = response.body.bookingid;
    console.log("Generated Booking ID: ", bookingId);
  });

  //Get specific booking details based on booking ID
  test("GET - Getting user details for specific booking Id", async ({
    apiHelper,
  }) => {
    let response = await apiHelper.get(`/booking/${bookingId}`);
    console.log("Response: ", response.body);

    expect(response.status).toBe(200);
  });

  //Generate Auth Token
  test("POST - Generate Auth Token to Delete and Update booking", async ({
    apiHelper,
  }) => {
    let authPayload = { username: "admin", password: "password123" };
    let response = await apiHelper.post(`/auth`, authPayload);
    expect(response.status).toBe(200);
    TOKEN = response.body.token;
    console.log("Generated Token: ", TOKEN);
  });

  //Update the details of booking details based on booking ID
  test("PUT - Update the booking", async ({ apiHelper }) => {
    let userData = {
      firstname: "Manish",
      lastname: "Kumar",
      totalprice: 1500,
      depositpaid: true,
      bookingdates: {
        checkin: "2026-09-15",
        checkout: "2026-09-20",
      },
      additionalneeds: "Breakfast",
    };
    let AUTH_HEADER = {
      Cookie: `token=${TOKEN}`,
    };
    let response = await apiHelper.put(
      `/booking/${bookingId}`,
      userData,
      AUTH_HEADER,
    );
    expect(response.status).toBe(200);
    expect(response.body.totalprice).toBe(1500);
  });

  //Get specific booking details based on booking ID
  test("GET - Getting user details after Updating specific booking details", async ({
    apiHelper,
  }) => {
    let response = await apiHelper.get(`/booking/${bookingId}`);
    console.log("Response: ", response.body);

    expect(response.status).toBe(200);
    expect(response.body.totalprice).toBe(1500);
  });

  //Partial Update Booking
  test("PATCH - Partial update the booking", async ({ apiHelper }) => {
    let userData = {
      additionalneeds: "Dinner",
    };
    let AUTH_HEADER = {
      Cookie: `token=${TOKEN}`,
    };
    let response = await apiHelper.patch(
      `/booking/${bookingId}`,
      userData,
      AUTH_HEADER,
    );
    expect(response.status).toBe(200);
    expect(response.body.additionalneeds).toBe("Dinner");
  });

  //Get specific booking details based on booking ID
  test("GET - Getting user details after partial update booking details", async ({
    apiHelper,
  }) => {
    let response = await apiHelper.get(`/booking/${bookingId}`);
    console.log("Response: ", response.body);

    expect(response.status).toBe(200);
    expect(response.body.additionalneeds).toBe("Dinner");
  });

  //Delete the details of booking details based on booking ID
  test("DELETE - Delete the booking", async ({ apiHelper }) => {
    let AUTH_HEADER = {
      Cookie: `token=${TOKEN}`,
    };
    let response = await apiHelper.delete(`/booking/${bookingId}`, AUTH_HEADER);
    expect(response.status).toBe(201);
  });
});
