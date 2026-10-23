import { admissionsPlans, admissionsMajors } from './admissionsData.js';

const aliases = {
  academy: 'home', instructors: 'about/instructors', learning: 'classroom',
  'community-notice': 'community/notices', 'community-stories': 'community/stories',
  'courses-헤어': 'courses/hair', 'courses-네일아트': 'courses/nail',
  'courses-피부미용': 'courses/skin', 'courses-메이크업': 'courses/makeup',
  'courses-붙임머리': 'courses/extension',
};
export function normalizeRoute(hash) {
  try {
    const [raw,...query] = hash.replace(/^#\/?/, '').split('?');
    const route = decodeURIComponent(raw).replace(/\/$/, '') || 'home';
    return (aliases[route] || route) + (query.length ? `?${query.join('?')}` : '');
  } catch { return 'not-found'; }
}
export function parseRoute(route) {
  const normalized = normalizeRoute(route);
  const index = normalized.indexOf('?');
  return {path:index<0?normalized:normalized.slice(0,index),params:new URLSearchParams(index<0?'':normalized.slice(index+1))};
}
export function routeTo(path, values = {}) {
  const params = new URLSearchParams(Object.entries(values).filter(([,value])=>value!==undefined&&value!==null&&value!==''&&value!=='all'));
  return path + (params.size?`?${params}`:'');
}
export function supportedRoute(path) {
  if (/^admissions(?:\/consult)?$/.test(path)) return true;
  return /^(home|privacy|about(?:\/(instructors|facilities))?|courses(?:\/[a-z-]+(?:\/[a-z-]+)?)?|online(?:\/[a-z-]+(?:\/[a-z-]+)?)?|schedule(?:\/(weekday|weekend)|\/class\/[a-z-]+)?|support(?:\/(courses|process))?|community(?:\/(notices|portfolio|stories)(?:\/[a-z0-9-]+)?)?|contact(?:\/(visit|tuition))?|classroom(?:\/[a-z-]+(?:\/[a-z-]+)?)?|account(?:\/login)?|admin(?:\/(members|inquiries|notices))?)$/.test(path);
}
export function safeReturnRoute(value) {
  return value && /^(online|classroom)(\/|$)/.test(value) && supportedRoute(value) ? value : 'classroom';
}
export function validateInquiry(values) {
  const errors = {};
  if (!values.name?.trim() || values.name.trim().length > 30) errors.name = '이름을 1~30자로 입력해주세요.';
  if (!/^01[016789]\d{7,8}$/.test((values.phone || '').replace(/[\s-]/g, ''))) errors.phone = '휴대전화 번호를 확인해주세요. 예: 010-1234-5678';
  if (!['hair','nail','skin','makeup','extension'].includes(values.course)) errors.course = '관심 과정을 선택해주세요.';
  if (!values.consent) errors.consent = '입력 정보 이용 안내를 확인해주세요.';
  if(values.mode==='입시 상담'){
    if(!admissionsPlans.some(item=>item.id===values.grade))errors.grade='현재 학년을 선택해주세요.';
    if(!admissionsMajors.some(item=>item.id===values.course))errors.course='입시 관심 전공을 선택해주세요.';
  }
  return errors;
}
export function toggleCompletion(completed, lesson) {
  return completed.includes(lesson) ? completed.filter(id => id !== lesson) : [...completed, lesson];
}
