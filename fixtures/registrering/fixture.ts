import { LoginPage } from '@app/fixtures/registrering/login-page';
import { MineKlagerPage } from '@app/fixtures/registrering/mine-klager-page';
import { test as base } from '@playwright/test';

interface Pages {
  mineKlagerPage: MineKlagerPage;
  loginPage: LoginPage;
}

export const test = base.extend<Pages>({
  mineKlagerPage: async ({ page }, use) => {
    await use(new MineKlagerPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
