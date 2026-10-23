import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { Browser } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

const phase=process.argv[2] || 'after';
const directory=`artifacts/home-revision-${phase}`;
mkdirSync(directory,{recursive:true});
const browser=await Browser.launch();
const results=[];
try {
  const page=await browser.newPage();
  await page.goto('http://localhost:5174/#home');
  await page.eval(async()=>{await document.fonts.ready; await document.querySelector('.hero-photo').decode();});
  for(const width of [1440,1024,768,390,320]) {
    await page.setViewport({width,height:900,mobile:width<600});
    const result=await page.eval(()=>{
      const photo=document.querySelector('.hero-photo');
      const box=photo.getBoundingClientRect();
      const ratio=photo.naturalWidth/photo.naturalHeight;
      const fit=getComputedStyle(photo).objectFit;
      const course=document.querySelector('.home-courses');
      return {width:innerWidth,logos:[...document.querySelectorAll('.brand strong')].map(e=>e.textContent),
        uncropped:fit==='contain'||Math.abs(box.width/box.height-ratio)<.015,
        photo:{width:box.width,height:box.height,ratio,fit},
        courseImages:course.querySelectorAll('img').length,
        courseCards:course.querySelectorAll('.home-course').length,
        categoryButtons:course.querySelectorAll('button[aria-pressed]').length,
        overflow:document.documentElement.scrollWidth>innerWidth,
        longHeadings:[...document.querySelectorAll('main h1,main h2,main h3')].filter(e=>e.getBoundingClientRect().height/parseFloat(getComputedStyle(e).lineHeight)>2.1).map(e=>e.textContent)};
    });
    results.push(result);
    await page.screenshot({path:`${directory}/${width}.jpg`});
  }
  writeFileSync(`${directory}/results.json`,JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
  for(const r of results) {
    assert.ok(r.logos.every(t=>t==='beauty lab'),`${r.width}: logo has a dot`);
    assert.ok(r.uncropped,`${r.width}: banner image is cropped`);
    assert.equal(r.courseImages,0,`${r.width}: course preview must be text only`);
    assert.equal(r.courseCards,3,`${r.width}: show three course previews`);
    assert.equal(r.categoryButtons,4,`${r.width}: four beauty field selectors`);
    assert.equal(r.overflow,false,`${r.width}: horizontal overflow`);
    assert.deepEqual(r.longHeadings,[],`${r.width}: heading wraps beyond two lines`);
  }
  assert.deepEqual(page.consoleErrors,[]);
  console.log('PASS: homepage regression checks at five widths.');
} finally { await browser.close(); }
