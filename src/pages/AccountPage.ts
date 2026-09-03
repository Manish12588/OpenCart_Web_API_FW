import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AccountPage extends BasePage {
  private readonly accountSuccessHeader;
  private readonly continueButton;
  private readonly logoutLink;
  private readonly loginLink;

  constructor(page: Page) {
    super(page);
    this.accountSuccessHeader = page.locator("div#content h1");
    this.continueButton = page.getByRole("link", { name: "Continue" });
    this.logoutLink = page.getByRole("link", { name: "Logout" });
    this.loginLink = page.getByRole("link", { name: "Login" });
  }

  async getAccountPageTitle(): Promise<string> {
    return this.page.title();
  }
  async getAccountCreationSuccessHeader(): Promise<string> {
    let successHeader = await this.accountSuccessHeader.innerText();
    console.log("Success Header: ", successHeader);
    return successHeader;
  }

  async doClickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async doLogout(): Promise<void> {
    await this.logoutLink.click();
  }

  async doLogin(): Promise<void> {
    await this.loginLink.click();
  }
}
