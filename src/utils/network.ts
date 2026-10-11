import { Page } from '@playwright/test';

export async function mockApiFailure(page: Page, pattern: string, status = 500, message = 'Internal Server Error Mocked'): Promise<void> {
  await page.route(pattern, async (route) => {
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify({ message }),
    });
  });
}
