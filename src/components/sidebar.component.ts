import { Locator, Page } from '@playwright/test';

export class SidebarComponent {
  readonly container: Locator;

  constructor(private readonly page: Page) {
    this.container = page.locator('.oxd-sidepanel');
  }

  async openDashboard(): Promise<void> {
    await this.page.getByRole('link', { name: /dashboard/i }).click();
  }

  async openPIM(): Promise<void> {
    await this.page.getByRole('link', { name: /pim/i }).click({ timeout: 40_000 });
  }
}
