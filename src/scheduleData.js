import { courses, tracks } from './academyData.js';
import { courseProfiles } from './courseProfiles.js';

// All dates, durations, rooms and class names are portfolio fixtures, not live recruitment.
const rooms = {makeup:'메이크업 스튜디오 A',hair:'헤어 실습실 B',nail:'네일 실습실 C',skin:'에스테틱 실습실 D',extension:'헤어 실습실 B'};
const tools = {
  makeup:['개인 브러시 세트','베이스·색조 메이크업 도구','실습용 타월'],
  hair:['커트 가위·빗','연습용 마네킹','분무기·실습용 타월'],
  nail:['네일 케어 도구','컬러링 재료','연습용 팁'],
  skin:['실습복·타월','기초 관리 도구','상담 기록 노트'],
  extension:['연습용 모발','섹션 클립·빗','부착·제거 실습 도구'],
};
function addDays(date, days) {
  const value=new Date(`${date}T00:00:00Z`);
  value.setUTCDate(value.getUTCDate()+days);
  return value.toISOString().slice(0,10);
}
export const sessions = courses.flatMap(course => tracks
  .filter(track=>course.id!=='extension'||track.id!=='certificate')
  .map((track,index)=>{
    const start=addDays(course.date,index*14);
    const weeks=track.id==='certificate'?course.weeks:track.id==='salon'?6:4;
    return {
      id:`${course.id}-${track.id}`,course:course.id,track:track.id,
      title:`${course.category} ${track.name}반`,start,end:addDays(start,(weeks-1)*7+(['nail','extension'].includes(course.id)?0:2)),weeks,
      group:['nail','extension'].includes(course.id)?'weekend':'weekday',
      time:course.days,room:rooms[course.id],teacher:course.teacher,fee:'380,000원 ~ 상담',
      audience:track.id==='certificate'?'처음 배우는 입문자 / 자격증을 준비하는 분':track.id==='salon'?'기초 과정을 배운 분 / 현장 기술을 연습하려는 분':'기초 실습 경험이 있는 분 / 입시·취업 작품집을 준비하는 분',
      preparation:tools[course.id],
      outcomes:track.id==='certificate'?courseProfiles[course.id].goals:courseProfiles[course.id][track.id],
    };
  })).sort((a,b)=>a.start.localeCompare(b.start)||a.id.localeCompare(b.id));
export const sessionById = id => sessions.find(session=>session.id===id);
export function filterSessions({course='all',track='all',group='all',month='all'}={}) {
  return sessions.filter(s=>(course==='all'||s.course===course)&&(track==='all'||s.track===track)&&(group==='all'||s.group===group)&&(month==='all'||s.start.startsWith(month)));
}
