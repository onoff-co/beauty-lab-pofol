import test from 'node:test';
import assert from 'node:assert/strict';
import { assetUrl } from '../src/assets.js';

test('local asset paths keep the development root', () => {
  assert.equal(assetUrl('/assets/banner-hair.png'), '/assets/banner-hair.png');
});

test('project Pages assets resolve below the repository path', () => {
  assert.equal(assetUrl('/assets/banner-hair.png', '/beauty-lab-pofol/'), '/beauty-lab-pofol/assets/banner-hair.png');
  assert.equal(assetUrl('assets/course-nail.png', '/beauty-lab-pofol/'), '/beauty-lab-pofol/assets/course-nail.png');
});
