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

for (const width of [320, 768]) {
test(`${width}px view shows all six tabs in two rows and supports grid keyboard navigation`, async ({ page }) => {
  await page.setViewportSize({ width, height: width === 320 ? 568 : 1024 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#portfolio/skills');
  const strip = page.getByRole('tablist');
  const tabs = strip.getByRole('tab');
  await expect(tabs).toHaveCount(6);
  await expect(page.getByRole('button', { name: /Scroll tabs/ })).toHaveCount(0);
  await expect(page.locator('.navigation-hint--compact')).toHaveText('Select a tab');
  const boxes = await Promise.all((await tabs.all()).map(tab => tab.boundingBox()));
  for (let index = 0; index < 3; index++) {
    expect(boxes[index]!.y).toBeCloseTo(boxes[0]!.y, 0);
    expect(boxes[index + 3]!.y).toBeCloseTo(boxes[3]!.y, 0);
    expect(boxes[index + 3]!.x).toBeCloseTo(boxes[index]!.x, 0);
  }
  expect(boxes[3]!.y).toBeGreaterThan(boxes[0]!.y);
  for (const tab of await tabs.all()) await expect(tab).toBeInViewport();
  await page.getByRole('tab', { name: 'Skills', exact: true }).focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('tab', { name: 'Projects', exact: true })).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await expect(page.getByRole('tab', { name: 'Skills', exact: true })).toBeFocused();
  await page.getByRole('tab', { name: 'Publications', exact: true }).click();
  const selected = (await page.getByRole('tab', { selected: true }).boundingBox())!;
  const rail = (await strip.boundingBox())!;
  expect(selected.x).toBeGreaterThanOrEqual(rail.x - 1);
  expect(selected.x + selected.width).toBeLessThanOrEqual(rail.x + rail.width + 1);
  await page.goto('/#welcome');
  await expect(page.locator('.terminal-reading, .tab-scroll')).toHaveCount(0);
});
}
