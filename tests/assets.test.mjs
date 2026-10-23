import test from 'node:test';
import {media} from '../src/media.js';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

test('all 26 media roles are different local files with different image contents',()=>{
  const paths=Object.values(media).flatMap(value=>typeof value==='string'?[value]:Object.values(value));
  assert.equal(paths.length,26);
  assert.equal(new Set(paths).size,26);
  const hashes=paths.map(path=>createHash('sha256').update(readFileSync(new URL(`../public${path}`,import.meta.url))).digest('hex'));
  assert.equal(new Set(hashes).size,26);
});
import assert from 'node:assert/strict';
import { assetUrl } from '../src/assets.js';

test('local asset paths keep the development root', () => {
  assert.equal(assetUrl('/assets/banner-hair.png'), '/assets/banner-hair.png');
});

test('project Pages assets resolve below the repository path', () => {
  assert.equal(assetUrl('/assets/banner-hair.png', '/beauty-lab-pofol/'), '/beauty-lab-pofol/assets/banner-hair.png');
  assert.equal(assetUrl('assets/course-nail.png', '/beauty-lab-pofol/'), '/beauty-lab-pofol/assets/course-nail.png');
});
