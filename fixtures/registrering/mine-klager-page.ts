import type { Page } from '@playwright/test';

export class MineKlagerPage {
  constructor(public readonly page: Page) {}
}
