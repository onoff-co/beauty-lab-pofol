import {assetUrl} from './assets.js';
const fields=['makeup','hair','nail','skin'];
const group=prefix=>Object.fromEntries(fields.map(id=>[id,assetUrl(`/assets/${prefix}-${id}.png`)]));
// Each placement role owns a different photograph. No cropped-file aliases.
export const media={
  academy:assetUrl('/assets/academy-intro.png'),campaign:assetUrl('/assets/campaign-makeup.png'),promotion:assetUrl('/assets/promotion-starter.png'),
  teacherHome:group('teacher-home'),teacherProfile:group('teacher-profile'),
  facility:group('facility'),gallery:group('gallery'),workDetail:group('work-detail'),
  story:Object.fromEntries(['makeup','hair','nail'].map(id=>[id,assetUrl(`/assets/story-${id}.png`)])),
};
