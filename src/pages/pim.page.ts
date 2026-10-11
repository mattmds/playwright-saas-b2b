import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class PIMPage extends BasePage {
  readonly employeeTable: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);

    this.pageTitle = page.getByRole('heading', { name: /pim/i });
    this.employeeTable = page.locator('.oxd-table');
    this.searchInput = page.getByPlaceholder(/type for hints/i).first();
    this.searchButton = page.getByRole('button', { name: /search/i });
  }

  async searchEmployee(name: string): Promise<void> {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }

  async getRowByName(employeeName: string): Promise<Locator> {
    return this.employeeTable.locator('.oxd-table-card').filter({ hasText: employeeName });
  }
}
