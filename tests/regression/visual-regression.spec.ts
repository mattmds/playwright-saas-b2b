import { test, expect } from '../../src/fixtures/base.fixture';

test.describe('Regression - Design System', () => {
  test('Deve validar visualmente a estrutura do SideMenu', async ({ page, dashboardPage }) => {
    await page.goto('/web/index.php/dashboard/index', {
      waitUntil: 'domcontentloaded',
    });

    await expect(dashboardPage.sideMenu).toHaveScreenshot('side-menu-component.png', {
      mask: [page.locator('.oxd-userdropdown')],
      timeout: 15_000,
    });
  });
});