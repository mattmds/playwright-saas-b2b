import { Page } from '@playwright/test';

export const selectors = {
  login: {
    username: (page: Page) => page.getByPlaceholder('Username'),
    password: (page: Page) => page.getByPlaceholder('Password'),
    submit: (page: Page) => page.getByRole('button', { name: /login/i }),
  },
  dashboard: {
    header: (page: Page) => page.getByRole('heading', { name: /dashboard/i }),
    sideMenu: (page: Page) => page.locator('.oxd-sidepanel'),
    userDropdown: (page: Page) => page.locator('.oxd-userdropdown'),
  },
  pim: {
    searchInput: (page: Page) => page.getByPlaceholder(/type for hints/i).first(),
    searchButton: (page: Page) => page.getByRole('button', { name: /search/i }),
    table: (page: Page) => page.locator('.oxd-table'),
  },
};
