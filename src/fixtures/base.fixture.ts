import { expect, test as base } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { LoginPage } from '@pages/login.page';
import { DashboardPage } from '@pages/dashboard.page';

type AxeExcludeParam = Parameters<AxeBuilder['exclude']>[0];

export interface A11yScanOptions {
  exclude?: AxeExcludeParam;
  tags?: string[];
}

type CustomFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  makeA11yScan: (options?: A11yScanOptions) => Promise<void>;
};

export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  makeA11yScan: async ({ page }, use) => {
    const scan = async (options?: A11yScanOptions) => {
      const defaultTags = ['wcag2a', 'wcag21a', 'wcag21aa'];
      const tagsToScan = options?.tags ?? defaultTags;

      let axeBuilder = new AxeBuilder({ page }).withTags(tagsToScan);

      if (options?.exclude) {
        axeBuilder = axeBuilder.exclude(options.exclude);
      }

      const accessibilityScanResults = await axeBuilder.analyze();

      expect(
        accessibilityScanResults.violations,
        `Encontradas ${accessibilityScanResults.violations.length} violações de acessibilidade.`
      ).toEqual([]);
    };

    await use(scan);
  },
});

export { expect };