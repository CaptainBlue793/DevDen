import { expect, test } from '@playwright/test';

test('ASCII progress follows reading position and survives section switches', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#portfolio/projects');
  const output = page.getByRole('tabpanel');
  const progress = page.getByRole('progressbar', { name: 'Projects reading progress' });
  await expect(progress).toHaveAttribute('aria-valuenow', '0');
  await expect(progress).toHaveText('[----------] 0%');
  await output.evaluate(element => { element.scrollTop = (element.scrollHeight - element.clientHeight) / 2; });
  await expect(progress).toHaveAttribute('aria-valuenow', '50');
  await expect(progress).toHaveText('[=====-----] 50%');
  await page.screenshot({ path: 'test-results/cli-progress-desktop.png', animations: 'disabled' });
  await output.evaluate(element => { element.scrollTop = element.scrollHeight; });
  await expect(progress).toHaveAttribute('aria-valuenow', '100');
  await page.getByRole('tab', { name: 'Skills', exact: true }).click();
  await expect(page.getByRole('progressbar')).toHaveCount(0);
  await expect(page.locator('.navigation-hint--keyboard')).toBeVisible();
  await page.getByRole('tab', { name: 'Projects', exact: true }).click();
  await expect(progress).toHaveAttribute('aria-valuenow', '100');
});

test('reading progress recalculates when the content wraps after resizing', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#portfolio/projects');
  const output = page.getByRole('tabpanel');
  const progress = page.getByRole('progressbar', { name: 'Projects reading progress' });
  await output.evaluate(element => { element.scrollTop = element.scrollHeight; });
  await expect(progress).toHaveAttribute('aria-valuenow', '100');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(async () => {
    const actual = await output.evaluate(element => Math.round(element.scrollTop / (element.scrollHeight - element.clientHeight) * 100));
    return Number(await progress.getAttribute('aria-valuenow')) === actual;
  }).toBe(true);
  await output.evaluate(element => { element.scrollTop = (element.scrollHeight - element.clientHeight) / 2; });
  await expect(progress).toHaveAttribute('aria-valuenow', '50');
  await expect(progress).toBeInViewport();
  await page.screenshot({ path: 'test-results/cli-progress-phone.png', animations: 'disabled' });
});

test('phone chevrons browse hidden tabs without changing the active section', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#portfolio/skills');
  const previous = page.getByRole('button', { name: 'Scroll tabs left' });
  const next = page.getByRole('button', { name: 'Scroll tabs right' });
  const strip = page.getByRole('tablist');
  await expect(previous).toBeVisible();
  await expect(previous).toBeDisabled();
  await expect(next).toBeEnabled();
  await expect(page.locator('.navigation-hint--compact')).toHaveText('Swipe tabs');
  await next.click();
  await expect.poll(() => strip.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
  await expect(previous).toBeEnabled();
  await expect(page.getByRole('tab', { name: 'Skills', exact: true })).toHaveAttribute('aria-selected', 'true');
  for (let attempt = 0; attempt < 12 && await next.isEnabled(); attempt++) await next.click();
  await expect(next).toBeDisabled();
  const end = await strip.evaluate(element => element.scrollLeft);
  await previous.click();
  await expect.poll(() => strip.evaluate(element => element.scrollLeft)).toBeLessThan(end);
  await page.getByRole('tab', { name: 'Publications', exact: true }).click();
  const selected = (await page.getByRole('tab', { selected: true }).boundingBox())!;
  const rail = (await strip.boundingBox())!;
  expect(selected.x).toBeGreaterThanOrEqual(rail.x - 1);
  expect(selected.x + selected.width).toBeLessThanOrEqual(rail.x + rail.width + 1);
  await page.goto('/#welcome');
  await expect(page.locator('.terminal-reading, .tab-scroll')).toHaveCount(0);
});
