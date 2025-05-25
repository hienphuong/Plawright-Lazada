import { test } from '@playwright/test';
import { LazadaHomePage } from '../pages/lazadaHomePage';

// test('TC1: Verify open website www.lazada.vn successfully ', async({ page }) => {
//     const lazada = new LazadaHomePage(page);

//     await lazada.goto();

// });

// test('TC2: Verify search products with value logitech keyboard in website www.lazada.vn successfully ', async({ page }) => {
//     const lazada = new LazadaHomePage(page);

//     await lazada.goto();
//     await lazada.searchProductLogitechKeyboard(); 

// });
// test('TC3: Verify filter products with price from 150000 to 4000000 ', async({ page }) => {
//     const lazada = new LazadaHomePage(page);

//     await lazada.goto();
//     await lazada.searchProductLogitechKeyboard(); 
//     await lazada.setPriceFilterForProduct('150000', '4000000');

// });

// test('TC4: Verify sort the item low price to high ', async({ page }) => {
//     const lazada = new LazadaHomePage(page);

//     await lazada.goto();
//     await lazada.searchProductLogitechKeyboard(); 
//     await lazada.setPriceFilterForProduct('150000', '4000000');
//     await lazada.sortPriceFromLowToHigh();
//     // await lazada.page.waitForTimeout(60000);

// });

test('TC5: Obtain all item names from page 1 to page 3 ', async({ page }) => {
    const lazada = new LazadaHomePage(page);
    await lazada.goto();
    await lazada.searchProductLogitechKeyboard(); 
    await lazada.setPriceFilterForProduct('150000', '4000000');
    await lazada.sortPriceFromLowToHigh();
    await lazada.obtainAllItemNames(); 
});
