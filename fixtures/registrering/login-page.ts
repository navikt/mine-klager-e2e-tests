import { UI_DOMAIN } from '@app/config/env';
import { testUser } from '@app/testdata/user';
import { expect, type Page } from '@playwright/test';

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
