import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {
  //Private Locators
  private readonly productHeader: Locator;
  private readonly productImages: Locator;
  private readonly productMetadata: Locator;
  private readonly productPriceData: Locator;
  private productInfoMap: Map<string, string | number>;

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
