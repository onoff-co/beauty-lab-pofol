import React from 'react';
import { courses, tracks } from './academyData.js';
import { courseProfiles } from './courseProfiles.js';
import { sessions } from './scheduleData.js';
import { media } from './media.js';

export function CourseCatalog() {
  return <div className="course-card-grid">{courses.map(course=>{
    const profile=courseProfiles[course.id];
    const options=tracks.filter(track=>profile.certificate||track.id!=='certificate');
    return <article className="field-card" key={course.id}>
      <a className="field-card-photo" href={`#courses/${course.id}`} aria-label={`${course.category} 과정 전체 보기`}><img src={course.image} alt={`${course.category} 실습`} width="800" height="500" loading="lazy"/></a>
      <div className="field-card-body">
        <div className="field-card-heading"><h2><a href={`#courses/${course.id}`}>{course.category}</a></h2><span>{options.length}개 과정</span></div>
        <p>{profile.introduction}</p>
        <dl className="field-card-facts"><div><dt>주요 실습</dt><dd>{course.topics.slice(0,2).join(' · ')}</dd></div><div><dt>학습 방식</dt><dd>{course.id==='extension'?'오프라인 실습':'오프라인 실습 + 온라인 이론'}</dd></div></dl>
        <nav className="card-course-links" aria-label={`${course.category} 과정 선택`}>{options.map(track=><a key={track.id} href={`#courses/${course.id}/${track.id}`} aria-label={`${course.category} ${track.name} 과정 보기`}>{track.name}</a>)}</nav>
        <a className="field-card-schedule" href={`#schedule?course=${course.id}`}>개강일 · 시간표 확인</a>
      </div>
    </article>;
  })}</div>;
}

export function CourseRoadmap({course,available,topics}) {
  const photos={certificate:course.image,salon:media.facility[course.id],portfolio:media.gallery[course.id]};
  const audiences={certificate:'미용을 처음 배우거나 자격증을 준비하는 분',salon:'기본기를 다진 뒤 현장 기술을 익히려는 분',portfolio:'촬영·취업을 위한 개인 작품을 준비하는 분'};
  return <div className="course-roadmap">{available.map(track=>{
    const session=sessions.find(item=>item.course===course.id&&item.track===track.id);
    return <article key={track.id}>
      <div className="roadmap-card-heading"><h3>{track.name}</h3><p>{audiences[track.id]}</p></div>
      {photos[track.id]&&<img className="roadmap-card-photo" src={photos[track.id]} alt={`${course.category} ${track.name} 교육 참고 이미지`} width="800" height="600" loading="lazy"/>}
      <div className="roadmap-card-body">
        <p className="roadmap-duration">{session?.weeks}주 과정 · {track.id==='certificate'?'필기·실기 병행':track.id==='salon'?'현장 테크닉 중심':'작품 제작 중심'}</p>
        <ul>{topics(track).map(topic=><li key={topic}>{topic}</li>)}</ul>
        <a className="button" href={`#courses/${course.id}/${track.id}`}>{track.name} 과정 보기</a>
      </div>
    </article>;
  })}</div>;
}
