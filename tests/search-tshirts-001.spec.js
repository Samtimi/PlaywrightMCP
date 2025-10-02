const { test, expect } = require('@playwright/test');

test('Search for T-Shirts and verify result', async ({ page }) => {
  // 1. Navigate to the website
  await page.goto('http://www.automationpractice.pl/index.php');

  // 2. Search for 'T-Shirts'
  const searchInput = await page.locator('#search_query_top');
  await searchInput.fill('T-Shirts');
  await page.locator('button[name="submit_search"]').click();

  // 3. Verify the 'Faded short sleeve T-shirts' is present
  const product = page.locator('a.product-name', { hasText: 'Faded Short Sleeve T-shirts' });
  await expect(product).toBeVisible();
});
