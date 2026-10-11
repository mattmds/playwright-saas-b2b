import { Locator, Page } from '@playwright/test';
import { env } from '../config/env';
import { selectors } from '../utils/selectors';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = selectors.login.username(page);
    this.passwordInput = selectors.login.password(page);
    this.loginButton = selectors.login.submit(page);
    this.errorMessage = page.locator('.oxd-alert-content-text');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/web/index.php/auth/login');
  }

  async login(username: string = env.username, password: string = env.password): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithDefaultCredentials(): Promise<void> {
    await this.login();
  }
}