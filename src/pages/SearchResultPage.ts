import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultPage extends BasePage {
  //Private Locators
  private readonly searchResults: Locator;

  constructor(page: Page) {
    super(page);
    this.searchResults = page.locator("div#content .product-layout");
  }

  async getProductSearchResultsCount(): Promise<number> {
    return await this.searchResults.count();
  }

  async selectProduct(productName: string): Promise<void> {
    //We are using dynamic locator here
    console.log("Product Name: ", productName);
    await this.page
      .getByRole("link", { name: productName, exact: true })
      .first()
      .click();
  }
}
