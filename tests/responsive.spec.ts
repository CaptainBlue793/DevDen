import { expect, test } from '@playwright/test';

const sizes = [
  { width: 320, height: 568 }, { width: 390, height: 844 },
  { width: 844, height: 390 }, { width: 768, height: 1024 },
  { width: 1024, height: 768 }, { width: 1280, height: 720 },
  { width: 1920, height: 1080 }, { width: 2560, height: 1440 },
];

for (const width of [320, 390]) {
  test(`phone headings and tabs stay readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/#portfolio/skills');
    const contactSize = await page.locator('.contact a').first().evaluate(element => parseFloat(getComputedStyle(element).fontSize));
    expect(await page.locator('.terminal-output').evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeCloseTo(contactSize, 2);
    expect(contactSize).toBeGreaterThanOrEqual(11);

    for (const label of ['Skills', 'Resume', 'Experience', 'Projects', 'Publications', 'Activities']) {
      const tab = page.getByRole('tab', { name: label, exact: true });
      await tab.click();
      expect(await tab.evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeCloseTo(contactSize, 2);
      const gaps = await page.locator('.record h3').evaluateAll(headings => headings.map(heading => {
        const marker = heading.querySelector('.section-marker')!;
        const title = Array.from(heading.childNodes).find(node => node !== marker && node.textContent?.trim());
        if (!title) return -1;
        const range = document.createRange();
        range.selectNodeContents(title);
        return range.getBoundingClientRect().left - marker.getBoundingClientRect().right;
      }));
      expect(gaps.length).toBeGreaterThan(0);
      expect(gaps.every(gap => gap >= 4)).toBe(true);
      expect(await page.locator('.terminal-output').evaluate(element => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
    }

    expect(await page.locator('.terminal-tab > span:last-child').evaluateAll(labels => labels.every(label => label.getClientRects().length === 1))).toBe(true);
    expect(await page.locator('.terminal-reading').evaluate(element => element.scrollHeight <= element.clientHeight + 1)).toBe(true);
    await page.goto('/#welcome');
    const welcomeFont = await page.locator('.terminal-output--welcome').evaluate(element => parseFloat(getComputedStyle(element).fontSize));
    for (const button of await page.locator('.welcome-actions .cli-action').all()) {
      expect(await button.evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeCloseTo(welcomeFont, 2);
    }
    const headingSize = await page.locator('.welcome h2').evaluate(element => parseFloat(getComputedStyle(element).fontSize));
    expect(headingSize).toBeGreaterThan(welcomeFont);
    expect(headingSize).toBeLessThanOrEqual(21);
  });
}

for (const theme of ['light', 'dark'] as const) {
  for (const size of sizes) {
    test(`all sections fit ${size.width} × ${size.height} in ${theme}`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      await page.goto('/#portfolio');
      const window = page.locator('.terminal-window');
      const bounds = (await window.boundingBox())!;
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(size.height);
      expect(bounds.width).toBeLessThanOrEqual(1920);
      if (size.width <= 1050) {
        await expect(page.locator('.profile-toggle')).toHaveCount(0);
        await expect(page.locator('.profile-details')).toBeVisible();
        for (const contact of await page.locator('.contacts a').all()) await expect(contact).toBeInViewport();
      }
      for (const label of ['Skills', 'Resume', 'Experience', 'Projects', 'Publications', 'Activities']) {
        const tab = page.getByRole('tab', { name: label, exact: true });
        await tab.click();
        await expect(tab).toHaveAttribute('aria-selected', 'true');
        await expect(page.getByRole('tabpanel')).toHaveAccessibleName(label);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        expect(await page.locator('.terminal-output').evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
        if (label === 'Skills') {
          const outputWidth = await page.locator('.terminal-output').evaluate(el => el.clientWidth - parseFloat(getComputedStyle(el).paddingLeft) - parseFloat(getComputedStyle(el).paddingRight));
          const wide = outputWidth >= 760;
          const columns = await page.locator('.skill-tree').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
          expect(columns).toBe(1);
          const rows = page.locator('.skill-branch');
          for (const row of await rows.all()) {
            const heading = (await row.locator('h3').boundingBox())!;
            const technologies = (await row.locator('.technologies').boundingBox())!;
            if (wide) {
              expect(technologies.x).toBeGreaterThan(heading.x + heading.width);
              expect(technologies.y).toBeCloseTo(heading.y, 0);
            } else {
              expect(technologies.y).toBeGreaterThanOrEqual(heading.y + heading.height);
            }
          }
          const firstItems = rows.first().locator('.technology');
          const first = (await firstItems.nth(0).boundingBox())!;
          const second = (await firstItems.nth(1).boundingBox())!;
          expect(second.x).toBeGreaterThan(first.x + first.width);
          expect(second.y).toBeCloseTo(first.y, 0);
        }
        const tabBounds = (await tab.boundingBox())!;
        const stripBounds = (await page.locator('.tab-strip').boundingBox())!;
        expect(tabBounds.x).toBeGreaterThanOrEqual(stripBounds.x - 1);
        expect(tabBounds.x + tabBounds.width).toBeLessThanOrEqual(stripBounds.x + stripBounds.width + 1);
      }
      await page.getByRole('tab', { name: 'Projects', exact: true }).click();
      await expect(page.getByRole('link', { name: 'Open full-size CodeShift screenshot', exact: true })).toBeVisible();
      await page.screenshot({ path: `test-results/responsive-${theme}-${size.width}x${size.height}.png`, animations: 'disabled' });
    });
  }
}

test.describe('touch and changing window sizes', () => {
  test.use({ hasTouch: true, isMobile: true });

  test('mobile profile remains visible while sections scroll and contacts stay reachable', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 500 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/#portfolio');
    await expect(page.locator('.profile-toggle')).toHaveCount(0);
    const before = await page.locator('.profile-pane').boundingBox();
    const cv = page.getByRole('link', { name: 'Scarletta975', exact: false });
    await cv.scrollIntoViewIfNeeded();
    await expect(cv).toBeInViewport();
    await cv.focus();
    await page.keyboard.press('Escape');
    await expect(page.locator('.profile-details')).toBeVisible();
    await expect(cv).toBeFocused();
    for (const selector of ['.replay-intro', '.theme-toggle']) {
      expect((await page.locator(selector).boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
    await page.getByRole('tab', { name: 'Projects', exact: true }).tap();
    await page.locator('.terminal-output').evaluate(el => { el.scrollTop = el.scrollHeight; });
    expect(await page.locator('.profile-pane').boundingBox()).toEqual(before);
    for (const contact of await page.locator('.contacts a').all()) await expect(contact).toBeInViewport();
    const memex = page.locator('article').filter({ has: page.getByRole('heading', { name: '>> Memex', exact: true }) });
    await memex.scrollIntoViewIfNeeded();
    await expect(memex.locator('.record-details li')).toHaveCount(2);
    await expect(memex.locator('details')).toHaveCount(0);
    await expect(memex.getByRole('link', { name: /^GitHub/ })).toBeVisible();
  });

  test('resize and rotation retain section, visible project details, and selected tab', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/#portfolio');
    await page.getByRole('tab', { name: 'Projects', exact: true }).click();
    const memex = page.locator('article').filter({ has: page.getByRole('heading', { name: '>> Memex', exact: true }) });
    for (const size of [{ width: 390, height: 844 }, { width: 844, height: 390 }, { width: 1024, height: 768 }, { width: 1440, height: 900 }]) {
      await page.setViewportSize(size);
      const tab = page.getByRole('tab', { name: 'Projects', exact: true });
      await expect(tab).toHaveAttribute('aria-selected', 'true');
      await expect(memex.locator('.record-details li')).toHaveCount(2);
      await expect(memex.locator('details')).toHaveCount(0);
      await expect.poll(async () => {
        const active = (await tab.boundingBox())!;
        const rail = (await page.locator('.tab-strip').boundingBox())!;
        return active.x >= rail.x - 1 && active.x + active.width <= rail.x + rail.width + 1;
      }).toBe(true);
      const bounds = (await page.locator('.terminal-window').boundingBox())!;
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(size.height);
      expect(await page.locator('.terminal-output').evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
    }
  });
});

test('enlarged text remains readable without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/#portfolio');
  await page.addStyleTag({ content: ':root { font-size: 22px; }' });
  await page.getByRole('tab', { name: 'Publications', exact: true }).click();
  await page.getByText('View citation & BibTeX', { exact: true }).click();
  expect(await page.locator('.terminal-output').evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
  await page.getByRole('link', { name: 'Scarletta975', exact: false }).scrollIntoViewIfNeeded();
  await expect(page.getByRole('link', { name: 'Scarletta975', exact: false })).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('phone tabs and icon links reflow with enlarged text', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#portfolio/resume');
  await page.addStyleTag({ content: ':root { font-size: 26px; }' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.locator('.terminal-output').evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
  for (const tab of await page.getByRole('tab').all()) await expect(tab).toBeInViewport();
  for (const contact of await page.locator('.contacts a').all()) await expect(contact).toBeInViewport();
});
