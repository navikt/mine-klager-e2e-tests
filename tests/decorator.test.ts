import { UI_DOMAIN } from '@app/config/env';
import { test } from '@app/fixtures/registrering/fixture';
import { testUser } from '@app/testdata/user';
import { expect } from '@playwright/test';

test.describe('Decorator header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(UI_DOMAIN);
    await page.getByText('Her ser du dine saker som er hos Klageinstans.').waitFor();
  });

  test('Header renders', async ({ page }) => {
    await expect(page.locator('header#decorator-header')).toBeVisible();
  });

  test('User is logged in', async ({ page }) => {
    const header = page.locator('header#decorator-header');
    const userMenuButton = header.getByRole('button', { name: `${testUser.firstName} ${testUser.lastName}` });

    await expect(userMenuButton).toBeVisible();
    await userMenuButton.click();

    await expect(header.getByText('Logget inn')).toBeVisible();
    await expect(header.getByText('Logg ut')).toBeVisible();
  });

  test('Language selector has three options', async ({ page }) => {
    const languageContainer = page.getByLabel('Velg språk');

    await expect(languageContainer).toBeVisible();
    await languageContainer.click();

    await expect(languageContainer.getByText('Norsk (bokmål)')).toBeVisible();
    await expect(languageContainer.getByText('Norsk (nynorsk)')).toBeVisible();
    await expect(languageContainer.getByText('English')).toBeVisible();
  });
});

test.describe('Decorator footer', () => {
  test('Footer renders', async ({ page }) => {
    await page.goto(UI_DOMAIN);
    await page.getByText('Her ser du dine saker som er hos Klageinstans.').waitFor();

    const footer = page.locator('div#decorator-footer footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByText('Arbeids- og velferdsetaten')).toBeVisible();
  });
});
