const preferenceKey = 'beauty-lab:first-class:hidden-day';

export function promotionDay(now = new Date()) {
  return new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export function shouldShowPromotion(path, host, now = new Date()) {
  if (!['home', 'about', 'courses', 'online', 'schedule', 'support', 'community'].includes(path.split('/')[0])) return false;
  try {
    return host.localStorage.getItem(preferenceKey) !== promotionDay(now);
  } catch {
    return true;
  }
}

export function hidePromotionToday(host, now = new Date()) {
  try {
    host.localStorage.setItem(preferenceKey, promotionDay(now));
    return true;
  } catch {
    return false;
  }
}
