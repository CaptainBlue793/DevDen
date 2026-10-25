import { expect, test } from '@playwright/test';

const labels = ['Skills', 'Resume', 'Experience', 'Projects', 'Publications', 'Activities'];

test('six formatted tabs, narrower sidebar, and stationary desktop panes', async ({ page }) => {
  await page.goto('/#portfolio');
  await expect(page.getByRole('tab')).toHaveCount(6);
  for (const [index, label] of labels.entries()) await expect(page.getByRole('tab').nth(index)).toHaveAccessibleName(label);
  await expect(page.locator('.welcome-page')).toHaveCount(0);
  await page.getByRole('tab', { name: 'Resume', exact: true }).click();
  await expect(page.getByRole('heading', { name: '>> About Me', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: '>> Education', exact: true })).toHaveCount(0);
  const sidebar = await page.locator('.profile-pane').boundingBox();
  const toolbar = await page.locator('.terminal-toolbar').boundingBox();
  expect(sidebar!.width / (await page.locator('.terminal-window').boundingBox())!.width).toBeCloseTo(0.25, 2);
  await expect(page.locator('.profile-command')).toContainText('Get-Portfolio');
  await expect(page.getByRole('tabpanel')).toContainText('I’m a Software Engineer at NatWest Group');
  await expect(page.getByRole('tabpanel')).toContainText('MCP integrations, AI observability and data parsing');
  const portrait = (await page.locator('.portrait').boundingBox())!;
  expect(portrait.y + portrait.height / 2).toBeLessThan(sidebar!.y + sidebar!.height / 2);
  await page.getByRole('tab', { name: 'Projects', exact: true }).click();
  await expect(page.locator('article').filter({ has: page.getByRole('heading', { name: '>> Memex', exact: true }) }).getByRole('link', { name: /^GitHub/ })).toHaveAttribute('href', 'https://github.com/CaptainBlue793/Memex');
  await page.locator('.terminal-output').evaluate(element => { element.scrollTop = element.scrollHeight; });
  expect(await page.locator('.profile-pane').boundingBox()).toEqual(sidebar);
  expect(await page.locator('.terminal-toolbar').boundingBox()).toEqual(toolbar);
  for (const label of labels) {
    await page.getByRole('tab', { name: label, exact: true }).click();
    await expect(page.getByRole('tabpanel')).toHaveAccessibleName(label);
    await expect(page.locator('.main-record, .description-label')).toHaveCount(0);
    await expect(page.getByRole('tabpanel')).not.toContainText('[featured]');
    const records = page.locator('.record');
    for (let i = 0; i < await records.count(); i++) {
      await expect(records.nth(i).locator('h2, h3')).toContainText('>>');
    }
  }
});

test('tabs retain reading positions and the bottom prompt is removed', async ({ page }) => {
  await page.goto('/#portfolio');
  await expect(page.getByRole('textbox')).toHaveCount(0);
  await expect(page.locator('.command-form, .status-strip, .sidebar-footer, .output-prompt')).toHaveCount(0);
  await expect(page.getByRole('tabpanel')).not.toContainText('completed successfully');
  await page.getByRole('tab', { name: 'Projects', exact: true }).click();
  await page.locator('.terminal-output').evaluate(element => { element.scrollTop = 650; });
  const position = await page.locator('.terminal-output').evaluate(element => element.scrollTop);
  expect(position).toBeGreaterThan(500);
  await page.getByRole('tab', { name: 'Resume', exact: true }).click();
  expect(await page.locator('.terminal-output').evaluate(element => element.scrollTop)).toBe(0);
  await page.getByRole('tab', { name: 'Projects', exact: true }).click();
  await expect.poll(() => page.locator('.terminal-output').evaluate(element => element.scrollTop)).toBe(position);
});

test('supplied image, accessible brand links, and resume viewer entry', async ({ page, request }) => {
  await page.goto('/#portfolio');
  const image = page.getByRole('img', { name: 'Profile image chosen by Palak Deb Patra' });
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute('src', '/images/profile-720.webp');
  await expect(page.locator('.profile-details .role')).toHaveCount(0);
  await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  expect((await request.get('/images/profile-720.webp')).status()).toBe(200);
  await expect(page.locator('.profile-pane').getByRole('link', { name: /Google Drive/ })).toHaveCount(0);
  await page.getByRole('tab', { name: 'Resume', exact: true }).click();
  await expect(page.getByRole('button', { name: 'View Professional CV', exact: true })).toBeVisible();
  await expect(page.locator('a[href*="drive.google.com"]')).toHaveCount(0);
  await expect(page.locator('.contact-label [data-icon="LinkedIn"]')).toBeVisible();
  await expect(page.locator('.contact-label [data-icon="GitHub"]')).toBeVisible();
  await expect(page.locator('.contact-label [data-icon="Hugging Face"]')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Email: palakdevpatra@gmail.com', exact: true })).toHaveAttribute('href', 'mailto:palakdevpatra@gmail.com');
  const contactLabels = await page.locator('.contact-label').evaluateAll(elements => elements.map(element => element.getBoundingClientRect().left));
  expect(contactLabels).toHaveLength(5);
  for (const left of contactLabels) expect(left).toBeCloseTo(contactLabels[0], 0);
  const contactValues = await page.locator('.contacts a').evaluateAll(elements => elements.map(element => element.getBoundingClientRect().left));
  for (const left of contactValues) expect(left).toBeCloseTo(contactValues[0], 0);
  for (const contact of await page.locator('.contact').all()) {
    const tops = await contact.evaluate(el => ['.contact-key', '.contact-value'].map(selector => {
      const text = document.createTreeWalker(el.querySelector(selector)!, NodeFilter.SHOW_TEXT).nextNode()!;
      const range = document.createRange();
      range.setStart(text, 0);
      range.setEnd(text, 1);
      return range.getBoundingClientRect().top;
    }));
    expect(Math.abs(tops[0] - tops[1])).toBeLessThan(.5);
  }
});

test('important facts, skill icons, and project details', async ({ page }) => {
  await page.goto('/#portfolio');
  await page.getByRole('tab', { name: 'Resume', exact: true }).click();
  await expect(page.locator('.keyword-default').filter({ hasText: 'Software Engineer' })).toBeVisible();
  await expect(page.locator('mark')).toHaveCount(0);
  await page.getByRole('tab', { name: 'Skills', exact: true }).click();
  await expect(page.locator('.skill-tree')).toBeVisible();
  await expect(page.locator('.skill-branch .description-label')).toHaveCount(0);
  await expect(page.locator('.skill-branch .record-details')).toHaveCount(0);
  await expect(page.locator('.technology [data-icon="Python"]')).toHaveCount(1);
  await expect(page.locator('.technology [data-icon="Java"]')).toHaveCount(1);
  await expect(page.locator('.skill-branch')).toHaveCount(9);
  const technologies = await page.locator('.technology > span:last-child').allTextContents();
  expect(new Set(technologies).size).toBe(technologies.length);
  const languages = page.getByRole('list', { name: 'Programming Languages technologies', exact: true });
  await expect(languages).not.toContainText('GraphQL');
  await expect(languages).toContainText('TypeScript');
  await expect(languages).not.toContainText('JavaScript');
  await expect(page.getByRole('list', { name: 'APIs technologies', exact: true })).toContainText('GraphQL');
  const ai = page.getByRole('list', { name: 'AI/ML technologies', exact: true });
  await expect(ai).toContainText('PyTorch');
  await expect(ai).toContainText('spaCy');
  for (const added of ['OpenCV', 'NVIDIA CUDA']) await expect(ai).toContainText(added);
  await expect(page.getByRole('list', { name: 'Web Interfaces technologies', exact: true })).not.toContainText('React');
  await expect(page.getByRole('list', { name: 'APIs technologies', exact: true })).toContainText('FastAPI');
  await expect(page.getByRole('list', { name: 'Power Platform technologies', exact: true })).toContainText('Power Automate');
  await expect(page.getByRole('list', { name: 'Cloud technologies', exact: true })).toContainText('Cloudflare Workers');
  const development = page.getByRole('list', { name: 'Development technologies', exact: true });
  await expect(development).toContainText('Jupyter');
  for (const added of ['FastMCP', 'Azure', 'Ansible', 'GitLab CI/CD', 'Claude', 'Codex']) expect(technologies).toContain(added);
  for (const removed of ['Spring Boot', 'Docker', 'Hypothesis', 'pytest', 'tree-sitter', 'Postman', 'SQLite', 'Vite', 'Embeddings', 'Transformers']) expect(technologies).not.toContain(removed);
  for (const [name, file] of [
    ['FastMCP', 'fastmcp-light.svg'], ['Azure', 'azure.svg'],
    ['Microsoft Copilot Studio', 'copilot-studio.svg'],
  ]) await expect(page.locator(`.skill-tree [data-icon="${name}"] img`).first()).toHaveAttribute('src', `/images/brands/${file}`);
  for (const name of ['GitLab CI/CD', 'Ansible', 'Claude', 'Codex']) await expect(page.locator(`.skill-tree svg[data-icon="${name}"][fill="currentColor"] path`)).toHaveCount(1);
  await expect(page.locator('.skill-tree svg[data-icon="REST APIs"] rect')).toHaveCount(1);
  await expect(page.getByRole('list', { name: 'Databases technologies', exact: true })).toContainText('ChromaDB');
  await expect(page.getByRole('list', { name: 'Agent Systems technologies', exact: true })).not.toContainText('ChromaDB');
  await expect(page.getByRole('heading', { name: /Development/ })).not.toContainText('verification');
  await page.getByRole('tab', { name: 'Projects', exact: true }).click();
  await expect(page.locator('.workflow, .cli-flow')).toHaveCount(0);
  await expect(page.locator('.records > .record')).toHaveCount(4);
  await page.getByRole('tab', { name: 'Experience', exact: true }).click();
  await expect(page.locator('.record-details li')).toHaveCount(12);
  await expect(page.locator('.record-details')).toContainText(['131 automated tests', 'reducing manual processing time by 28%']);
  await expect(page.getByRole('tabpanel').locator('.keyword-cyan').first()).toContainText('OpenTelemetry');
  await expect(page.getByRole('tabpanel').locator('.keyword-green').first()).toContainText('131 automated tests');
  await page.getByRole('tab', { name: 'Activities', exact: true }).click();
  await expect(page.locator('.keyword-default').filter({ hasText: '800+' })).toBeVisible();
  await expect(page.locator('mark')).toHaveCount(0);
  await expect(page.getByRole('tabpanel').locator('[data-icon="LeetCode"]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Competitive programming', exact: false })).toHaveAttribute('href', 'https://leetcode.com/BlueMask6/');
});

test('keyboard tab navigation and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#portfolio');
  await page.getByRole('tab', { name: 'Skills', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Resume', exact: true })).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Experience', exact: true })).toBeFocused();
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: 'Activities', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('Home');
  await expect(page.getByRole('tab', { name: 'Skills', exact: true })).toBeFocused();
  for (const selector of ['.cursor', '.terminal-session', '.typed-command', '.records .record']) {
    await expect(page.locator(selector).first()).toHaveCSS('animation-name', 'none');
  }
  await expect(page.locator('.theme-toggle')).toHaveCSS('transition-duration', '0s');
});

for (const preference of ['light', 'dark'] as const) {
  test(`${preference} browser theme, switching, and automatic theme on reload`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: preference });
    await page.goto('/#portfolio');
    const alternative = preference === 'dark' ? 'light' : 'dark';
    await expect(page.locator('html')).toHaveAttribute('data-theme', preference);
    await expect(page.locator('.profile-pane')).toHaveCSS('background-color', preference === 'light' ? 'rgb(245, 245, 245)' : 'rgb(16, 16, 16)');
    await expect(page.getByRole('heading', { name: 'Palak Deb Patra', exact: true })).toBeVisible();
    await page.getByRole('tab', { name: 'Projects', exact: true }).click();
    await page.getByRole('button', { name: `Switch to ${alternative} theme`, exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', alternative);
    await expect(page.locator('.terminal-pane')).toHaveCSS('background-color', alternative === 'light' ? 'rgb(255, 255, 255)' : 'rgb(12, 12, 12)');
    await expect(page.locator('.profile-pane')).toHaveCSS('background-color', alternative === 'light' ? 'rgb(245, 245, 245)' : 'rgb(16, 16, 16)');
    await expect(page.locator('.profile-pane').getByRole('link', { name: /Google Drive/ })).toHaveCount(0);
    await expect(page.getByRole('tab', { name: 'Projects', exact: true })).toHaveAttribute('aria-selected', 'true');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', preference);
    await page.getByRole('button', { name: 'Skip intro', exact: true }).click();
    await expect(page.getByRole('button', { name: `Switch to ${alternative} theme`, exact: true })).toBeVisible();
    await page.screenshot({ path: `test-results/theme-${preference}.png`, animations: 'disabled' });
  });
}

for (const theme of ['light', 'dark'] as const) {
  test(`coordinated title and keyword font colors remain readable in ${theme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
    await page.goto('/#portfolio');
    await page.getByRole('tab', { name: 'Projects', exact: true }).click();
    const palette = await page.evaluate(() => {
      function luminance(color: string) {
        const channels = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map(value => value / 255)
          .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
        return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
      }
      function contrast(foreground: string, background: string) {
        const a = luminance(foreground), b = luminance(background);
        return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
      }
      const output = getComputedStyle(document.querySelector('.terminal-pane')!).backgroundColor;
      const sidebar = getComputedStyle(document.querySelector('.profile-pane')!).backgroundColor;
      const headings = [...document.querySelectorAll('.records h3')].map(element => getComputedStyle(element).color);
      const checks = [...document.querySelectorAll('.records h3, .record a, [class^="keyword-"], .contacts a')].map(element => {
        const style = getComputedStyle(element);
        const background = element.closest('.profile-pane') ? sidebar : output;
        return contrast(style.color, background);
      });
      return { headingColors: [...new Set(headings)], minimum: Math.min(...checks) };
    });
    expect(palette.headingColors.length).toBeGreaterThanOrEqual(4);
    expect(palette.minimum).toBeGreaterThanOrEqual(4.5);
    await page.screenshot({ path: `test-results/palette-${theme}.png`, animations: 'disabled' });
  });
}

test('mobile profile typography adapts while output typography keeps its shared scale', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/#portfolio');
  await page.getByRole('tab', { name: 'Projects', exact: true }).click();
  const selectors = ['h1', '.contact', '.contact a', '.contact-label', '.terminal-tab', '.record h3', '.description', '.record-details li', '.record-stack'];
  async function sizes() {
    return page.evaluate(selectors => selectors.map(selector => parseFloat(getComputedStyle(document.querySelector(selector)!).fontSize)), selectors);
  }
  const desktop = await sizes();
  await page.setViewportSize({ width: 390, height: 900 });
  const phone = await sizes();
  const ratio = desktop[4] / phone[4];
  expect(ratio).toBeGreaterThan(1);
  for (let index = 4; index < selectors.length; index++) expect(desktop[index] / phone[index]).toBeCloseTo(ratio, 3);
  expect(phone[0]).toBeLessThan(desktop[0]);
  expect(phone[1]).toBe(phone[2]);
  expect(phone[2]).toBe(phone[3]);
  expect(await page.locator('.profile-identity h1').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  expect(phone[6]).toBeGreaterThanOrEqual(13);
  expect(phone[7]).toBe(phone[6]);
});

test('theme switching works when browser storage is unavailable', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException('Storage disabled', 'SecurityError'); };
    Storage.prototype.setItem = () => { throw new DOMException('Storage disabled', 'SecurityError'); };
  });
  await page.goto('/#portfolio');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Switch to light theme', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('tab', { name: 'Resume', exact: true }).click();
  await expect(page.getByRole('tabpanel')).toContainText('AI agents for Microsoft 365');
});

for (const width of [320, 360, 390, 768, 1024, 1440]) {
  test(`responsive layout at ${width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/#portfolio');
    await expect(page.getByRole('tabpanel')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (width <= 1050) {
      await expect(page.locator('.profile-details')).toBeVisible();
      await expect(page.locator('.profile-toggle')).toHaveCount(0);
      const portrait = (await page.locator('.portrait').boundingBox())!;
      const name = (await page.locator('.profile-identity h1').boundingBox())!;
      const contacts = (await page.locator('.contacts').boundingBox())!;
      expect(name.x).toBeGreaterThan(portrait.x + portrait.width);
      expect(contacts.x).toBeCloseTo(name.x, 0);
      expect(contacts.y).toBeGreaterThanOrEqual(name.y + name.height);
      const entries = await page.locator('.contact').evaluateAll(elements => elements.map(element => { const bounds = element.getBoundingClientRect(); return { x: bounds.x, y: bounds.y }; }));
      expect(entries).toHaveLength(5);
      expect(entries[1].y).toBeGreaterThan(entries[0].y);
      for (let index = 2; index < entries.length; index++) {
        expect(entries[index].y).toBeCloseTo(entries[1].y, 0);
        expect(entries[index].x).toBeGreaterThan(entries[index - 1].x);
      }
      await expect(page.locator('.contacts .contact').first().locator('.contact-value')).toBeVisible();
      await expect(page.locator('.contacts .contact').first()).toContainText('palakdevpatra@gmail.com');
      expect(await page.locator('.profile-identity h1').evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThan(16);
      expect(await page.locator('.profile-identity h1').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
      for (const entry of await page.locator('.contact').all()) {
        const link = entry.locator('a');
        await expect(link).toBeVisible();
        expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
        await expect(entry.locator('.contact-label')).toBeHidden();
      }
      expect(await page.locator('.profile-details').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
      await expect(page.getByRole('link', { name: 'palakdevpatra@gmail.com' })).toBeVisible();
      await page.getByRole('link', { name: 'Scarletta975', exact: false }).scrollIntoViewIfNeeded();
      await expect(page.getByRole('link', { name: 'Scarletta975', exact: false })).toBeVisible();
    }
    await page.getByRole('tab', { name: 'Projects', exact: true }).click();
    const output = page.locator('.terminal-output');
    expect(await output.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    const first = (await page.locator('.records > .record').nth(0).boundingBox())!;
    const second = (await page.locator('.records > .record').nth(1).boundingBox())!;
    expect(second.x).toBeCloseTo(first.x, 0);
    expect(second.y).toBeGreaterThanOrEqual(first.y + first.height);
    const info = (await page.locator('.project-information').first().boundingBox())!;
    const visual = (await page.locator('.project-visual').first().boundingBox())!;
    if (width === 1024 || width >= 1280) {
      expect(visual.x).toBeGreaterThan(info.x + info.width);
      expect(visual.y).toBeCloseTo(info.y, 0);
    } else {
      expect(visual.y).toBeGreaterThanOrEqual(info.y + info.height);
    }
    await page.getByRole('tab', { name: 'Publications', exact: true }).click();
    await expect(output).toContainText('10.1109/SPCOM71105.2026.11622932');
    await page.screenshot({ path: `test-results/portfolio-${width}.png`, animations: 'disabled' });
    expect(errors).toEqual([]);
  });
}

test('compact profile keeps the falling comets unless reduced motion is requested', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#portfolio/resume');
  const rain = page.locator('.profile-pane .falling-comets');
  await expect(rain).toBeVisible();
  await expect(rain.locator('.comet-track').first()).toHaveCSS('animation-name', 'comet-fall');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(rain).toBeHidden();
});
