import AxeBuilder from '@axe-core/playwright';
import { expect } from '@playwright/test';
import { UI_DOMAIN } from '@/config/env';
import { test } from '@/fixtures/registrering/fixture';

test.describe('Mine klager', () => {
  test('Tilgjengelighet', async ({ page }) => {
    const axeBuilder = new AxeBuilder({ page });

    await page.goto(UI_DOMAIN);
    await page.getByText('Her ser du dine saker som er hos Klageinstans.').waitFor();
    expect((await axeBuilder.analyze()).violations).toEqual([]);

    await page.getByText('Trykk her for å se listen').click();
    await page.getByText('Dagpenger').waitFor();
    expect((await axeBuilder.analyze()).violations).toEqual([]);

    await page.getByText('Klage som gjelder «Gjenlevendepensjon»').click();
    await page.getByText('Hva skjer nå?').waitFor();
    expect((await axeBuilder.analyze()).violations).toEqual([]);

    await page.getByText('Vis eldre hendelser').click();
    await page.getByText('Klage mottatt Nav vedtaksinstans').waitFor();
    expect((await axeBuilder.analyze()).violations).toEqual([]);
  });
});
