//Pagefixtures: collections of all the objects, Fixtures is the collections of the pages
//1. Create an alias of test object as baseTest

import { test as baseTest } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

type pageFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
  homePage: HomePage;
};

//Extends the playwright test
export let test = baseTest.extend<pageFixtures>({
  //basepage the expression name or key, basePage is actual fixutre name which we have created
  //Right now we have added three fixtures in this collection

  basePage: async ({ page }, use) => {
    let basePage = new BasePage(page);
    use(basePage); //default: what exactly you wanted to give it to test
  },

  loginPage: async ({ page }, use) => {
    let loginPage = new LoginPage(page);
    use(loginPage);
  },

  homePage: async ({ page }, use) => {
    let homePage = new HomePage(page);
    use(homePage);
  },
});

export { expect } from "@playwright/test"; //Advantange of to add this expect it will work with my fixures as well  
