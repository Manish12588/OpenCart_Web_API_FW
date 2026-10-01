import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  //Private Locator

  constructor(page: Page) {
    super(page);
  }

  async getCartPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getEmptyCartMessage(): Promise<string> {
    let message = this.page.locator("#content p", {
      hasText: "shopping cart is empty",
    });
    await message.waitFor({ state: "visible" });
    return await message.innerText();
  }

  async validateTheProductQuantityOnCartPage(
    productName: string,
  ): Promise<string> {
    let totalQuantity = await this.page
      .locator("div.table-responsive")
      .locator("tr")
      .filter({ hasText: `${productName}` })
      .locator("td input")
      .getAttribute("value");
    console.log(`Total Quantity of ${productName} is: ${totalQuantity}`);
    return totalQuantity!;
  }

  async removeProductFromShoppingCart(productName: string): Promise<void> {
    await this.page
      .locator("div.table-responsive tr")
      .filter({ hasText: `${productName}` })
      .locator("td")
      .locator("button.btn.btn-danger")
      .last()
      .click();
  }

  
}
