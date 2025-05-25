import { Page, expect } from '@playwright/test';

export class LazadaHomePage {
    readonly page: Page;

    constructor(page: Page){
        this.page =page;
    }

    // 1. Open lazada.vn page
    async goto(){
        await this.page.goto('https://www.lazada.vn');
        await this.page.waitForTimeout(10000);
    }
    // 2. Search product "Logitech Keyboard"
    async searchProductLogitechKeyboard(){
        await this.page.fill('.search-box__input--O34g', 'Logitech Keyboard')
        await this.page.click('a.search-box__button--1oH7');
        await this.page.waitForTimeout(10000);
    }
    // 3. Set price filter from 150.000 to 4.000.000
    async setPriceFilterForProduct(minPrice: string, maxPrice: string){
        await this.page.locator('input[placeholder="Min"]').scrollIntoViewIfNeeded();
        await this.page.fill('input[placeholder="Min"]', minPrice);
        await this.page.fill('input[placeholder="Max"]', maxPrice);
        await this.page.click('button.ant-btn-primary');
        await this.page.waitForTimeout(10000);
    }

    // 4. Sort price from low to high
    async sortPriceFromLowToHigh(){
        await this.page.locator('div.pI6oU', { hasText: 'Sort By:' }).scrollIntoViewIfNeeded();
        await this.page.locator('span.ant-select-selection-item div', { hasText: 'Best Match' }).click();
        await this.page.locator('div[data-spm-click*="locaid=d2"]', { hasText: 'Price low to high' }).click();
        await this.page.waitForTimeout(10000);
    }

    // 5. Obtain all item names from page 1 to page 3
    async obtainAllItemNames() {
        const itemNames = [];
      
        for (let i = 1; i <= 3; i++) {
          // Click vào nút phân trang
          const pageBtn = this.page.locator(`ul.ant-pagination a:text-is("${i}")`);
          await pageBtn.click();
      
          // Chờ load sản phẩm
          await this.page.waitForSelector("div.RfADt a");
          await this.page.waitForTimeout(2000); 
      
          // Lấy tên item trên trang hiện tại
          const itemNames: string[] = [];

          const itemsOnPage = await this.page.$$eval("div.RfADt a", elements =>
            (elements as HTMLElement[])
              .map(el => el.textContent?.trim())
              .filter((name): name is string => !!name) 
          );
          
  
      
          if (Array.isArray(itemsOnPage)) {
            itemNames.push(...itemsOnPage);
            console.log(`Page ${i} found ${itemsOnPage.length} items`);
          } else {
            console.warn(`Page ${i} returned invalid result`, itemsOnPage);
          }
        }
      
        console.log("Collected item names:", itemNames);
        return itemNames;
      }
      

}