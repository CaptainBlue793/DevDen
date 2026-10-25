import { expect, test } from '@playwright/test';
import { createHash } from 'node:crypto';

for (const theme of ['light', 'dark'] as const) {
  for (const width of [1440, 390]) {
    test(`welcome navigation and original CV preview in ${theme} at ${width}px`, async ({ page, request }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      await page.goto('/#welcome');
      await expect(page.locator('.profile-pane')).toBeVisible();
      await expect(page.locator('.welcome-toolbar')).toHaveText('❯_ Welcome');
      await expect(page.getByRole('tab')).toHaveCount(0);
      const welcome = page.locator('.welcome');
      await expect(welcome.getByRole('heading')).toHaveText('Step Into My DevDen.');
      await expect(page.getByRole('heading', { name: '>> About Me', exact: true })).toHaveCount(0);
      await expect(page.locator('.welcome-title')).toHaveCSS('animation-name', 'none');
      await expect(welcome.locator('.invocation, .typed-command')).toHaveCount(0);
      await expect(welcome.locator('.welcome-doodle')).toBeVisible();
      await expect(welcome.locator('.welcome-doodle')).toHaveAttribute('aria-hidden', 'true');
      await expect(welcome.locator('.doodle-command')).toHaveText(['>_', '_<']);
      const prompt = (await welcome.locator('.doodle-prompt').first().boundingBox())!;
      const rightPrompt = (await welcome.locator('.doodle-prompt').last().boundingBox())!;
      expect(prompt.y).toBeCloseTo(rightPrompt.y, 0);
      expect(prompt.x + prompt.width).toBeLessThan(rightPrompt.x);
      const head = (await welcome.locator('.doodle-head').boundingBox())!;
      expect(head.width / head.height).toBeCloseTo(7 / 4.5, 2);
      expect((prompt.x + rightPrompt.x + rightPrompt.width) / 2).toBeCloseTo(head.x + head.width / 2, 0);
      for (const part of await welcome.locator('.welcome-doodle, .doodle-head, .doodle-antennas, .doodle-command, .doodle-expression, .doodle-cursor, .doodle-signal').all()) await expect(part).toHaveCSS('animation-name', 'none');
      await expect(welcome.locator('.doodle-antennas')).toHaveCSS('filter', 'none');
      await expect(welcome.locator('.doodle-expression')).toHaveCSS('opacity', '0');
      await expect(welcome.locator('.welcome-atmosphere, .cli-fragment, .cli-scan')).toHaveCount(0);
      await expect(welcome).toHaveCSS('background-image', 'none');
      await expect(welcome.locator('.welcome-star, .aurora-ribbon, .falling-comets, .comet-track, .welcome-name')).toHaveCount(0);
      await expect(welcome.locator('.welcome-content')).not.toContainText('Palak Deb Patra');
      await expect(welcome.locator('.welcome-doodle')).toHaveCSS('pointer-events', 'none');
      await expect(welcome.locator('.welcome-content')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
      await expect(welcome.locator('.welcome-content')).toHaveCSS('border-top-width', '0px');
      const brandColors = await welcome.locator('.welcome-brand').evaluate(el => {
        const style = getComputedStyle(el);
        return { brand: style.getPropertyValue('--devden').trim(), palette: ['blue', 'green', 'yellow', 'red', 'purple', 'cyan', 'pink'].map(tone => style.getPropertyValue(`--${tone}`).trim()) };
      });
      expect(brandColors.palette).not.toContain(brandColors.brand);
      const doodle = (await welcome.locator('.welcome-doodle').boundingBox())!;
      const heading = (await welcome.getByRole('heading').boundingBox())!;
      expect(doodle.y + doodle.height).toBeLessThan(heading.y);
      expect(doodle.height).toBeGreaterThanOrEqual(width > 1050 ? 120 : 74);
      expect(doodle.height).toBeLessThanOrEqual(144);
      const welcomeBounds = (await welcome.boundingBox())!;
      const outputBounds = (await page.locator('.terminal-output').boundingBox())!;
      expect(welcomeBounds.x + welcomeBounds.width / 2).toBeCloseTo(outputBounds.x + outputBounds.width / 2, 0);
      expect(Math.abs(welcomeBounds.y + welcomeBounds.height / 2 - outputBounds.y - outputBounds.height / 2)).toBeLessThan(4);
      const contentBounds = (await welcome.locator('.welcome-content').boundingBox())!;
      expect(contentBounds.y + contentBounds.height / 2).toBeLessThan(outputBounds.y + outputBounds.height / 2 - 20);
      if (width > 1050) {
        const identity = (await page.locator('.profile-identity').boundingBox())!;
        expect(identity.y + identity.height / 2).toBeCloseTo(contentBounds.y + contentBounds.height / 2, 0);
      }
      const entryButtons = page.getByRole('navigation', { name: 'Explore portfolio' }).getByRole('button');
      await expect(entryButtons).toHaveText(['❯_Skills', '❯_Resume', '❯_Experience', '❯_Projects', '❯_Publications', '❯_Activities']);
      for (const button of await entryButtons.all()) await expect(button).toBeInViewport();
      await welcome.getByRole('button', { name: 'Resume', exact: true }).click();
      await expect(page.getByRole('tab')).toHaveCount(6);
      await expect(page.locator('.welcome-page')).toHaveCount(0);
      await expect(page.locator('.welcome-atmosphere')).toHaveCount(0);
      await expect(page.getByRole('tab', { name: 'Resume', exact: true })).toBeFocused();
      await expect(page.locator('.resume-about')).toContainText('I’m a Software Engineer at NatWest Group');
      await expect(page.locator('.resume-about')).toContainText('NIT Rourkela');
      await expect(page.locator('.profile-pane .resume-link')).toHaveCount(0);
      await expect(page.locator('.contacts .contact')).toHaveCount(5);
      const document = page.getByRole('region', { name: 'Professional CV', exact: true });
      const preview = document.getByRole('img');
      await preview.scrollIntoViewIfNeeded();
      await expect(preview).toBeVisible();
      await expect.poll(() => preview.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBe(1530);
      await expect(document.getByRole('button', { name: 'View Professional CV', exact: true })).toBeVisible();
      await expect(document.getByRole('group', { name: 'Choose document' }).getByRole('button', { name: 'Professional CV', exact: true })).toHaveAttribute('aria-pressed', 'true');
      await expect(preview).toHaveAttribute('src', '/images/resume-preview.png?v=4999cf12');
      await expect(document.getByRole('link', { name: 'Download PDF' })).toHaveAttribute('href', '/resume.pdf?v=dd92308e');
      await expect(page.locator('a[href*="drive.google.com"]')).toHaveCount(0);
      const pdf = await request.get('/resume.pdf');
      expect(pdf.status()).toBe(200);
      expect(pdf.headers()['content-type']).toContain('application/pdf');
      expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
      const aboutBox = (await page.locator('.resume-about').boundingBox())!;
      const documentBox = (await document.boundingBox())!;
      if (width === 1440) {
        expect(aboutBox.width / documentBox.width).toBeCloseTo(40 / 60, 2);
        expect(documentBox.x).toBeGreaterThan(aboutBox.x + aboutBox.width);
        expect(documentBox.y).toBeCloseTo(aboutBox.y, 0);
        const imageBox = (await preview.boundingBox())!;
        expect(imageBox.width).toBeCloseTo(documentBox.width, 0);
        expect(imageBox.width / imageBox.height).toBeCloseTo(1530 / 1980, 2);
      } else {
        expect(documentBox.y).toBeGreaterThan(aboutBox.y + aboutBox.height);
        expect(documentBox.width).toBeCloseTo(aboutBox.width, 0);
      }
      expect(await page.locator('.terminal-output').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
      await page.locator('.terminal-output').evaluate(el => { el.scrollTop = 0; });
      await page.screenshot({ path: `test-results/resume-${theme}-${width}.png`, animations: 'disabled' });
    });
  }
}

test('versioned professional CV assets match the verified Drive upload', async ({ request }) => {
  const pdf = await request.get('/resume.pdf?v=dd92308e');
  const preview = await request.get('/images/resume-preview.png?v=4999cf12');
  expect(pdf.status()).toBe(200);
  expect(preview.status()).toBe(200);
  expect(createHash('sha256').update(await pdf.body()).digest('hex')).toBe('dd92308e66defd081471d3033cb4c7aed26df3b705ea4688e182d68d2de86055');
  expect(createHash('sha256').update(await preview.body()).digest('hex')).toBe('4999cf1225821c1aeb9ae26a1bc2e6d223315ea0cb5fc13277d9b92285acf557');
});

test('academic CV includes both original pages and a local PDF download', async ({ page, request }) => {
  await page.goto('/#portfolio/resume');
  const document = page.locator('.resume-document');
  await document.getByRole('group', { name: 'Choose document' }).getByRole('button', { name: 'Academic CV' }).click();
  await expect(document.getByRole('heading', { name: 'Academic CV' })).toBeVisible();
  await expect(document.getByRole('link', { name: 'Download PDF' })).toHaveAttribute('href', '/academic-cv.pdf?v=d64c3f1e');
  await expect(document.getByRole('img', { name: 'Academic CV by Palak Deb Patra, page 1' })).toHaveAttribute('src', '/images/academic-cv-preview.png?v=d2e4fed8');
  const pdf = await request.get('/academic-cv.pdf');
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
  expect(createHash('sha256').update(await pdf.body()).digest('hex')).toBe('d64c3f1e144be8e8147a4bad9e44f993b75362f901b9f4cbe7d662f68b761618');
  for (const [path, hash] of [
    ['/images/academic-cv-preview.png', 'd2e4fed8498214f34f17cd40d45e324c5c99e2565bf39970b1e405bef4d95181'],
    ['/images/academic-cv-preview-2.png', '4152eedf3f3a0070fec054a2397a934da650046629ee1c743ad8c627fe7b5a21'],
  ]) {
    const image = await request.get(path);
    expect(image.status()).toBe(200);
    expect(createHash('sha256').update(await image.body()).digest('hex')).toBe(hash);
  }
  await document.getByRole('button', { name: 'View Academic CV' }).click();
  const dialog = page.getByRole('dialog', { name: 'Academic CV' });
  await expect(dialog.getByRole('img')).toHaveCount(2);
  await expect(dialog.getByRole('img').nth(1)).toHaveAttribute('src', '/images/academic-cv-preview-2.png?v=4152eedf');
  await expect.poll(() => dialog.getByRole('img').nth(1).evaluate(img => (img as HTMLImageElement).naturalWidth)).toBe(1530);
  await expect(dialog.getByRole('link', { name: 'Download PDF' })).toHaveAttribute('href', '/academic-cv.pdf?v=d64c3f1e');
  await dialog.getByRole('button', { name: 'Close document' }).click();
});

for (const size of [{ width: 1440, height: 900 }, { width: 1366, height: 600 }, { width: 320, height: 568 }, { width: 390, height: 844 }, { width: 844, height: 390 }]) {
  test(`resume popup uses the screen-appropriate default and supports zoom and keyboard close at ${size.width}x${size.height}`, async ({ page }) => {
    await page.setViewportSize(size);
    await page.emulateMedia({ colorScheme: size.width === 390 ? 'light' : 'dark', reducedMotion: 'reduce' });
    await page.goto('/#portfolio/resume');
    const open = page.getByRole('button', { name: 'View Professional CV', exact: true });
    const output = page.locator('.terminal-output');
    if (size.width > 1050) {
      const preview = (await page.locator('.resume-preview img').boundingBox())!;
      const document = (await page.locator('.resume-document').boundingBox())!;
      expect(preview.width).toBeCloseTo(document.width, 0);
      expect(preview.width / preview.height).toBeCloseTo(1530 / 1980, 2);
      if (size.height === 600) expect(await output.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
    }
    await open.click();
    const dialog = page.getByRole('dialog', { name: 'Professional CV', exact: true });
    await expect(dialog).toBeVisible();
    const close = dialog.getByRole('button', { name: 'Close document' });
    await expect(close).toBeFocused();
    const image = dialog.getByRole('img');
    await expect.poll(() => image.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBe(1530);
    const body = dialog.locator('.resume-dialog-body');
    const defaultEnlarged = size.width > 1050;
    await expect(dialog.getByRole('button', { name: defaultEnlarged ? 'Fit page' : 'Enlarge', exact: true })).toHaveAttribute('aria-pressed', String(defaultEnlarged));
    expect(await body.evaluate(el => el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth)).toBe(defaultEnlarged);
    if (!defaultEnlarged) {
      const fittedImage = (await image.boundingBox())!;
      expect(fittedImage.x).toBeGreaterThan(0);
      expect(fittedImage.y).toBeGreaterThan(0);
      expect(fittedImage.x + fittedImage.width).toBeLessThan(size.width);
      expect(fittedImage.y + fittedImage.height).toBeLessThan(size.height);
    }
    await page.screenshot({ path: `test-results/resume-popup-${size.width}x${size.height}.png`, animations: 'disabled' });
    if (!defaultEnlarged) await dialog.getByRole('button', { name: 'Enlarge', exact: true }).click();
    await expect(dialog.getByRole('button', { name: 'Fit page', exact: true })).toHaveAttribute('aria-pressed', 'true');
    expect(await body.evaluate(el => el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth)).toBe(true);
    for (let index = 0; index < 5; index++) {
      await page.keyboard.press('Tab');
      expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
    }
    await body.focus();
    await page.keyboard.press('ArrowDown');
    await expect.poll(() => body.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
    await dialog.getByRole('button', { name: 'Fit page', exact: true }).click();
    expect(await body.evaluate(el => el.scrollHeight <= el.clientHeight && el.scrollWidth <= el.clientWidth)).toBe(true);
    const imageBox = (await image.boundingBox())!;
    expect(imageBox.y).toBeGreaterThan(0);
    expect(imageBox.y + imageBox.height).toBeLessThan(size.height);
    expect(imageBox.x).toBeGreaterThan(0);
    expect(imageBox.x + imageBox.width).toBeLessThan(size.width);
    expect(imageBox.width / imageBox.height).toBeCloseTo(1530 / 1980, 2);
    await dialog.getByRole('button', { name: 'Enlarge', exact: true }).click();
    await expect(dialog.getByRole('button', { name: 'Fit page', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(open).toBeFocused();
    await open.click();
    await expect(dialog.getByRole('button', { name: defaultEnlarged ? 'Fit page' : 'Enlarge', exact: true })).toHaveAttribute('aria-pressed', String(defaultEnlarged));
    expect(await body.evaluate(el => el.scrollTop === 0 && el.scrollLeft === 0)).toBe(true);
    await page.mouse.click(2, 2);
    await expect(dialog).not.toBeVisible();
    await expect(open).toBeFocused();
    await open.click();
    await close.click();
    await expect(dialog).not.toBeVisible();
    await expect(open).toBeFocused();
  });
}

test('doodle alternates antenna signals and changes expression automatically during vibration', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/#welcome');
  const doodle = page.locator('.welcome-doodle');
  // Pin both animations to the same clock time to verify opposing signal phases.
  const opacities = await doodle.locator('.doodle-signal').evaluateAll(tips => tips.map(tip => {
    const animation = tip.getAnimations()[0];
    animation.pause();
    animation.currentTime = 0;
    return Number(getComputedStyle(tip).opacity);
  }));
  expect(Math.abs(opacities[0] - opacities[1])).toBeGreaterThan(.5);
  const head = doodle.locator('.doodle-head');
  const antennas = doodle.locator('.doodle-antennas');
  async function setCycleTime(time: number) {
    await doodle.locator('.doodle-head, .doodle-antennas, .doodle-command, .doodle-expression').evaluateAll((elements, time) => {
      for (const element of elements) {
        const animation = element.getAnimations()[0];
        animation.pause();
        animation.currentTime = time;
      }
    }, time);
  }
  await setCycleTime(0);
  const restingTransform = await head.evaluate(el => getComputedStyle(el).transform);
  const restingColor = await antennas.evaluate(el => getComputedStyle(el).color);
  const ice = await doodle.locator('.doodle-signal').first().evaluate(el => getComputedStyle(el).color);
  const restingFilter = await antennas.evaluate(el => getComputedStyle(el).filter);
  const headSize = await head.evaluate(el => ({ width: el.clientWidth, height: el.clientHeight }));
  const origins = await doodle.locator('.doodle-antennas path').evaluateAll(paths => paths.map(element => {
    const path = element as SVGPathElement;
    const point = path.getPointAtLength(0);
    const origin = new DOMPoint(point.x, point.y).matrixTransform(path.getScreenCTM()!);
    const head = path.closest('.doodle-head')!.getBoundingClientRect();
    return { x: origin.x - head.left - head.width / 2, y: origin.y - head.top };
  }));
  for (const origin of origins) {
    expect(Math.abs(origin.x)).toBeLessThan(1);
    expect(Math.abs(origin.y)).toBeLessThan(1);
  }
  await setCycleTime(1560);
  await expect(doodle.locator('.doodle-expression')).toHaveCSS('opacity', '1');
  await expect(antennas).toHaveCSS('color', ice);
  await expect(antennas).toHaveCSS('filter', /drop-shadow/);
  await expect(antennas).not.toHaveCSS('filter', restingFilter);
  for (const tip of await doodle.locator('.doodle-signal').all()) await expect(tip).toHaveCSS('color', ice);
  for (const prompt of await doodle.locator('.doodle-command').all()) await expect(prompt).toHaveCSS('opacity', '0');
  expect(await head.evaluate(el => getComputedStyle(el).transform)).not.toBe(restingTransform);
  expect(await head.evaluate(el => ({ width: el.clientWidth, height: el.clientHeight }))).toEqual(headSize);
  await page.screenshot({ path: 'test-results/welcome-doodle-vibrating.png' });
  await setCycleTime(2800);
  await expect(antennas).toHaveCSS('color', restingColor);
  await expect(antennas).toHaveCSS('filter', 'none');
  for (const tip of await doodle.locator('.doodle-signal').all()) await expect(tip).toHaveCSS('color', ice);
  await expect(doodle.locator('.doodle-expression')).toHaveCSS('opacity', '0');
  for (const prompt of await doodle.locator('.doodle-command').all()) await expect(prompt).toHaveCSS('opacity', '1');
  expect(await head.evaluate(el => getComputedStyle(el).transform)).toBe(restingTransform);
  await setCycleTime(5600);
  await expect(antennas).toHaveCSS('color', ice);
  await expect(antennas).toHaveCSS('filter', /drop-shadow/);
  await expect(doodle.locator('.doodle-expression')).toHaveCSS('opacity', '1');
  expect(await head.evaluate(el => getComputedStyle(el).transform)).not.toBe(restingTransform);
});

test('welcome types the single-line DevDen greeting and settles without repeating', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/#welcome');
  for (const cursor of await page.locator('.doodle-cursor').all()) await expect(cursor).toHaveCSS('animation-name', 'doodle-blink');
  await expect(page.locator('.welcome .comet-track, .welcome .aurora-ribbon')).toHaveCount(0);
  await expect(page.locator('.profile-pane .comet-track')).toHaveCount(48);
  await expect(page.locator('.profile-pane .comet-track').first()).toHaveCSS('animation-name', 'comet-fall');
  const title = page.locator('.welcome-title');
  await expect(title).toHaveCSS('animation-name', 'welcome-type');
  await expect(title).toHaveCSS('animation-iteration-count', '1');
  await title.evaluate(el => {
    const typing = el.getAnimations()[0];
    typing.pause();
    typing.currentTime = 0;
  });
  expect(await title.evaluate(el => getComputedStyle(el).clipPath)).toContain('100%');
  await title.evaluate(el => el.getAnimations()[0].finish());
  await expect(title).toHaveCSS('clip-path', 'inset(0px 0% 0px 0px)');
  expect(await title.evaluate(el => el.getAnimations()[0].playState)).toBe('finished');
  await expect(page.getByRole('button', { name: 'Projects', exact: true })).toBeVisible();
  await page.screenshot({ path: 'test-results/welcome-animated.png', animations: 'disabled' });
});

for (const [label, id] of [
  ['Skills', 'skills'], ['Resume', 'resume'], ['Experience', 'work'],
  ['Projects', 'projects'], ['Publications', 'publications'], ['Activities', 'activities'],
]) {
  test(`${label} opens directly and Welcome returns only when the webpage restarts`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/#welcome');
    const sidebar = (await page.locator('.profile-pane').boundingBox())!;
    await page.getByRole('button', { name: label, exact: true }).focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new RegExp(`#portfolio/${id}$`));
    await expect(page.getByRole('tab', { name: label, exact: true })).toBeFocused();
    await expect(page.getByRole('tab', { name: label, exact: true })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tab', { name: 'Welcome', exact: true })).toHaveCount(0);
    await expect(page.locator('.welcome-page')).toHaveCount(0);
    await expect(page.getByRole('tab')).toHaveCount(6);
    expect(await page.locator('.profile-pane').boundingBox()).toEqual(sidebar);
    await page.getByRole('link', { name: 'Skip to portfolio content', exact: true }).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('tabpanel')).toBeFocused();
    await expect(page).toHaveURL(new RegExp(`#portfolio/${id}$`));
    for (const tab of await page.getByRole('tab').all()) {
      await tab.click();
      await expect(page.locator('.welcome-page, .welcome-toolbar')).toHaveCount(0);
    }
    await page.reload();
    await expect(page).toHaveURL(/#welcome$/);
    await expect(page.locator('.welcome-page')).toBeVisible();
    await expect(page.getByRole('tab')).toHaveCount(0);
  });
}

for (const size of [{ width: 320, height: 568 }, { width: 844, height: 390 }]) {
  test(`welcome entry fits ${size.width} × ${size.height}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize(size);
    await page.goto('/#welcome');
    await expect(page.locator('.profile-pane')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Step Into My DevDen.', exact: true })).toBeVisible();
    const frame = (await page.locator('.welcome-content').boundingBox())!;
    const title = (await page.locator('.welcome-title').boundingBox())!;
    expect(title.x).toBeGreaterThanOrEqual(frame.x + 10);
    expect(title.x + title.width).toBeLessThanOrEqual(frame.x + frame.width - 10);
    expect(title.height).toBeLessThan(await page.locator('#welcome-title').evaluate(el => parseFloat(getComputedStyle(el).fontSize) * 1.5));
    const output = (await page.locator('.terminal-output').boundingBox())!;
    expect(frame.y).toBeGreaterThanOrEqual(output.y);
    expect(frame.y + frame.height).toBeLessThanOrEqual(output.y + output.height + 1);
    for (const button of await page.locator('.welcome-actions button').all()) {
      const bounds = (await button.boundingBox())!;
      expect(bounds.y).toBeGreaterThanOrEqual(output.y);
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(output.y + output.height + 1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/welcome-${size.width}x${size.height}.png`, animations: 'disabled' });
  });
}
