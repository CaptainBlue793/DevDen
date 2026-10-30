import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

async function startWithControlledTime(page: Page, path = '/') {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.clock.install({ time: new Date('2026-10-09T00:00:00Z') });
  await page.clock.pauseAt(new Date('2026-10-09T00:00:01Z'));
  await page.goto(path);
  await expect(page.getByRole('main', { name: 'Palak Deb Patra portfolio startup' })).toBeVisible();
}

test('original loading screen opens the profile-and-Welcome window before any content tabs', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await startWithControlledTime(page);
  await page.clock.runFor(600);
  const typed = page.locator('.startup-line').first().locator('span').nth(1);
  const partial = (await typed.textContent())!;
  expect(partial.length).toBeGreaterThan(0);
  expect(partial.length).toBeLessThan('Palak Deb Patra'.length);
  await expect(page.locator('.startup-line')).toHaveCount(1);
  await page.clock.runFor(2400);
  await expect(typed).toHaveText('Palak Deb Patra');
  await expect(page.locator('.startup-line').nth(1)).toContainText('Start-Portfolio');
  await page.clock.runFor(1500);
  await expect(page.locator('.startup-line')).toHaveCount(3);
  await expect(page.locator('.startup-output')).toHaveText('>> Palak Deb PatraPS > Start-PortfolioOpening portfolio...▌');
  await page.clock.runFor(12000);
  await expect(page).toHaveURL(/#welcome$/);
  await expect(page.locator('.startup-page')).toHaveCount(0);
  await expect(page.getByRole('navigation', { name: 'Explore portfolio' }).getByRole('button')).toHaveCount(6);
  await expect(page.locator('#welcome-title')).toBeFocused();
  for (const button of await page.locator('.welcome-actions button').all()) {
    await expect(button).toHaveCSS('outline-style', 'none');
  }
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Skills', exact: true })).toBeFocused();
  await expect(page.getByRole('button', { name: 'Skills', exact: true })).toHaveCSS('outline-style', 'solid');
  await expect(page.locator('.profile-pane')).toBeVisible();
  await expect(page.getByRole('img', { name: 'Profile image chosen by Palak Deb Patra' })).toBeVisible();
  await expect(page.locator('.terminal-pane .welcome')).toBeVisible();
  await expect(page.getByRole('tab')).toHaveCount(0);
  const sidebar = await page.locator('.profile-pane').boundingBox();
  await page.getByRole('button', { name: 'Projects', exact: true }).click();
  await expect(page.getByRole('tab', { name: 'Projects', exact: true })).toBeFocused();
  await expect(page.getByRole('tab')).toHaveCount(6);
  await expect(page.locator('.welcome-page, .welcome-toolbar')).toHaveCount(0);
  expect(await page.locator('.profile-pane').boundingBox()).toEqual(sidebar);
  expect(errors).toEqual([]);
});

for (const method of ['button', 'Escape'] as const) {
  test(`skip with ${method} opens Welcome and refreshing restarts the original sequence`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Skip intro', exact: true })).toBeVisible();
    if (method === 'button') await page.getByRole('button', { name: 'Skip intro', exact: true }).click();
    else await page.keyboard.press('Escape');
    await expect(page).toHaveURL(/#welcome$/);
    await expect(page.locator('#welcome-title')).toBeFocused();
    await page.getByRole('button', { name: 'Skills', exact: true }).click();
    await expect(page.getByRole('tabpanel')).toContainText('Programming Languages');
    await page.reload();
    await expect(page.locator('.startup-page')).toBeVisible();
    await page.getByRole('button', { name: 'Skip intro', exact: true }).click();
    await expect(page.locator('.terminal-pane .welcome')).toBeVisible();
    await expect(page.getByRole('tab')).toHaveCount(0);
  });
}

test('reduced motion bypasses startup without delaying access', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page).toHaveURL(/#welcome$/);
  await expect(page.locator('.startup-page')).toHaveCount(0);
  await expect(page.locator('.welcome-page')).toBeVisible();
  await expect(page.locator('.portfolio-enter')).toHaveCSS('animation-name', 'none');
});

test('enabling reduced motion while typing ends the intro immediately', async ({ page }) => {
  await startWithControlledTime(page);
  await page.clock.runFor(320);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page).toHaveURL(/#welcome$/);
  await expect(page.locator('.startup-page')).toHaveCount(0);
  await page.clock.runFor(13000);
  await expect(page.getByRole('navigation', { name: 'Explore portfolio' }).getByRole('button')).toHaveCount(6);
});

for (const theme of ['light', 'dark'] as const) {
  test(`browser ${theme} preference still starts dark despite old saved and URL themes`, async ({ page }) => {
    const other = theme === 'light' ? 'dark' : 'light';
    await page.emulateMedia({ colorScheme: theme, reducedMotion: 'no-preference' });
    await page.addInitScript(other => localStorage.setItem('portfolio-theme', other), other);
    await page.goto(`/?theme=${other}`);
    await expect(page.locator('.startup-page')).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.getByRole('button', { name: 'Skip intro', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test(`phone startup fits the viewport with ${theme} browser preference`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.emulateMedia({ colorScheme: theme });
    await startWithControlledTime(page);
    await page.clock.runFor(4500);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    const loadingFont = await page.locator('.startup-output').evaluate(element => parseFloat(getComputedStyle(element).fontSize));
    expect(loadingFont).toBeGreaterThanOrEqual(11);
    expect(loadingFont).toBeLessThanOrEqual(12);
    for (const selector of ['.startup-toolbar', '.startup-footer']) {
      expect(await page.locator(selector).evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBe(loadingFont);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const button = (await page.getByRole('button', { name: 'Skip intro', exact: true }).boundingBox())!;
    expect(button.y).toBeGreaterThanOrEqual(0);
    expect(button.y + button.height).toBeLessThanOrEqual(640);
    await page.screenshot({ path: `test-results/startup-mobile-${theme}.png`, animations: 'disabled' });
    await page.clock.runFor(9000);
    await expect(page).toHaveURL(/#welcome$/);
    expect(await page.locator('.welcome h2').evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThan(loadingFont);
  });
}

test('browser theme changes do not override the manual choice or project exploration state', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await startWithControlledTime(page);
  await page.clock.runFor(600);
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#0c0c0c');
  await page.getByRole('button', { name: 'Skip intro', exact: true }).click();
  await page.getByRole('button', { name: 'Projects', exact: true }).click();
  const memex = page.locator('article').filter({ has: page.getByRole('heading', { name: '>> Memex', exact: true }) });
  await expect(memex.locator('.record-details li')).toHaveCount(2);
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Switch to light theme', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/favicon-light.svg');
  await expect(page.getByRole('tab', { name: 'Projects', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(memex.locator('.record-details')).toContainText('Measured results');
  await expect(memex.locator('details')).toHaveCount(0);
});
