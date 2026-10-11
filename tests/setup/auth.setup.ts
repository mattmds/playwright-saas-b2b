import { expect, test as setup } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { env } from '../../src/config/env';
import { LoginPage } from '../../src/pages/login.page';
import { STORAGE_STATE } from '../../playwright.config';

setup('Autenticar e salvar o estado da sessão', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(env.username, env.password);

  await page.waitForURL('**/dashboard/index');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  await mkdir(dirname(STORAGE_STATE), { recursive: true });
  await page.context().storageState({ path: STORAGE_STATE });
});