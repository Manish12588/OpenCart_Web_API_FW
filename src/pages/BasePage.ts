import { Locator, Page } from "@playwright/test";

export class BasePage {
  //Why we are using protected here, only child class can have the access of these
  protected readonly page: Page;

  //Common locators accross all pages
  protected readonly logo: Locator;
  protected readonly searchBox: Locator;
  protected readonly searchIcon: Locator;
  protected readonly footerLinks: Locator;
  protected readonly currency: Locator;
  protected readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole("img", { name: "naveenopencart" });
    this.searchBox = page.getByRole("textbox", { name: "Search" });
    this.searchIcon = page.locator("div#search button");
    this.currency = page.locator("#form-currency");
    this.cartButton = page.locator("div#cart button");
    this.footerLinks = page.locator("footer a");
  }

  //App common features/actions: footer, logo, search
  async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  async isSerachBoxVisible(): Promise<boolean> {
    return await this.searchBox.isVisible();
  }

  async isCurrencyVisible(): Promise<boolean> {
    return await this.currency.isVisible();
  }

  async isCartButtonVisible(): Promise<boolean> {
    return await this.cartButton.isVisible();
  }

  async getPageFootersCount(): Promise<number> {
    return await this.footerLinks.count();
  }
  async getPageFooters(): Promise<string[]> {
    return await this.footerLinks.allInnerTexts();
  }

  //Page level generic methods
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  getCurrentPageUrl(): string {
    return this.page.url();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("load");
  }

  async takeScreenshot(name: string) {
    return await this.page.screenshot({
      fullPage: true,
      path: `reports/screenshots/${name}.png`,
    });
  }
}
