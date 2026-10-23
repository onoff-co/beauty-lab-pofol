import React, {useState} from 'react';
import {courses,courseById} from '../academyData.js';
import {onlineLessons,lessonsForCourse,onlineLessonById} from '../onlineData.js';
import {routeTo,toggleCompletion} from '../domain.js';
import {DemoNote,LinkButton,Page,useAcademy} from '../components.jsx';
import NotFound from './NotFound.jsx';
import '../online.css';

export function VideoPlayer({lesson}) {
  const [loaded,setLoaded]=useState(false);
  return <><div className="video-player">
    {loaded?<iframe key={lesson.videoId} src={`https://www.youtube-nocookie.com/embed/${lesson.videoId}?rel=0`} title={`${lesson.title} · ${lesson.creator}`} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>:<div className="video-consent"><span className="play-symbol" aria-hidden="true">▶</span><strong>{lesson.title}</strong><p>YouTube 공개 강의 · {lesson.duration}</p><button className="button" onClick={()=>setLoaded(true)}>외부 영상 불러오기</button><small>클릭하면 YouTube 플레이어에 연결됩니다.</small></div>}
  </div><p className="video-source">제공: {lesson.creator} <a href={lesson.url} target="_blank" rel="noreferrer">YouTube에서 원본 보기</a></p><p className="small muted">재생이 제한되면 원본 링크에서 확인해주세요. 뷰티랩 자체 제작 강의가 아니며 저작권은 원저작자에게 있습니다.</p></>;
}
export function OnlinePage({id,lessonId,params=new URLSearchParams()}) {
  const {user,enrollments,setEnrollments,completed,setCompleted,setHistory}=useAcademy();
  const [query,setQuery]=useState('');
  const course=courseById(id);
  const category=params.get('category')||'all';
  const courseLessons=lessonsForCourse(id);
  const lesson=lessonId?onlineLessonById(lessonId):courseLessons[0];
  if(id&&(!course||!lesson||lesson.course!==id))return <NotFound/>;
  if(!id){
    const rows=onlineLessons.filter(l=>(category==='all'||l.course===category)&&`${l.title} ${courseById(l.course).category}`.includes(query.trim()));
    return <Page title="온라인 이론 강의" group="온라인 강의">
      <div className="online-toolbar"><nav className="tabs" aria-label="온라인 강의 분야">{[['all','전체'],...courses.slice(0,4).map(c=>[c.id,c.category])].map(([key,name])=><a key={key} href={`#${routeTo('online',{category:key})}`} aria-current={key===category?'page':undefined}>{name}</a>)}</nav><label>강의 검색<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="과목명 검색"/></label></div>
      <p className="online-description">필기 이론 공개 강의 모음 · 강의를 선택하면 바로 시청 화면으로 이동합니다.</p>
      <p className="result-count" role="status">총 {rows.length}개 강의</p>
      <div className="video-catalog">{rows.map(l=><article key={l.id}><a className="video-thumb" href={`#online/${l.course}/${l.id}`} aria-label={`${l.title} 시청 화면 열기`}><img src={l.thumbnail} alt={`${l.title} 원본 영상 썸네일`} loading="lazy" width="480" height="360"/><span className="video-play" aria-hidden="true">▶</span><span className="video-duration">{l.duration}</span></a><div><p>{courseById(l.course).category} · 이론</p><h2><a href={`#online/${l.course}/${l.id}`}>{l.title}</a></h2><small>{l.creator}</small></div></article>)}</div>
      {!rows.length&&<div className="empty"><p>검색 결과가 없습니다.</p><button className="button secondary" onClick={()=>setQuery('')}>검색어 지우기</button></div>}
      <DemoNote>공개 영상으로 구성한 학습 페이지입니다. 영상의 제작 시점과 현재 시험 기준은 다를 수 있습니다. 최신 출제 기준은 Q-Net에서 확인하세요.</DemoNote>
    </Page>;
  }
  const index=courseLessons.indexOf(lesson);
  const key=`${id}/${lesson.id}`;
  const done=completed.includes(key);
  const destination=`online/${id}/${lesson.id}`;
  function record(){
    setCompleted(ids=>toggleCompletion(ids,key));
    setHistory(rows=>[{id:crypto.randomUUID(),date:new Date().toLocaleString('ko-KR'),title:`${course.category} · ${lesson.title}`,action:done?'자율 학습 완료 취소':'자율 학습 완료 · 영상 시청 여부 자동 검증 아님'},...rows]);
  }
  return <Page title={`${course.category} · ${lesson.title}`} group="온라인 강의" className="watch-page">
    <div className="watch-toolbar"><a className="text-link" href={`#${routeTo('online',{category:id})}`}>{course.category} 강의 목록</a><span>{index+1} / {courseLessons.length}강</span></div>
    <div className="watch-layout"><article className="watch-content"><VideoPlayer key={lesson.id} lesson={lesson}/><div className="watch-heading"><span>{course.category} 필기 이론</span><h2>{lesson.title}</h2><p>{lesson.summary}</p></div><div className="watch-notes"><h3>학습 메모</h3><p>새로 알게 된 용어 3개와 실습 수업에서 확인할 질문 1개를 정리해보세요.</p><label>나의 메모<textarea key={lesson.id} rows={4} placeholder="이 화면에서만 사용하는 임시 메모입니다. 개인정보는 입력하지 마세요."/></label></div>
      <div className="watch-progress">{!user?<LinkButton to={routeTo('account/login',{returnTo:destination})} secondary>로그인하고 학습 기록 남기기</LinkButton>:<><button className="button secondary" onClick={()=>setEnrollments(ids=>ids.includes(id)?ids:[...ids,id])} disabled={enrollments.includes(id)}>{enrollments.includes(id)?'나의 강의실에 추가됨':'나의 강의실에 추가'}</button><button className="button" onClick={record}>{done?'학습 완료 취소':'학습 완료 표시'}</button><p className="small" role="status">{done?'자율 학습 완료를 기록했습니다.':'시청을 마친 뒤 직접 완료를 표시할 수 있습니다.'}</p></>}
      <small>학습 기록은 데모이며 실제 출석·수료를 인정하지 않습니다.</small></div>
      <div className="watch-pagination">{index>0&&<LinkButton to={`online/${id}/${courseLessons[index-1].id}`} secondary>이전 강의</LinkButton>}{index<courseLessons.length-1?<LinkButton to={`online/${id}/${courseLessons[index+1].id}`}>다음 강의</LinkButton>:<LinkButton to={routeTo('online',{category:id})} secondary>과목 목록으로</LinkButton>}</div>
    </article><aside className="watch-syllabus"><h3>{course.category} 이론 목차</h3><ol>{courseLessons.map((l,i)=><li key={l.id}><a href={`#online/${id}/${l.id}`} aria-current={l.id===lesson.id?'page':undefined}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{l.title}</strong><small>{l.duration}{completed.includes(`${id}/${l.id}`)?' · 완료':''}</small></div></a></li>)}</ol><a className="text-link" href="#classroom/materials">공통 복습 자료</a><a className="text-link" href={`#schedule?course=${id}`}>관련 실습반 일정</a></aside></div>
  </Page>;
}
