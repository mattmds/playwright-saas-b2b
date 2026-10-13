import { expect, test } from '../../src/fixtures/base.fixture';

test.describe('Regression - A11y', () => {
  test('Deve validar conformidade WCAG 2.1 AA na tela inicial do Dashboard', async ({ page, makeA11yScan }) => {
    await page.goto('/web/index.php/dashboard/index', {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
    await makeA11yScan({
      exclude: [
        '.oxd-piechart', '.oxd-ringchart',
         'iframe[src*="youtube.com"]',
      ],
    });
  });
});