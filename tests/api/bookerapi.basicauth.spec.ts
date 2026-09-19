import { ApiHelper } from "../../src/api/ApiHelper";
import { test, expect } from "../../src/fixtures/apifixtures";

let tokenID: string;
test.beforeEach("Generate Token - Test", async ({ apiHelper }) => {
  let creds = {
    username: "admin",
    password: "password123",
  };
  let response = await apiHelper.post(
    `${process.env.BOOKER_API_BASE_URL}/auth`,
    {
      type: "json",
      data: creds,
    },
  );
  expect(response.status).toBe(200);
  tokenID = response.body.token;
});

async function createBooking(apiHelper: ApiHelper): Promise<number> {
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
  let response = await apiHelper.post(
    `${process.env.BOOKER_API_BASE_URL}/booking`,
    { type: "json", data: userData },
  );
  expect(response.status).toBe(200);
  return response.body.bookingid;
}

test("Create Booking - Test", async ({ apiHelper }) => {
  let bookingId = await createBooking(apiHelper);
  console.log("Booking Id: ", bookingId);
});

test("Get the booking using booking id - Test", async ({ apiHelper }) => {
  let bookingId = await createBooking(apiHelper);
  let response = await apiHelper.get(
    `${process.env.BOOKER_API_BASE_URL}/booking/${bookingId}`,
  );
  console.log(`Booking Details of ${bookingId} :`, response.body);
});

test("Update the booking using booking id - Test", async ({ apiHelper }) => {
  let bookingId = await createBooking(apiHelper);
  let updatedUserData = {
    firstname: "Manish",
    lastname: "Kumar",
    totalprice: 1200,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-09-15",
      checkout: "2026-09-20",
    },
    additionalneeds: "Dinner",
  };

  let response = await apiHelper.put(
    `${process.env.BOOKER_API_BASE_URL}/booking/${bookingId}`,
    { type: "json", data: updatedUserData },
    { Cookie: `token=${tokenID}` },
  );
  expect(response.status).toBe(200);
  expect(response.body.additionalneeds).toBe("Dinner");

  //get booking details after update
  let updateDetailsResponse = await apiHelper.get(
    `${process.env.BOOKER_API_BASE_URL}/booking/${bookingId}`,
  );
  console.log(
    `Booking details of ${bookingId} after update :`,
    updateDetailsResponse.body,
  );
});

test("Update booking partially using booking id - Test", async ({
  apiHelper,
}) => {
  let bookingId = await createBooking(apiHelper);
  let updatedUserData = {
    additionalneeds: "Lunch",
  };

  let response = await apiHelper.patch(
    `${process.env.BOOKER_API_BASE_URL}/booking/${bookingId}`,
    { type: "json", data: updatedUserData },
    { Cookie: `token=${tokenID}` },
  );
  expect(response.status).toBe(200);
  expect(response.body.additionalneeds).toBe("Lunch");

  //get booking details after update
  let updateDetailsResponse = await apiHelper.get(
    `${process.env.BOOKER_API_BASE_URL}/booking/${bookingId}`,
  );
  console.log(
    `Booking details of ${bookingId} after partial update :`,
    updateDetailsResponse.body,
  );
});

test("Delete booking using booking id - Test", async ({ apiHelper }) => {
  let bookingId = await createBooking(apiHelper);

  let response = await apiHelper.delete(
    `${process.env.BOOKER_API_BASE_URL}/booking/${bookingId}`,
    { Cookie: `token=${tokenID}` },
  );
  expect(response.status).toBe(201);
});
