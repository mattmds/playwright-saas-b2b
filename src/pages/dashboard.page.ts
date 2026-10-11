import { Locator, Page } from '@playwright/test';
import { SidebarComponent } from '../components/sidebar.component';
import { selectors } from '../utils/selectors';
import { BasePage } from './base.page';

/**
 * Encapsula as interações com a página principal do Dashboard e navegação.
 */
export class DashboardPage extends BasePage {
  readonly headerTitle: Locator;
  readonly userDropdown: Locator;
  readonly sideMenu: Locator;
  readonly employeeTable: Locator;
  readonly sidebar: SidebarComponent;

  constructor(page: Page) {
    super(page);

    this.headerTitle = selectors.dashboard.header(page);
    this.userDropdown = selectors.dashboard.userDropdown(page);
    this.sideMenu = selectors.dashboard.sideMenu(page);
    this.employeeTable = selectors.pim.table(page);
    this.sidebar = new SidebarComponent(page);
  }

  async navigateToPimModule(): Promise<void> {
    await this.sidebar.openPIM();
  }

  async filterEmployeeByName(name: string): Promise<void> {
    const nameInput = selectors.pim.searchInput(this.page);
    await nameInput.fill(name);
    await selectors.pim.searchButton(this.page).click();
  }

  async getTableRowByName(employeeName: string): Promise<Locator> {
    return this.employeeTable.locator('.oxd-table-card').filter({ hasText: employeeName });
  }
}