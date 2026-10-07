import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import reportingLabs from "./reporting-labs.config";

//Install the dotenv package which helps me to provide the environment varibale
//ENV=qa npx playwright test (Pick environment variable value during running test case, variable name =ENV)
const ENV = process.env.ENV || "qa"; //If no environment provided it will run qa enviromnment by default
console.log("Running Tests on Environment: ", ENV);
dotenv.config({ path: `config/.env.${ENV}` });

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? //pipeline
      [
        ["list"],
        ["html", { outputFolder: "reports/html-report", open: "never" }],
        [
          "allure-playwright",
          { outputFolder: "allure-results", suiteTitle: true },
        ],
        ["reporting-labs", reportingLabs],
      ]
    : //Local
      [
        ["list"],
        ["html", { outputFolder: "reports/html-report", open: "never" }],
        [
          "allure-playwright",
          { outputFolder: "allure-results", suiteTitle: true },
        ],
        ["reporting-labs", reportingLabs],
      ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.BASE_URL,
    headless: !process.env.CI ? false : true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
