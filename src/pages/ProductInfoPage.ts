import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {
  //Private Locators
  private readonly productHeader: Locator;
  private readonly productImages: Locator;
  private readonly productMetadata: Locator;
  private readonly productPriceData: Locator;
  private readonly productInfoMap: Map<string, string | number>;
  private readonly productQuantity: Locator;
  private readonly addToCartButton: Locator;
  private readonly addToCartSuccessMeaage: Locator;
  private readonly shoppingCart: Locator;

  constructor(page: Page) {
    super(page);
    this.productHeader = page.getByRole("heading", { level: 1 });
    this.productImages = page.locator("div#content li img");
    this.productMetadata = page.locator(
      "div#content ul.list-unstyled:nth-of-type(1) li",
    );
    this.productPriceData = page.locator(
      "div#content ul.list-unstyled:nth-of-type(2) li",
    );
    this.productInfoMap = new Map<string, string | number>();
    this.productQuantity = page.getByRole("textbox", { name: "Qty" });
    this.addToCartButton = page.getByRole("button", {
      name: "Add to Cart",
      exact: true,
    });
    this.addToCartSuccessMeaage = page.locator("div#product-product div.alert");
    this.shoppingCart = page.locator("a[title='Shopping Cart']");
  }

  async getProductHeader(): Promise<string> {
    return await this.productHeader.innerText();
  }

  async getProductImagesCount(): Promise<number> {
    await this.productImages.first().waitFor({ state: "visible" }); //Wait for images to get load (at least 1 images)
    return await this.productImages.count();
  }

  async getProductInfo(): Promise<Map<string, string | number>> {
    this.productInfoMap.set("productHeader", await this.getProductHeader());
    this.productInfoMap.set(
      "productImagesCount",
      await this.getProductImagesCount(),
    );
    await this.getProductMetaData();
    await this.getProductPriceData();
    return this.productInfoMap;
  }

  async addProductToCart(quantitiy: string): Promise<void> {
    await this.productQuantity.clear();
    await this.productQuantity.fill(quantitiy);
    await this.addToCartButton.click();
  }

  async getAddToCartSucessMessage(): Promise<string> {
    await this.addToCartSuccessMeaage.waitFor({ state: "visible" });
    return await this.addToCartSuccessMeaage.innerText();
  }

  async goToShopingCart(): Promise<void> {
    await this.shoppingCart.waitFor({ state: "visible" });
    await this.shoppingCart.click();
  }

  private async getProductMetaData(): Promise<void> {
    let metaData = await this.productMetadata.allInnerTexts();
    for (let data of metaData) {
      let meta = data.split(":");
      let metaKey = meta[0].trim();
      let metaValue = meta[1].trim();
      this.productInfoMap.set(metaKey, metaValue);
    }
  }

  private async getProductPriceData(): Promise<void> {
    let priceData = await this.productPriceData.allInnerTexts();
    let productPrice = priceData[0].trim();
    let exTaxPrice = priceData[1].split(":")[1].trim();
    this.productInfoMap.set("productprice", productPrice);
    this.productInfoMap.set("extaxprice", exTaxPrice);
  }
}
