import { test, expect } from '../../src/fixtures/base.fixture';
import { mockApiFailure } from '../../src/utils/network';
import { expectTextVisible, expectToastVisible } from '../../src/utils/assertions';

test.describe('API resilience', () => {
  test('Deve tratar falha 500 na API de métricas com mock de rede', async ({ page }) => {
    await mockApiFailure(page, '**/api/v2/dashboard/employees/**');

    await test.step('abrir dashboard', async () => {
      await page.goto('/web/index.php/dashboard/index');
    });

    await test.step('validar resposta do mock', async () => {
      try {
        await expectTextVisible(page, 'Internal Server Error Mocked', 5000);
      } catch {
        await expectToastVisible(page);
      }
    });
  });
});
