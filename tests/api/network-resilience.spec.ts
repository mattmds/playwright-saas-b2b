import { test, expect } from '../../src/fixtures/base.fixture';
import { env } from '../../src/config/env';
import { mockApiFailure } from '../../src/utils/network';

test.describe('API resilience', () => {
  test('Deve tratar falha 500 na API de métricas com mock de rede', async ({ page, loginPage, dashboardPage }) => {
    test.setTimeout(90_000);
    const getInterceptedRequestCount = await mockApiFailure(page, '**/api/v2/dashboard/employees/**');

    await test.step('abrir dashboard', async () => {
      await page.goto('/web/index.php/dashboard/index', { waitUntil: 'domcontentloaded' });

      if (page.url().includes('/auth/login')) {
        await loginPage.login(env.username, env.password);
        await page.waitForURL('**/dashboard/index', { waitUntil: 'domcontentloaded' });
      }
    });

    await test.step('validar que o dashboard continua disponível após a falha', async () => {
      await expect(dashboardPage.headerTitle).toBeVisible();
      await expect.poll(getInterceptedRequestCount).toBeGreaterThan(0);
    });
  });
});
