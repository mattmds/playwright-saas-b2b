import { Locator, Page } from '@playwright/test';
import { expectVisible } from '../utils/assertions';

/**
 * Classe base para o padrão Page Object Model (POM).
 * Centraliza comportamentos reutilizáveis entre as páginas da aplicação.
 */
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async waitForUrl(urlPattern: string | RegExp): Promise<void> {
    await this.page.waitForURL(urlPattern);
  }

  async expectVisible(locator: Locator): Promise<void> {
    await expectVisible(locator);
  }

  async getToastMessage(): Promise<string | null> {
    const toast = this.page.locator('.oxd-toast-content');
    await toast.waitFor({ state: 'visible' });
    return await toast.textContent();
  }
}