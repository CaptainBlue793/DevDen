import { expect, test } from '@playwright/test';

for (const size of [
  { name: 'desktop', viewport: { width: 1440, height: 900 } },
  { name: 'phone', viewport: { width: 390, height: 844 } },
]) {
  test(`${size.name} downloads the profile artwork during startup and reuses it after Skip`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ viewport: size.viewport, deviceScaleFactor: 2, reducedMotion: 'no-preference' });
    try {
      const page = await context.newPage();
      const client = await context.newCDPSession(page);
      await client.send('Network.enable');
      await client.send('Network.setCacheDisabled', { cacheDisabled: true });
      const imageRequests: string[] = [];
      page.on('request', request => {
        if (request.url().endsWith('/images/profile.png')) imageRequests.push(request.url());
      });
      const portraitResponse = page.waitForResponse(response => response.url().endsWith('/images/profile.png'));
      await page.goto(baseURL!);
      await expect(page.locator('.startup-page')).toBeVisible();
      await expect(page.locator('.portrait')).toHaveCount(0);
      const response = await portraitResponse;
      expect(response.status()).toBe(200);
      expect((await response.body()).length).toBeGreaterThan(0);
      await page.getByRole('button', { name: 'Skip intro', exact: true }).click();
      const portrait = page.locator('.portrait img');
      await expect(portrait).toBeVisible();
      await portrait.evaluate(image => (image as HTMLImageElement).decode());
      expect(await portrait.evaluate(image => (image as HTMLImageElement).currentSrc)).toBe(response.url());
      await page.getByRole('button', { name: 'Projects', exact: true }).click();
      await expect(page.getByRole('tabpanel')).toBeVisible();
      expect(imageRequests).toEqual([response.url()]);
    } finally {
      await context.close();
    }
  });
}
