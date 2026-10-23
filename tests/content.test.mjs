import test from 'node:test';
import assert from 'node:assert/strict';
import { courses, lessons, navigation, noticesSeed, portfolio } from '../src/academyData.js';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { courseProfiles } from '../src/courseProfiles.js';

test('each beauty field has a unique route, image and full curriculum',()=>{
  assert.equal(new Set(courses.map(c=>c.id)).size,5);
  for(const course of courses){
    assert.ok(existsSync(fileURLToPath(new URL(`../public${course.image}`,import.meta.url))));
    assert.ok(course.curriculum.length>=4);
    assert.ok(course.fee>0&&course.weeks>0&&course.kit>0);
    assert.ok(course.date&&course.days&&course.teacher);
  }
});
test('category children have distinct destinations; removed categories stay removed',()=>{
  for(const group of navigation){assert.equal(new Set(group.children.map(([,to])=>to)).size,group.children.length);}
  assert.ok(!JSON.stringify(navigation).includes('스페셜'));
  assert.ok(!JSON.stringify(navigation).includes('뷰티스토리'));
});
test('every course uses its own generated banner without replacing classroom photography',()=>{
  assert.equal(new Set(courses.map(c=>c.banner)).size,5);
  for(const course of courses){
    assert.equal(course.banner,`/assets/banner-${course.id}.png`);
    assert.notEqual(course.banner,course.image);
    assert.ok(existsSync(fileURLToPath(new URL(`../public${course.banner}`,import.meta.url))));
  }
});
test('four lessons contain complete sample learning material',()=>{
  assert.equal(lessons.length,4);
  assert.equal(lessons.reduce((sum,l)=>sum+l.minutes,0),65);
  assert.equal(new Set(lessons.map(l=>l.id)).size,4);
  for(const lesson of lessons) assert.ok(lesson.paragraphs.length>=3);
});
test('notices and galleries have unique detail identifiers',()=>{
  for(const records of [noticesSeed,portfolio]) assert.equal(new Set(records.map(r=>r.id)).size,records.length);
});

test('homepage work samples use finished-work assets, not classroom or course banners',()=>{
  for(const work of portfolio.slice(0,3)){
    const course=courses.find(c=>c.id===work.id);
    assert.equal(work.image,`/assets/portfolio-${work.id}.png`);
    assert.notEqual(work.image,course.image);
    assert.notEqual(work.image,course.banner);
    assert.ok(existsSync(fileURLToPath(new URL(`../public${work.image}`,import.meta.url))));
  }
});
test('source contains no obsolete slogan blocks or escaped break tags',()=>{
  const files=['PlatformPage.jsx','components.jsx','pages/Home.jsx','pages/Academy.jsx','pages/Education.jsx','pages/Student.jsx'];
  for(const file of files){
    const text=readFileSync(new URL(`../src/${file}`,import.meta.url),'utf8');
    assert.doesNotMatch(text,/COURSE CATALOG|ABOUT BEAUTY LAB|배움의 방향|나답게 빛나는|&#x20;|&lt;br/);
  }
});
test('shared pages remove the repeated title block but retain accessible page names',()=>{
  const component=readFileSync(new URL('../src/components.jsx',import.meta.url),'utf8');
  assert.doesNotMatch(component,/className="page-title"|<h1>\{title\}<\/h1>/);
  assert.match(component,/aria-label=\{title\} data-page-title=\{title\}/);
});
test('every course has specific roadmap, goals and careers; extensions do not claim certification',()=>{
  assert.deepEqual(Object.keys(courseProfiles).sort(),courses.map(c=>c.id).sort());
  for(const course of courses){
    const profile=courseProfiles[course.id];
    assert.ok(profile.introduction.length>20);
    for(const name of ['goals','salon','portfolio','careers'])assert.equal(profile[name].length,3);
    assert.equal(profile.certificate!==null,course.id!=='extension');
  }
  assert.equal(new Set(Object.values(courseProfiles).map(p=>p.introduction)).size,5);
});
