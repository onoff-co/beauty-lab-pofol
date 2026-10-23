import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeRoute, validateInquiry, toggleCompletion } from '../src/domain.js';

test('legacy Korean course links decode into independent course routes', () => {
  assert.equal(normalizeRoute('#courses-%ED%97%A4%EC%96%B4'), 'courses/hair');
  assert.equal(normalizeRoute('#courses-네일아트'), 'courses/nail');
  assert.equal(normalizeRoute('#'), 'home');
  assert.equal(normalizeRoute('#courses/skin'), 'courses/skin');
  assert.equal(normalizeRoute('#%E0%A4%A'), 'not-found');
});
test('inquiry rejects blank name, invalid phone, absent course and consent', () => {
  const errors = validateInquiry({name:' ',phone:'123',course:'',consent:false});
  assert.deepEqual(Object.keys(errors), ['name','phone','course','consent']);
});
test('inquiry accepts a valid demonstration input', () => {
  assert.deepEqual(validateInquiry({name:'테스트',phone:'010-1234-5678',course:'hair',consent:true}), {});
});
test('completion toggles uniquely without changing another lesson', () => {
  assert.deepEqual(toggleCompletion(['a'], 'b'), ['a','b']);
  assert.deepEqual(toggleCompletion(['a','b'], 'a'), ['b']);
});
