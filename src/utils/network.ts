import { Page } from '@playwright/test';

export async function mockApiFailure(page: Page, pattern: string, status = 500, message = 'Internal Server Error Mocked'): Promise<() => number> {
  let interceptedRequests = 0;

  await page.route(pattern, async (route) => {
    interceptedRequests += 1;
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify({ message }),
    });
  });

  return () => interceptedRequests;
}
