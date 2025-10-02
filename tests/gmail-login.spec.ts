import { test, expect } from '@playwright/test';

// Replace with your actual Gmail credentials for testing
const EMAIL = 'your-email@gmail.com';
const PASSWORD = 'your-password';

test('Gmail Login Functionality', async ({ page }) => {
  // Given the user is on the Gmail login page
  await page.goto('https://mail.google.com');
  await expect(page).toHaveURL(/accounts.google.com/);

  // When the user enters a valid email address
  await page.fill('input[type="email"]', EMAIL);
  // And clicks the "Next" button
  await page.click('button:has-text("Next")');

  // Wait for password input to appear
  await page.waitForSelector('input[type="password"]', { timeout: 10000 });
  // And enters the correct password
  await page.fill('input[type="password"]', PASSWORD);
  // And clicks the "Sign in" button
  await page.click('button:has-text("Next")');

  // Then the user should be redirected to their Gmail inbox
  await page.waitForURL('https://mail.google.com/mail/u/0/#inbox', { timeout: 20000 });
  expect(page.url()).toContain('mail.google.com/mail/u/0/#inbox');

  // And the inbox should display the user's emails
  await expect(page.locator('table[role="grid"]')).toBeVisible();

  // Log for debugging
  const inboxTitle = await page.title();
  console.log('Inbox page title:', inboxTitle);
});
