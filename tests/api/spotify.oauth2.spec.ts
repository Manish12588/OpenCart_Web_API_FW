import { test, expect } from "../../src/fixtures/apifixtures";

let OAUTH_CONFIG = {
  client_secret: process.env.OAUTH_CLIENT_SECRET!,
  grant_type: process.env.GRANT_TYPE!,
  client_id: process.env.OAUTH_CLIENT_ID!,
};

let accessToken: string;
test.beforeEach("POST - Generate the access token", async ({ apiHelper }) => {
  let response = await apiHelper.post(
    `${process.env.SPOTIFY_BASE_URL}api/token`,
    { type: "form", form: OAUTH_CONFIG },
  );
  expect(response.status).toBe(200);
  let responseJson = response.body;
  accessToken = responseJson.access_token;
});

test("get album test data", async ({ request }) => {
  let baseURL = "https://api.spotify.com";
  let endPointURL = "/v1/albums/4aawyAB9vmqN3uQ7FjRGTy";

  let albumResponse = await request.get(`${baseURL}${endPointURL}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  expect(albumResponse.status()).toBe(200);
  console.log(await albumResponse.json());

  let jsonBody = await albumResponse.json();
  console.log(jsonBody.total_tracks);
  console.log(jsonBody.external_urls.spotify);
  console.log(jsonBody.images.length);
  expect(jsonBody.images.length).toBe(3);
});
