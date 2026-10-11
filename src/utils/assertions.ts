import { expect, Locator, Page } from '@playwright/test';

export async function expectVisible(locator: Locator): Promise<void> {
  await expect(locator).toBeVisible();
}

export async function expectTextVisible(page: Page, text: string, timeout = 5000): Promise<void> {
  await expect(page.getByText(text)).toBeVisible({ timeout });
}

export async function expectToastVisible(page: Page): Promise<void> {
  await expect(page.locator('.oxd-toast')).toBeVisible();
}

export async function expectUrl(page: Page, pattern: RegExp | string): Promise<void> {
  await expect(page).toHaveURL(pattern);
}
