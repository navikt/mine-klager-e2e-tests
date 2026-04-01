import { UI_DOMAIN } from '@app/config/env';
import { test } from '@app/fixtures/registrering/fixture';
import { expect } from '@playwright/test';

test.describe('Case list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(UI_DOMAIN);
    await page.getByText('Her ser du dine saker som er hos Klageinstans.').waitFor();
  });

  test('Shows page heading with case count', async ({ page }) => {
    await expect(page.getByText(/Mine saker hos Klageinstans \(\d+\)/)).toBeVisible();
  });

  test('Shows disclaimer info box', async ({ page }) => {
    await expect(page.getByText('Her ser du dine saker som er hos Klageinstans.')).toBeVisible();
    await expect(
      page.getByText('Klagen din skal først behandles av Nav vedtaksinstans', { exact: false }),
    ).toBeVisible();
  });

  test('Shows at least one case with metadata', async ({ page }) => {
    await expect(page.getByText('Saksnummer').first()).toBeVisible();
    await expect(page.getByText('Siste hendelse').first()).toBeVisible();
  });

  test('Navigate to a case detail page', async ({ page }) => {
    const caseHeading = page.getByText(/som gjelder «.+»/).first();
    const caseHeadingText = await caseHeading.innerText();

    await caseHeading.click();

    await expect(page.getByText(caseHeadingText).first()).toBeVisible();
    await expect(page.getByText('Hendelser', { exact: true })).toBeVisible();
  });
});

test.describe('Case detail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(UI_DOMAIN);
    await page.getByText('Her ser du dine saker som er hos Klageinstans.').waitFor();

    await page
      .getByText(/som gjelder «.+»/)
      .first()
      .click();
    await page.getByText('Hendelser', { exact: true }).waitFor();
  });

  test('Shows case heading and case number', async ({ page }) => {
    await expect(page.getByText(/som gjelder «.+»/).first()).toBeVisible();
    await expect(page.getByText('Saksnummer')).toBeVisible();
  });

  test('Shows events section', async ({ page }) => {
    await expect(page.getByText('Hendelser', { exact: true })).toBeVisible();
  });

  test('Shows "Hva skjer nå?" section', async ({ page }) => {
    await expect(page.getByText('Hva skjer nå?')).toBeVisible();
  });

  test('Can expand older events', async ({ page }) => {
    const expandButton = page.getByRole('button', { name: /Vis eldre hendelser/ });

    if (await expandButton.isVisible()) {
      await expandButton.click();
      const collapseButton = page.getByRole('button', { name: 'Skjul eldre hendelser' });
      await expect(collapseButton).toBeVisible();
      await collapseButton.click();
      await expect(expandButton).toBeVisible();
    }
  });
});
