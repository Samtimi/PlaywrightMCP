const { test, expect } = require('@playwright/test');
const { HomePage, SearchResultsPage } = require('./pages/home.page');

test('Search for T-Shirts and verify result using POM', async ({ page }) => {
  const homePage = new HomePage(page);
  const resultsPage = new SearchResultsPage(page);

  // 1. Navigate to the website
  await homePage.goto();

  // 2. Search for 'T-Shirts'
  await homePage.searchFor('T-Shirts');

  // 3. Verify the 'Faded Short Sleeve T-shirts' is present
  const product = resultsPage.productByName('Faded Short Sleeve T-shirts');
  await expect(product).toBeVisible();
});
