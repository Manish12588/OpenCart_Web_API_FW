//Interceptions and Mocking
//I wanted to check what calls are happening at network level, i want to intercept those
//web app=> Incept the network calls and log them
//**/* : Wild card pattern for the url

import { test, expect } from "@playwright/test";

test("Intercept and log the request", async ({ page }) => {
  //Listener will listen all the route and print in console
  await page.route("**/*", async (route) => {
    console.log(route.request().method(), route.request().url());
    await route.continue(); //Continue with all URL's
  });

  //Navigate to webapplication
  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=common/home",
  );
});

//Intercept with mocking: I wanted to create a fake response
//In response body you can display fake HTML instead of JSON
test("mock search data api", async ({ page }) => {
  let fakeProducts = [
    { name: "Fake MacBook Pro", price: "$599" },
    { name: "Fake Iphone 18", price: "$2409" },
  ];

  //https://naveenautomationlabs.com/opencart/index.php?route=common/home
  await page.route(
    "**/index.php?route=product/search&search=macbook",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(fakeProducts),
      });
    },
  );

  await page.goto(
    "https://abc.com/index.php?route=product/search&search=macbook",
  );
  //await page.pause();
});

test("mock search page with fake HTML", async ({ page }) => {
  await page.route(
    "**/index.php?route=product/search&search=macbook",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "text/html",
        body: `
                <html>
                <body>
                    <h1>Search Results</h1>
                    <div class="product-layout">
                        <h4><a href="#">Fake MacBook Pro</a></h4>
                        <p class="price">$599</p>
                    </div>
                    <div class="product-layout">
                        <h4><a href="#">Fake iPhone 20</a></h4>
                        <p class="price">$999</p>
                    </div>
                </body>
                </html>
            `,
      });
    },
  );

  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook",
  );

  // now assert on the fake HTML
  const heading = await page.textContent("h1");
  expect(heading).toBe("Search Results");

  const products = await page.locator(".product-layout h4").allTextContents();
  expect(products).toEqual(["Fake MacBook Pro", "Fake iPhone 20"]);

  const prices = await page.locator(".price").allTextContents();
  expect(prices).toEqual(["$599", "$999"]);

  //await page.pause();
});

test("Negative status 401", async ({ page }) => {
  await page.route(
    "**/index.php?route=product/search&search=macbook",
    async (route) => {
      await route.fulfill({
        status: 401,
        contentType: "text/html",
        body: `
                <html>
                <body>
                    <h1>Sorry, you are not authorized...</h1>
                </body>
                </html>
            `,
      });
    },
  );

  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook",
  );

  // now assert on the fake HTML
  const heading = await page.textContent("h1");
  expect(heading).toBe("Sorry, you are not authorized...");

  //await page.pause();
});
