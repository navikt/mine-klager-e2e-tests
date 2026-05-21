import { test as base } from '@playwright/test';
import { LoginPage } from '@/fixtures/registrering/login-page';
import { MineKlagerPage } from '@/fixtures/registrering/mine-klager-page';

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
