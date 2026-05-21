import { expect, type Page } from '@playwright/test';
import { UI_DOMAIN } from '@/config/env';
import { testUser } from '@/testdata/user';

export class LoginPage {
  constructor(public readonly page: Page) {}

  logIn = () => logIn(this.page, testUser.id);

  verifyLogin = () => verifyLogin(this.page);
}

export const logIn = async (page: Page, id: string) => {
  await page.goto(UI_DOMAIN);
  await page.getByText('TestID på nivå høyt').click();
  await page.getByLabel('Personidentifikator (syntetisk)').fill(id);
  await page.getByText('Autentiser').click();
  await page.waitForURL(UI_DOMAIN);
};

export const verifyLogin = async (page: Page) => {
  expect(page.getByText(`Mine saker hos Klageinstans`)).toBeDefined();
};
