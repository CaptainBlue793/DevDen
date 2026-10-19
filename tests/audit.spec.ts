import { expect, test } from '@playwright/test';

test('section URL changes and browser history stay synchronized with the visible content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#portfolio/skills');
  await expect(page.getByRole('tab', { name: 'Skills', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.evaluate(() => { window.location.hash = '#portfolio/publications'; });
  await expect(page.getByRole('tabpanel')).toHaveAccessibleName('Publications');
  await expect(page.getByRole('heading', { name: 'Research Overview', exact: true })).toBeVisible();
  await page.goBack();
  await expect(page.getByRole('tabpanel')).toHaveAccessibleName('Skills');
  await page.goForward();
  await expect(page.getByRole('tabpanel')).toHaveAccessibleName('Publications');
});

test('each section has a level-two heading and valid screen-reader references', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#portfolio');
  for (const label of ['Skills', 'Resume', 'Experience', 'Projects', 'Publications', 'Activities']) {
    await page.getByRole('tab', { name: label, exact: true }).click();
    await expect(page.getByRole('tabpanel').getByRole('heading', { name: label, level: 2, exact: true })).toHaveCount(1);
    const missingReferences = await page.evaluate(() => [...document.querySelectorAll('[aria-controls], [aria-labelledby]')].flatMap(element =>
      ['aria-controls', 'aria-labelledby'].flatMap(attribute => (element.getAttribute(attribute) ?? '').split(/\s+/).filter(Boolean)
        .filter(id => !document.getElementById(id)))));
    expect(missingReferences).toEqual([]);
  }
});
