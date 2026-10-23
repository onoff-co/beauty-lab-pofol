import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { Browser } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { courses, navigation, tracks } from '../src/academyData.js';
import {sessions} from '../src/scheduleData.js';
import {onlineLessons} from '../src/onlineData.js';

// Read-only render audit. Interaction flows are checked separately in the app browser.
const courseRoutes=courses.flatMap(c=>tracks.filter(t=>c.id!=='extension'||t.id!=='certificate').map(t=>`courses/${c.id}/${t.id}`));
const routes=[...new Set(['home',...navigation.flatMap(g=>[g.route,...g.children.map(([,route])=>route)]),...courseRoutes,...sessions.map(s=>`schedule/class/${s.id}`),...onlineLessons.map(l=>`online/${l.course}/${l.id}`),'account/login','admin','privacy'])];
const evidence=new Set(['home',...courses.map(c=>`courses/${c.id}`),'courses/hair/certificate','online','schedule','support','community/notices','contact','about/instructors']);
mkdirSync('artifacts/pages',{recursive:true});
const browser=await Browser.launch();
const results=[];
const siteUrl=process.env.ACADEMY_TEST_URL || 'http://localhost:5174/';
try{
  const page=await browser.newPage();
  await page.goto(siteUrl);
  for(const width of [1920,1440,1280,768,390,360]){
    await page.setViewport({width,height:900,mobile:width<600});
    for(const route of routes){
      await page.eval(route=>{location.hash=route;},route);
      await new Promise(resolve=>setTimeout(resolve,90));
      const result=await page.eval(()=>({route:location.hash,width:innerWidth,title:document.querySelector('main h1')?.textContent,h1Count:document.querySelectorAll('main h1').length,overflow:document.documentElement.scrollWidth>innerWidth,badMarkup:/<br\s*\/?\s*>|&#x20;/.test(document.querySelector('main').innerText),brokenImages:[...document.querySelectorAll('main img')].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),longHeadings:[...document.querySelectorAll('main h1,main h2,main h3')].filter(e=>e.getBoundingClientRect().height/parseFloat(getComputedStyle(e).lineHeight)>2.1).map(e=>e.textContent)}));
      results.push(result);
      assert.equal(result.h1Count,route==='home'?1:0,`${width} ${route}: inner pages must not render a repeated H1 title`);
      assert.equal(await page.eval(()=>document.querySelectorAll('.page-title').length),0,`${width} ${route}: repeated title block remains`);
      assert.equal(result.overflow,false,`${width} ${route}: horizontal overflow`);
      assert.equal(result.badMarkup,false,`${width} ${route}: literal markup`);
      assert.deepEqual(result.brokenImages,[],`${width} ${route}: broken images`);
      assert.deepEqual(result.longHeadings,[],`${width} ${route}: long headings`);
      if(route.startsWith('courses/')){
        if(route.split('/').length===2){
        const banner=await page.eval(async()=>{const image=document.querySelector('.course-cover img');await image.decode();return {src:image.getAttribute('src'),width:image.naturalWidth,height:image.naturalHeight,fit:getComputedStyle(image).objectFit};});
        assert.equal(banner.src,`${new URL(siteUrl).pathname}assets/banner-${route.split('/')[1]}.png`,`${route}: wrong banner image`);
        assert.ok(banner.width>0&&banner.height>0,`${route}: banner did not load`);
        assert.equal(banner.fit,'contain',`${route}: banner must not crop source image`);
        }else{
          assert.equal(await page.eval(()=>document.querySelectorAll('.course-cover img').length),0,`${route}: track must not repeat the overview banner`);
        }
        const detail=await page.eval(()=>({curriculum:document.querySelectorAll('.course-curriculum article').length,roadmap:document.querySelectorAll('.course-roadmap article').length,selected:document.querySelector('.course-switcher [aria-current=page]')?.getAttribute('href'),field:document.querySelector('.course-inquiry select')?.value,title:document.title}));
        assert.equal(detail.selected,`#${route}`,`${route}: selected course navigation`);
        assert.equal(detail.field,route.split('/')[1],`${route}: consultation course preselection`);
        assert.ok(detail.title.endsWith(' | Beauty Lab'),`${route}: accessible browser title`);
        assert.ok(route.split('/').length===3 ? detail.curriculum>=3 : detail.roadmap>=2,`${route}: missing course-specific content`);
      }
      if(width>=1280){
        const containers=await page.eval(()=>[...document.querySelectorAll('.wrap')].filter(e=>e.getBoundingClientRect().width>0).map(e=>{const r=e.getBoundingClientRect();return {className:e.className,width:r.width,left:r.left};}));
        for(const box of containers){
          assert.ok(Math.abs(box.width-width*.6)<2,`${width} ${route} ${box.className}: width is not 60%`);
          assert.ok(Math.abs(box.left-width*.2)<2,`${width} ${route} ${box.className}: margin is not 20%`);
        }
      }
      if(evidence.has(route)&&width!==360)await page.screenshot({path:`artifacts/pages/${route.replaceAll('/','-')}-${width}.jpg`});
    }
  }
  assert.deepEqual(page.consoleErrors,[]);
  console.log(`PASS: ${results.length} page/viewport checks; no runtime errors.`);
}finally{
  writeFileSync('artifacts/browser-audit.json',JSON.stringify(results,null,2));
  await browser.close();
}
