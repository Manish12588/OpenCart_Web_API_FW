import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPgae extends BasePage {
  //1. Private Locators
  private readonly emailId: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;
  private readonly forgotttenPasswordLink: Locator;
  private readonly loginErrorMessage: Locator;
  private readonly rightColumnLinks: Locator;

  //2. Constructor of the page class: initialize the locator in constructor
  constructor(page: Page) {
    super(page);
    this.emailId = page.getByRole("textbox", { name: "E-Mail Address" });
    this.password = page.getByLabel("Password");
    this.loginBtn = page.getByRole("button", { name: "Login" });
    this.forgotttenPasswordLink = page
      .getByRole("link", { name: "Forgotten Password" })
      .first();
    this.loginErrorMessage = this.page.locator(
      ".alert.alert-danger.alert-dismissible",
    );
    this.rightColumnLinks = this.page.locator(".list-group a");
  }

  //3. public page actions/behaviour: Encapsulation
  async goToLoginPage(): Promise<void> {
    await this.page.goto("opencart/index.php?route=account/login");
  }

  async getLoginPageTitle(): Promise<String> {
    return await this.page.title();
  }

  async isForgottenPwdLinkExist(): Promise<boolean> {
    return await this.forgotttenPasswordLink.isVisible();
  }

  async doLogin(username: string, password: string): Promise<void> {
    console.log(`user credentials: ${username} - ${password}`);
    await this.emailId.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }

  async isInvalidLoginErrorDisplayed(): Promise<boolean> {
    return await this.loginErrorMessage.isVisible();
  }

  async getAllRightHandColumnLinks(): Promise<void> {
    let allLinks = await this.rightColumnLinks.all();
    for (let link of allLinks) {
      let text = await link.innerText();
      console.log("Link: ", text);
    }
  }
}
