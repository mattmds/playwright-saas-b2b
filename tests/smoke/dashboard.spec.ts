import { test, expect } from '../../src/fixtures/base.fixture';
import { expectUrl, expectVisible } from '../../src/utils/assertions';

test.describe('Smoke - Dashboard', () => {
  test.describe.configure({ timeout: 90_000 });

  test.beforeEach(async ({ page }) => {
    await test.step('abrir dashboard', async () => {
      await page.goto('/web/index.php/dashboard/index', {
        waitUntil: 'domcontentloaded',
      });
    });
  });

  test('Deve visualizar o dashboard e navegar até o módulo de Gestão de Colaboradores', async ({ dashboardPage, page }) => {
    await test.step('validar dashboard', async () => {
      await expect(dashboardPage.headerTitle).toBeVisible({ timeout: 10_000 });
    });

    await test.step('navegar para PIM', async () => {
      await dashboardPage.navigateToPimModule();
    });

    await test.step('validar URL', async () => {
      await expectUrl(page, /.*pim\/viewEmployeeList/);
    });
  });

  test('Deve filtrar funcionário na tabela com resiliência de locatores', async ({ dashboardPage }) => {
    await test.step('abrir PIM', async () => {
      await dashboardPage.navigateToPimModule();
    });

    await test.step('filtrar funcionário', async () => {
      await dashboardPage.filterEmployeeByName('Linda Turner');
    });

    await test.step('validar linha da tabela', async () => {
      const row = await dashboardPage.getTableRowByName('Linda Turner');
      await expectVisible(row);
    });
  });
});