import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {
  //Private locators
  private readonly firstNameField;
  private readonly lastNameField;
  private readonly emailField;
  private readonly telephoneField;
  private readonly passwordField;
  private readonly confirmPasswordField;
  private readonly subscribeYesRadioButton;
  private readonly subscribeNoRadioButton;
  private readonly privacyPolicyCheckbox;
  private readonly continueButton;

  constructor(page: Page) {
    super(page);
    this.firstNameField = page.getByRole("textbox", { name: "* First Name" });
    this.lastNameField = page.getByRole("textbox", { name: "* Last Name" });
    this.emailField = page.getByRole("textbox", { name: "* E-Mail" });
    this.telephoneField = page.getByRole("textbox", { name: "* Telephone" });
    this.passwordField = page.getByRole("textbox", {
      name: "* Password",
      exact: true,
    });
    this.confirmPasswordField = page.getByRole("textbox", {
      name: "* Password Confirm",
      exact: true,
    });
    this.subscribeYesRadioButton = page.getByRole("radio", { name: "Yes" });
    this.subscribeNoRadioButton = page.getByRole("radio", { name: "No" });
    this.privacyPolicyCheckbox = page.locator('//input[@name="agree"]');
    this.continueButton = page.getByRole("button", { name: "Continue" });
  }

  async getRegisterPageTitle(): Promise<string> {
    return this.page.title();
  }

  async doRegisterAccount(
    firstName: string,
    lastName: string,
    email: string,
    phoneNo: string,
    password: string,
    subscription: "Yes" | "No",
  ): Promise<void> {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
    await this.telephoneField.fill(phoneNo);
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(password);
    if (subscription === "Yes") {
      await this.subscribeYesRadioButton.click();
    } else {
      await this.subscribeNoRadioButton.click();
    }
    await this.privacyPolicyCheckbox.click();
    await this.continueButton.click();
  }

  async toSubscription(value: string): Promise<"Yes" | "No"> {
    if (value === "Yes" || value === "No") return value;
    throw new Error(`Invalid subscription value "${value}"}`);
  }

  async getTimeStamp(): Promise<string> {
    return Date.now().toString();
  }
}
