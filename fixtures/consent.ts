import type { BrowserContext, Page } from '@playwright/test';

export const dismissConsentBanner = async (page: Page, context: BrowserContext) => {
  const cookies = await context.cookies();
  const hasConsentCookie = cookies.some((cookie) => cookie.name === 'navno-consent');

  const refuseButton = page.getByTestId('consent-banner-refuse-optional');

  if (!hasConsentCookie) {
    try {
      await refuseButton.waitFor({ timeout: 1000 });
      await refuseButton.click();
    } catch {}
  }
};
