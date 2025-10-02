class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('#search_query_top');
    this.searchButton = page.locator('button[name="submit_search"]');
  }

  async goto() {
    await this.page.goto('http://www.automationpractice.pl/index.php');
  }

  async searchFor(text) {
    await this.searchInput.fill(text);
    await this.searchButton.click();
  }
}

class SearchResultsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  productByName(name) {
    return this.page.locator('a.product-name', { hasText: name });
  }
}

module.exports = { HomePage, SearchResultsPage };
