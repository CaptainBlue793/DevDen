import { expect, test } from '@playwright/test';

const groups = [
  { tab: 'Experience', left: 'Full-time', right: 'Internship', leftRecords: ['NatWest Group · Software Engineer'], rightRecords: ['NatWest Group · Software Engineering Intern'] },
  { tab: 'Activities', left: 'Technical', right: 'Non-technical', leftRecords: ['Competitive Programming', 'Amazon ML Summer School'], rightRecords: ['NITRUTSAV · Event Management Coordinator', 'AASRA · Senior Staff Member', 'Interests'] },
];

for (const theme of ['light', 'dark'] as const) {
  for (const width of [1440, 360]) {
    test(`section-specific column layouts in ${theme} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      await page.goto('/#portfolio');
      for (const group of groups) {
        await page.getByRole('tab', { name: group.tab, exact: true }).click();
        const left = page.getByRole('region', { name: group.left, exact: true });
        const right = page.getByRole('region', { name: group.right, exact: true });
        await expect(left.locator('article h3')).toHaveText(group.leftRecords.map(title => `>> ${title}${title === 'Competitive Programming' ? '↗' : ''}`));
        await expect(right.locator('article h3')).toHaveText(group.rightRecords.map(title => `>> ${title}`));
        await expect(page.locator('.records article')).toHaveCount(group.leftRecords.length + group.rightRecords.length);
        const leftBox = (await left.boundingBox())!;
        const rightBox = (await right.boundingBox())!;
        if (width === 1440 && group.tab === 'Activities') {
          expect(rightBox.x).toBeGreaterThan(leftBox.x + leftBox.width);
          expect(Math.abs(rightBox.y - leftBox.y)).toBeLessThan(2);
        } else {
          expect(rightBox.y).toBeGreaterThan(leftBox.y + leftBox.height);
          expect(Math.abs(rightBox.x - leftBox.x)).toBeLessThan(2);
          const recordsBox = (await page.locator('.records').boundingBox())!;
          expect(Math.abs(leftBox.width - recordsBox.width)).toBeLessThan(2);
          expect(Math.abs(rightBox.width - recordsBox.width)).toBeLessThan(2);
        }
        if (group.tab !== 'Activities') await expect(page.locator('.records')).toHaveClass(/single-column/);
        expect(await page.locator('.terminal-output').evaluate(element => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
      }
      await page.getByRole('tab', { name: 'Publications', exact: true }).click();
      await expect(page.locator('.records')).toHaveClass(/single-column/);
      expect(await page.locator('.records').evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBe(1);
      for (const tab of ['Experience', 'Publications']) {
        await page.getByRole('tab', { name: tab, exact: true }).click();
        expect(await page.locator('.records').evaluate(element => getComputedStyle(element, '::before').content)).toBe('none');
      }
    });
  }
}

test('publication omits contribution while project summaries expose engineering work', async ({ page }) => {
  await page.goto('/#portfolio');
  await page.getByRole('tab', { name: 'Publications', exact: true }).click();
  await expect(page.getByRole('tabpanel')).not.toContainText('My contribution');
  await expect(page.getByRole('heading', { name: 'Research Overview', exact: true })).toBeVisible();
  await expect(page.locator('.research-overview')).toHaveCount(1);
  await expect(page.locator('.research-overview p')).toContainText('Bidirectional Convolutional GRU modules');
  await expect(page.getByRole('tabpanel').locator('.description-label, .research-figure, .workflow')).toHaveCount(0);
  await expect(page.getByRole('tabpanel')).not.toContainText('A GAN with bidirectional convolutional GRU modules for enhancing low-light images without paired training examples.');
  await expect(page.getByRole('button', { name: 'Copy citation', exact: true })).toBeVisible();
  await page.getByRole('tab', { name: 'Projects', exact: true }).click();
  await expect(page.locator('.project-information').first().locator('.record-details')).toContainText('built a shared course hub');
  await expect(page.locator('.project-list details')).toHaveCount(0);
});

for (const width of [1440, 360]) {
  test(`publication hierarchy and hanging bullet alignment at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/#portfolio/publications');
    const meta = (await page.locator('.record-meta').boundingBox())!;
    const overview = (await page.locator('.research-overview').boundingBox())!;
    expect(meta.y + meta.height).toBeLessThan(overview.y);
    await expect(page.locator('.record-details')).toHaveCount(0);
    await expect(page.locator('.record-facts dt')).toHaveText(['Authors:', 'DOI:']);
    await expect(page.locator('.record-facts a')).toHaveAttribute('href', 'https://doi.org/10.1109/SPCOM71105.2026.11622932');
    const fieldAlignment = await page.locator('.record-facts').evaluate(el => {
      const labels = [...el.querySelectorAll('dt')].map(label => label.getBoundingClientRect());
      const values = [...el.querySelectorAll('dd')].map(value => value.getBoundingClientRect());
      return { labels: labels.map(label => label.x), values: values.map(value => value.x), labelHeights: labels.map(label => label.height), lineHeight: parseFloat(getComputedStyle(el.querySelector('dt')!).lineHeight) };
    });
    expect(new Set(fieldAlignment.labels).size).toBe(1);
    expect(new Set(fieldAlignment.values).size).toBe(1);
    for (const height of fieldAlignment.labelHeights) expect(height).toBeCloseTo(fieldAlignment.lineHeight, 0);
    await page.getByRole('tab', { name: 'Projects', exact: true }).click();
    const framesmith = page.locator('article').filter({ has: page.getByRole('heading', { name: /FrameSmith/ }) });
    await expect(framesmith.locator('.description').first()).toContainText('prototype');
    for (const record of await page.locator('.project-information').all()) await expect(record.locator(':scope > .record-details li')).toHaveCount(2);
    const stack = page.locator('.project-information .technologies').first();
    expect(await stack.evaluate(el => getComputedStyle(el).flexDirection)).toBe('row');
    await page.getByRole('tab', { name: 'Activities', exact: true }).click();
    const bullet = page.locator('.record-details li > span:last-child').first();
    const alignment = await bullet.evaluate(el => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const lines = [...range.getClientRects()];
      return { left: el.getBoundingClientRect().left, lines: lines.map(line => ({ left: line.left, top: line.top })) };
    });
    for (const line of alignment.lines) expect(line.left).toBeCloseTo(alignment.left, 0);
    expect(await page.locator('.terminal-output').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  });
}
