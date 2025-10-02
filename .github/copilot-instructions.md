# AI Assistant Instructions for PlaywrightMCP

## Project Overview
This is a Playwright test automation project implementing both UI and API tests. The project uses TypeScript and follows a Page Object Model (POM) pattern for UI tests and includes schema validation for API tests.

## Project Structure
- `tests/` - Contains all test specifications
  - `pages/` - Page Object Model implementations
  - `*.spec.ts` - Test files (both UI and API tests)
- `playwright.config.js` - Playwright configuration
- `test-results/` - Test execution results
- `playwright-report/` - HTML test reports

## Key Patterns and Conventions

### UI Testing Pattern
1. Page Object Model (POM) Implementation
   - Example: See `tests/pages/gmail-login.page.ts` for page object pattern
   - Page objects should encapsulate all selectors and page-specific actions
   - Test files should use page objects rather than direct selectors

2. Test Structure Convention
```typescript
test('feature name', async ({ page }) => {
  // Given - Setup/preconditions
  // When - Actions
  // Then - Assertions
});
```

### API Testing Pattern
1. Schema Validation
   - Use Ajv for JSON schema validation
   - Define schemas as TypeScript objects
   - Example in `tests/api-product.spec.ts`

2. API Test Structure
   - Define endpoint constants at the top
   - Include schema validation in tests
   - Log relevant response data for debugging

## Common Workflows

### Running Tests
- Run all tests: `npx playwright test`
- Run specific test: `npx playwright test filename.spec.ts`
- Run with UI: `npx playwright test --headed`
- View report: `npx playwright show-report`

### Configuration
- Browser configuration in `playwright.config.js`
- Supports Chrome, Firefox, and WebKit
- Parallel execution enabled by default
- HTML reporter configured

## Best Practices
1. Use strongly typed interfaces/classes for API payloads
2. Implement explicit waits rather than hard delays
3. Use meaningful test descriptions that follow Given/When/Then pattern
4. Keep selectors in page objects for better maintainability
5. Include proper error handling and timeouts in API calls

## Examples

### Page Object Usage
```typescript
// Good
const loginPage = new GmailLoginPage(page);
await loginPage.enterEmail(email);

// Avoid
await page.fill('input[type="email"]', email);
```

### API Test Structure
```typescript
test('API test description', async ({ request }) => {
  const response = await request.get(url);
  expect(response.status()).toBe(200);
  // Schema validation
  // Business assertions
});
```