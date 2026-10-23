const aliases = {
  academy: 'home', instructors: 'about/instructors', learning: 'classroom',
  'community-notice': 'community/notices', 'community-stories': 'community/stories',
  'courses-헤어': 'courses/hair', 'courses-네일아트': 'courses/nail',
  'courses-피부미용': 'courses/skin', 'courses-메이크업': 'courses/makeup',
  'courses-붙임머리': 'courses/extension',
};
export function normalizeRoute(hash) {
  try {
    const route = decodeURIComponent(hash.replace(/^#\/?/, '')).replace(/\/$/, '') || 'home';
    return aliases[route] || route;
  } catch { return 'not-found'; }
}
export function validateInquiry(values) {
  const errors = {};
  if (!values.name?.trim() || values.name.trim().length > 30) errors.name = '이름을 1~30자로 입력해주세요.';
  if (!/^01[016789]\d{7,8}$/.test((values.phone || '').replace(/[\s-]/g, ''))) errors.phone = '휴대전화 번호를 확인해주세요. 예: 010-1234-5678';
  if (!['hair','nail','skin','makeup','extension'].includes(values.course)) errors.course = '관심 과정을 선택해주세요.';
  if (!values.consent) errors.consent = '데모 입력 안내를 확인해주세요.';
  return errors;
}
export function toggleCompletion(completed, lesson) {
  return completed.includes(lesson) ? completed.filter(id => id !== lesson) : [...completed, lesson];
}
