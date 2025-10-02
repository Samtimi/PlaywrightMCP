import { Page } from '@playwright/test';

export class GmailLoginPage {
  constructor(private page: Page) {}

  async gotoLogin() {
    await this.page.goto('https://mail.google.com');
    await this.page.waitForURL(/accounts.google.com/);
  }

  async enterEmail(email: string) {
    await this.page.fill('input[type="email"]', email);
    await this.page.click('button:has-text("Next")');
  }

  async enterPassword(password: string) {
    await this.page.waitForSelector('input[type="password"]', { timeout: 10000 });
    await this.page.fill('input[type="password"]', password);
    await this.page.click('button:has-text("Next")');
  }

  async waitForInbox() {
    await this.page.waitForURL('https://mail.google.com/mail/u/0/#inbox', { timeout: 20000 });
    await this.page.waitForSelector('table[role="grid"]');
  }

  async getInboxTitle() {
    return await this.page.title();
  }
}
