import { expect, test } from '@playwright/test';

test('four selected projects expose summaries, engineering bullets, and previews without expansion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#portfolio');
  await page.getByRole('tab', { name: 'Projects', exact: true }).click();
  const records = page.locator('.records > .record');
  await expect(records).toHaveCount(4);
  await expect(records.locator('h3').filter({ hasText: /The Engineering Atlas|Memex|CodeShift/ })).toHaveCount(3);
  await expect(records.nth(0).locator('h3')).toContainText('The Engineering Atlas');
  await expect(records.nth(1).locator('h3')).toContainText('CodeShift');
  await expect(records.nth(2).locator('h3')).toContainText('Memex');
  await expect(records.nth(3).locator('h3')).toContainText('FrameSmith');
  await expect(records.locator('details, summary')).toHaveCount(0);
  await expect(page.locator('.code-cover')).toHaveCount(0);
  const screenshotSources = new Set<string>();
  for (const title of ['The Engineering Atlas', 'CodeShift', 'Memex', 'FrameSmith']) {
    const project = records.filter({ has: page.getByRole('heading', { name: `>> ${title}`, exact: true }) });
    await expect(project.locator('.description')).toHaveCount(1);
    await expect(project.locator('.description')).toBeVisible();
    await expect(project.locator('.record-details li')).toHaveCount(2);
    for (const bullet of await project.locator('.record-details li').all()) {
      await expect(bullet).toBeVisible();
      await expect(bullet.locator('mark')).toHaveCount(1);
    }
    await expect(project.getByRole('link', { name: /^GitHub/ })).toHaveAttribute('href', /^https:\/\/github.com\/CaptainBlue793\//);
    await expect(project.getByRole('list', { name: `${title} tech stack`, exact: true })).toBeVisible();
    const screenshot = project.locator('.case-cover > img');
    await expect(screenshot).toBeVisible();
    await expect(screenshot).toHaveAttribute('alt', /.+/);
    await expect.poll(() => screenshot.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(1000);
    const source = (await screenshot.getAttribute('src'))!;
    expect(source).toMatch(/^\/images\/projects\/.+\.(png|jpg)$/);
    screenshotSources.add(source);
    await expect(project.getByRole('link', { name: `Open full-size ${title} screenshot`, exact: true })).toHaveAttribute('href', source);
    if (title === 'CodeShift') {
      await expect(project.locator('.record-details')).toContainText('August 19, 2026 run verified 15 of 31 modules');
      await expect(project.locator('.record-details')).toContainText('197 functions and methods');
      await expect(project.getByRole('link', { name: /Benchmark Report/ })).toHaveAttribute('href', /scale-run-2026-08-19\.md$/);
    }
    if (title === 'FrameSmith') {
      await expect(project.locator('.description')).toContainText('prototype');
      await expect(project.locator('.record-details')).toContainText('improvements remain unvalidated');
    }
    await expect(project.locator('.workflow, .cli-flow, .workflow-explanation')).toHaveCount(0);
  }
  expect(screenshotSources.size).toBe(4);
});

test('NatWest roles use plain bullets and retain verified internship outcomes', async ({ page }) => {
  await page.goto('/#portfolio');
  await page.getByRole('tab', { name: 'Experience', exact: true }).click();
  await expect(page.locator('.record-column > article')).toHaveCount(2);
  const roles = page.locator('.record-column > article');
  await expect(roles.nth(0).locator('.record-details li')).toHaveCount(5);
  await expect(roles.nth(1).locator('.record-details li')).toHaveCount(3);
  await expect(roles.nth(0).locator('.record-meta')).toHaveText('July 2025 – Present · Bangalore, India');
  await expect(roles.nth(0).locator('.record-details')).toContainText('131 automated tests');
  await expect(roles.nth(0).locator('.record-details')).toContainText('23 of 26 SIT/UAT test cases passing');
  await expect(roles.nth(1).locator('.record-meta')).toHaveText('May – July 2024 · Gurgaon, India');
  await expect(roles.nth(1).locator('.record-details')).toContainText('reducing processing time by 28%');
  await expect(roles.nth(1).locator('.record-details')).toContainText('16 CSV datasets');
  await expect(roles.nth(1).locator('.record-details')).toContainText('ThoughtSpot');
  await expect(page.getByRole('tabpanel').locator('mark, .experience-outcomes, .career-progression, .workflow, .record-stack, .description-label')).toHaveCount(0);
  await expect(page.getByRole('tabpanel')).not.toContainText('Undergraduate Student Researcher');
});

test('email stays a direct link and publication copy actions recover from clipboard errors', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#portfolio');
  await expect(page.getByRole('button', { name: /Copy email/ })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'palakdevpatra@gmail.com', exact: true })).toHaveAttribute('href', 'mailto:palakdevpatra@gmail.com');
  await page.getByRole('tab', { name: 'Publications', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Research Overview', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'My contribution', exact: true })).toHaveCount(0);
  await expect(page.getByRole('img', { name: /Conceptual approach/ })).toHaveCount(0);
  await page.getByRole('button', { name: 'Copy citation', exact: true }).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain('10.1109/SPCOM71105.2026.11622932');
  await page.getByRole('button', { name: 'Copy BibTeX', exact: true }).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain('@inproceedings{patra2026bidirectional');
  await page.evaluate(() => { navigator.clipboard.writeText = async () => { throw new Error('Clipboard denied'); }; });
  await page.getByRole('button', { name: 'Copy citation', exact: true }).click();
  await expect(page.locator('.copy-fallback')).toContainText('doi: 10.1109/SPCOM71105.2026.11622932');
});

for (const method of ['button', 'Escape', 'completion'] as const) test(`replayed intro returns to Welcome through ${method} in the selected theme`, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference', colorScheme: 'dark' });
  await page.clock.install();
  await page.goto('/#portfolio/projects');
  await page.getByRole('button', { name: 'Switch to light theme', exact: true }).click();
  await page.getByRole('button', { name: 'Replay intro', exact: true }).click();
  await expect(page.locator('.startup-page')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByRole('button', { name: 'Skip intro', exact: true })).toBeFocused();
  if (method === 'button') await page.getByRole('button', { name: 'Skip intro', exact: true }).click();
  else if (method === 'Escape') await page.keyboard.press('Escape');
  else await page.clock.runFor(12000);
  await expect(page).toHaveURL(/#welcome$/);
  await expect(page.getByRole('heading', { name: 'Step Into My DevDen.', exact: true })).toBeFocused();
  await expect(page.getByRole('navigation', { name: 'Explore portfolio' }).getByRole('button')).toHaveCount(6);
  await expect(page.getByRole('tab')).toHaveCount(0);
  await expect(page.locator('.profile-pane')).toBeVisible();
  await expect(page.locator('.welcome-doodle')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.clock.runFor(15000);
  await expect(page).toHaveURL(/#welcome$/);
});

test('slower preview honors browser theme despite stale settings and completes automatically', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference', colorScheme: 'light' });
  await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'dark'));
  await page.clock.install({ time: new Date('2026-10-09T00:00:00Z') });
  await page.clock.pauseAt(new Date('2026-10-09T00:00:01Z'));
  await page.goto('/?theme=dark&intro=slow');
  await page.clock.runFor(5000);
  await expect(page.locator('.startup-page')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  expect(await page.evaluate(() => localStorage.getItem('portfolio-theme'))).toBe('dark');
  await page.clock.runFor(8000);
  await expect(page).toHaveURL(/intro=slow#welcome$/);
  await expect(page.getByRole('navigation', { name: 'Explore portfolio' }).getByRole('button')).toHaveCount(6);
});

for (const theme of ['light', 'dark'] as const) {
  test(`visible project details and publication remain readable on a phone in ${theme} mode`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: theme });
    await page.setViewportSize({ width: 360, height: 760 });
    await page.goto('/#portfolio');
    await page.getByRole('tab', { name: 'Projects', exact: true }).click();
    const output = page.locator('.terminal-output');
    for (const title of ['The Engineering Atlas', 'CodeShift', 'Memex', 'FrameSmith']) {
      const project = page.locator('article').filter({ has: page.getByRole('heading', { name: `>> ${title}`, exact: true }) });
      await project.scrollIntoViewIfNeeded();
      await expect(project.locator('.record-details li')).toHaveCount(2);
      await expect(project.locator('details')).toHaveCount(0);
      expect(await output.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    }
    await page.getByRole('tab', { name: 'Publications', exact: true }).click();
    await page.getByText('View citation & BibTeX', { exact: true }).click();
    expect(await output.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('.research-overview')).toBeVisible();
    await expect(page.locator('.research-diagram')).toHaveCount(0);
    await page.screenshot({ path: `test-results/publication-phone-${theme}.png`, animations: 'disabled' });
  });
}
