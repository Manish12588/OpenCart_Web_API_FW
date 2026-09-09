//Pagefixtures: collections of all the objects, Fixtures is the collections of the pages
//1. Create an alias of test object as baseTest

import { test as baseTest } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";
import { AccountPage } from "../pages/AccountPage";
import { SearchResultPage } from "../pages/SearchResultPage";
import { ProductInfoPage } from "../pages/ProductInfoPage";
import { CartPage } from "../pages/CartPage";

type pageFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
  homePage: HomePage;
  registerPage: RegisterPage;
  accountPage: AccountPage;
  searchResultPage: SearchResultPage;
  productInfoPage: ProductInfoPage;
  cartPage: CartPage;
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

  registerPage: async ({ page }, use) => {
    let registerPage = new RegisterPage(page);
    use(registerPage);
  },
  accountPage: async ({ page }, use) => {
    let accountPage = new AccountPage(page);
    use(accountPage);
  },
  searchResultPage: async ({ page }, use) => {
    let searchResultPage = new SearchResultPage(page);
    use(searchResultPage);
  },
  productInfoPage: async ({ page }, use) => {
    let productInfoPage = new ProductInfoPage(page);
    use(productInfoPage);
  },
  cartPage: async ({ page }, use) => {
    let cartPage = new CartPage(page);
    use(cartPage);
  },
});

export { expect } from "@playwright/test"; //Advantange of to add this expect it will work with my fixures as well
