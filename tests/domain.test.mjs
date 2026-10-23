import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeRoute, validateInquiry, toggleCompletion, parseRoute, routeTo, supportedRoute, safeReturnRoute } from '../src/domain.js';
import { sessions, filterSessions, sessionById } from '../src/scheduleData.js';
import { promotionDay, shouldShowPromotion, hidePromotionToday } from '../src/promotion.js';
import { admissionsSelection } from '../src/admissionsData.js';

test('admissions selection restores valid choices and falls back for unknown query values',()=>{
  assert.equal(admissionsSelection(new URLSearchParams('grade=senior&major=hair')).plan.id,'senior');
  assert.equal(admissionsSelection(new URLSearchParams('grade=senior&major=hair')).major.id,'hair');
  const fallback=admissionsSelection(new URLSearchParams('grade=unknown&major=extension'));
  assert.equal(fallback.plan.id,'early');
  assert.equal(fallback.major.id,'makeup');
});

test('admissions inquiries require a supported grade and major without affecting general inquiries',()=>{
  const valid={name:'테스트',phone:'010-0000-0000',course:'hair',mode:'입시 상담',grade:'senior',consent:true};
  assert.deepEqual(validateInquiry(valid),{});
  assert.ok(validateInquiry({...valid,grade:''}).grade);
  assert.ok(validateInquiry({...valid,course:'extension'}).course);
  assert.deepEqual(validateInquiry({...valid,mode:'과정 상담',grade:'',course:'extension'}),{});
});

test('admissions overview and consultation have distinct supported routes',()=>{
  assert.equal(supportedRoute('admissions'),true);
  assert.equal(supportedRoute('admissions/consult'),true);
  assert.equal(supportedRoute('admissions/unknown'),false);
  const selection=parseRoute(routeTo('admissions/consult',{grade:'senior',major:'hair'}));
  assert.equal(selection.path,'admissions/consult');
  assert.equal(selection.params.get('grade'),'senior');
  assert.equal(selection.params.get('major'),'hair');
});

test('entry promotion respects Korean calendar day and does not interrupt member or contact pages',()=>{
  const now=new Date('2026-10-23T14:59:59Z');
  assert.equal(promotionDay(now),'2026-10-23');
  assert.equal(promotionDay(new Date('2026-10-23T15:00:00Z')),'2026-10-24');
  const saved=new Map();
  const host={localStorage:{getItem:key=>saved.get(key),setItem:(key,value)=>saved.set(key,value)}};
  assert.equal(shouldShowPromotion('home',host,now),true);
  assert.equal(hidePromotionToday(host,now),true);
  assert.equal(shouldShowPromotion('home',host,now),false);
  assert.equal(shouldShowPromotion('courses/hair',host,new Date('2026-10-23T15:00:00Z')),true);
  for(const path of ['admin','admin/members','account/login','classroom','contact','privacy'])
    assert.equal(shouldShowPromotion(path,{},now),false);
});

test('unavailable browser storage never prevents visiting or dismissing the promotion',()=>{
  const host={get localStorage(){throw new Error('Storage blocked');}};
  assert.equal(shouldShowPromotion('home',host),true);
  assert.equal(hidePromotionToday(host),false);
});

test('route query preserves filters and encoded destinations without treating them as path segments', () => {
  const parsed = parseRoute('#schedule/class/hair-certificate?course=hair&month=2026-11&group=weekday');
  assert.equal(parsed.path,'schedule/class/hair-certificate');
  assert.equal(parsed.params.get('course'),'hair');
  assert.equal(parseRoute(routeTo('account/login',{returnTo:'online/hair/hair-intro'})).params.get('returnTo'),'online/hair/hair-intro');
  assert.equal(safeReturnRoute('https://example.com'),'classroom');
  assert.equal(safeReturnRoute('online/hair/hair-intro'),'online/hair/hair-intro');
});
test('unexpected trailing routes never silently render a parent page', () => {
  for(const path of ['about/instructors/bogus','schedule/weekday/bogus','support/courses/bogus','contact/visit/bogus','privacy/bogus','account/login/bogus','admin/students/bogus'])assert.equal(supportedRoute(path),false,path);
  for(const path of ['about/instructors','schedule/class/hair-certificate','courses/hair/salon','online/hair/hair-intro','classroom/materials'])assert.equal(supportedRoute(path),true,path);
});
test('each session has its own class detail and filterable course, goal, time and date', () => {
  assert.equal(new Set(sessions.map(s=>s.id)).size,sessions.length);
  assert.ok(sessions.length>=10);
  const hair=filterSessions({course:'hair',group:'weekday',month:'2026-11',track:'certificate'});
  assert.ok(hair.length>0);
  assert.ok(hair.every(s=>s.course==='hair'&&s.track==='certificate'&&s.group==='weekday'));
  assert.equal(sessionById(hair[0].id),hair[0]);
  assert.ok(filterSessions({month:'2027-01'}).length===0);
  assert.ok(!sessions.some(s=>s.course==='extension'&&s.track==='certificate'));
  for(const s of sessions)assert.ok(s.time&&s.room&&s.preparation.length&&s.outcomes.length);
});

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
