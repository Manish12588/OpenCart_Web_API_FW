import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  //Private Locators
  private readonly logoutLink: Locator;
  private readonly headers: Locator;
  private readonly searchBox: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutLink = page.getByRole("link", { name: "Logout" });
    this.headers = page.getByRole("heading", { level: 2 }); //Collect all 4 headers
    this.searchBox = page.getByRole("textbox", { name: "Search" });
    this.searchButton = page.locator("div#search button");
  }

  async isLogoutLinkExist(): Promise<boolean> {
    return await this.logoutLink.isVisible();
  }

  async getHomePageHeaders(): Promise<String[]> {
    return await this.headers.allInnerTexts();
  }

  async getHomePageTitle(): Promise<string> {
    return await this.page.title();
  }

  async doSearch(searchKey: string): Promise<void> {
    console.log("Search Key: ", searchKey);
    await this.searchBox.fill(searchKey);
    await this.searchButton.click();
  }
}
