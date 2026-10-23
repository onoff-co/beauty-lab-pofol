import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { Browser } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

const phase = process.argv[2] || 'after';
const directory = `artifacts/responsive-spacing-${phase}`;
mkdirSync(directory, { recursive: true });
const browser = await Browser.launch();
const results = [];
try {
  const page = await browser.newPage();
  const click = async selector => {
    const position = await page.eval(selector => {
      const r = document.querySelector(selector).getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }, selector);
    await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...position });
    await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...position });
  };
  await page.goto('http://localhost:5174/#home');
  await page.eval(async () => { await document.fonts.ready; await document.querySelector('.hero-photo').decode(); });
  for (const [width, height] of [[1920,1080],[1440,900],[1440,600],[1280,720],[1024,768],[768,1024],[390,844],[375,667],[320,568]]) {
    await page.setViewport({ width, height, mobile: width < 600 });
    const result = await page.eval(() => {
      const controls = [...document.querySelectorAll('.hero-pagination button')];
      const container = document.querySelector('.home-teachers').getBoundingClientRect();
      return {
        width: innerWidth, height: innerHeight,
        controlsVisible: controls.length === 4 && controls.every(e => {
          const r = e.getBoundingClientRect();
          return r.width > 0 && r.height >= 44 && r.top >= 0 && r.bottom <= innerHeight;
        }),
        paginationBottom: document.querySelector('.hero-pagination').getBoundingClientRect().bottom,
        contentWidth: container.width, contentLeft: container.left,
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    results.push(result);
    await page.screenshot({ path: `${directory}/${width}-${height}.jpg` });
    await click('.hero-pagination button:last-child');
    assert.equal(await page.eval(() => document.querySelector('.hero h1').textContent), '메이크업 실무 클래스');
    assert.ok(await page.eval(() => document.querySelector('.hero-pagination').getBoundingClientRect().bottom <= innerHeight), `${width}: second banner controls below viewport`);
    await click('.hero-pagination button:first-child');
    assert.equal(await page.eval(() => document.querySelector('.hero h1').textContent), '11월 미용 자격증반');
    await click('.campaign-selector:nth-of-type(3)');
    assert.equal(await page.eval(() => document.querySelector('.hero h1').textContent), '메이크업 실무 클래스');
    await click('.campaign-selector:nth-of-type(2)');
    assert.equal(await page.eval(() => document.querySelector('.hero h1').textContent), '11월 미용 자격증반');
  }
  writeFileSync(`${directory}/results.json`, JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  for (const r of results) {
    assert.ok(r.controlsVisible, `${r.width}x${r.height}: all banner controls must be visible above the fold`);
    assert.equal(r.overflow, false, `${r.width}: horizontal overflow`);
    if (r.width >= 1280) {
      assert.ok(Math.abs(r.contentWidth - r.width * .6) < 2, `${r.width}: content width must be 60%`);
      assert.ok(Math.abs(r.contentLeft - r.width * .2) < 2, `${r.width}: margins must be 20%`);
    }
  }
  assert.deepEqual(page.consoleErrors, []);
  console.log('PASS: banner controls and shared 2:6:2 spacing at nine viewport sizes.');
} finally { await browser.close(); }
