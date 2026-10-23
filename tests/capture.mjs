// Optional zero-dependency screenshot runner. Chrome/Edge and Node 22+ required.
import { Browser } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { mkdirSync } from 'node:fs';
mkdirSync('artifacts', {recursive:true});
const browser=await Browser.launch({extraArgs:['--disable-gpu','--disable-extensions']});
try{
  const page=await browser.newPage();
  await page.goto('http://localhost:5174/#home');
  await page.screenshot({path:'artifacts/home-desktop.jpg'});
  await page.setViewport({width:390,height:844,mobile:true});
  await page.screenshot({path:'artifacts/home-mobile.jpg'});
  console.log({consoleErrors:page.consoleErrors});
}finally{await browser.close();}
