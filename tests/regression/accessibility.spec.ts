import { test } from '../../src/fixtures/base.fixture';

test.describe('Regression - A11y', () => {
  test('Deve validar conformidade WCAG 2.1 AA na tela inicial do Dashboard', async ({ page, makeA11yScan }) => {
    await page.goto('/web/index.php/dashboard/index');

    await makeA11yScan({
      exclude: ['.oxd-piechart', '.oxd-ringchart'],
    });
  });
});