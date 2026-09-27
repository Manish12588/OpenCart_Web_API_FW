import { BasePage } from "../pages/BasePage";
import { Locator, Page } from "@playwright/test";

export class HerokuappPage extends BasePage {
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly submit: Locator;
  private readonly contactListTable: Locator;
  private readonly logout: Locator;

  constructor(page: Page) {
    super(page);
    this.email = page.getByRole("textbox", { name: "Email" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.submit = page.getByRole("button", { name: "Submit" });
    this.contactListTable = page.locator(".contactTableBodyRow");
    this.logout = page.getByRole("button", { name: "Logout" });
  }
  async doLogin(userEmail: string, userPassword: string): Promise<void> {
    await this.email.fill(userEmail);
    await this.password.fill(userPassword);
    await this.submit.click();
  }

  async getTotalContacts(): Promise<number> {
    await this.contactListTable.first().waitFor({ state: "visible" });
    return await this.contactListTable.count();
  }

  async goLogout(): Promise<void> {
    await this.logout.click();
  }
}
