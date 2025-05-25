import { Page, expect } from '@playwright/test';
import * as XLSX from 'xlsx';

export class LazadaHomePage {
    readonly page: Page;

    constructor(page: Page){
        this.page =page;
    }

    // 1. Open lazada.vn page
    async goto(){
        await this.page.goto('https://www.lazada.vn');
    }
    // 2. Search product "Logitech Keyboard"
    async searchProductLogitechKeyboard(){
        await this.page.fill('.search-box__input--O34g', 'Logitech Keyboard')
        await this.page.click('a.search-box__button--1oH7');
        await this.page.waitForTimeout(3000);
    }
    // 3. Set price filter from 150.000 to 4.000.000
    async setPriceFilterForProduct(minPrice: string, maxPrice: string){
        await this.page.locator('input[placeholder="Min"]').scrollIntoViewIfNeeded();
        await this.page.fill('input[placeholder="Min"]', minPrice);
        await this.page.fill('input[placeholder="Max"]', maxPrice);
        await this.page.click('button.ant-btn-primary');
        await this.page.waitForSelector('button.ant-btn-primary');
    }
    // 4. Sort price from low to high
    async sortPriceFromLowToHigh(){
        await this.page.locator('div.pI6oU', { hasText: 'Sort By:' }).scrollIntoViewIfNeeded();
        await this.page.locator('span.ant-select-selection-item div', { hasText: 'Best Match' }).click();
        await this.page.waitForSelector('span.ant-select-selection-item div');
        await this.page.locator('div[data-spm-click*="locaid=d2"]', { hasText: 'Price low to high' }).click();
        await this.page.waitForSelector('div[data-spm-click*="locaid=d2"]');
    }
    // 5. Obtain all item names from page 1 to page 3
    async obtainAllItemNames() {
        const itemNames: string[] = [];
      
        for (let i = 1; i <= 3; i++) {
          // Click vào nút phân trang
          const pageBtn = this.page.locator(`ul.ant-pagination a:text-is("${i}")`);
          await pageBtn.click();
      
          // Chờ load sản phẩm
          await this.page.waitForSelector("div.RfADt a");
      
          // Lấy tên item trên trang hiện tại

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
          await this.page.waitForTimeout(3000);
        }
        
        console.log("Collected item names:", itemNames);
        
        //  Chuyển sang Excel
        const worksheet = XLSX.utils.aoa_to_sheet([
        ['Tên Sản Phẩm'],
        ...itemNames.map(name => [name])
        ]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách');

        //  Ghi file .xlsx
        const filePath = 'danh_sach_san_pham.xlsx';
        XLSX.writeFile(workbook, filePath);
        console.log(`Đã lưu Excel tại: ${filePath}`);

        return itemNames;
    }
}