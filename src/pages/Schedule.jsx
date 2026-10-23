import React from 'react';
import { courses, courseById, tracks, money } from '../academyData.js';
import { sessions, filterSessions, sessionById } from '../scheduleData.js';
import { routeTo } from '../domain.js';
import { DemoNote, LinkButton, Page, useAcademy } from '../components.jsx';
import NotFound from './NotFound.jsx';
import '../journey.css';

const dateLabel = date => date.replaceAll('-','.');
export function SessionRows({items, filters={}}) {
  const {setModal}=useAcademy();
  return <div className="session-list">{items.map(session=><article key={session.id}>
    <time dateTime={session.start}><b>{session.start.slice(5).replace('-','.')}</b><small>{session.start.slice(0,4)} 개강</small></time>
    <div className="session-name"><h2><a href={`#${routeTo(`schedule/class/${session.id}`,filters)}`}>{session.title}</a></h2><p>{session.time} · {session.weeks}주</p><span>{session.group==='weekend'?'주말반':'평일반'} / {session.room}</span></div>
    <div className="session-actions"><LinkButton to={routeTo(`schedule/class/${session.id}`,filters)} secondary>반 상세</LinkButton><button className="button" onClick={()=>setModal({type:'consult',course:session.course,session:session.id,track:session.track})}>이 반 상담</button></div>
  </article>)}</div>;
}
export function CourseSessions({course,track}) {
  const items=filterSessions({course,track:track||'all'});
  return <section className="course-block" aria-labelledby="course-sessions-title"><div className="course-section-heading"><h2 id="course-sessions-title">신청 가능한 반</h2><p>개강일과 시간표를 확인하고 원하는 반으로 바로 상담하세요.</p></div><SessionRows items={items}/><DemoNote>반별 개강일과 수업 시간을 확인하세요. 상담 신청만으로 좌석이 예약되지는 않습니다.</DemoNote></section>;
}
export function SchedulePage({filter='all',params=new URLSearchParams()}) {
  const course=params.get('course')||'all';
  const month=params.get('month')||'all';
  const track=params.get('track')||'all';
  const filters={course,month,track,group:filter};
  const items=filterSessions(filters);
  const months=[...new Set(sessions.map(s=>s.start.slice(0,7)))];
  const update=(key,value)=>{window.location.hash=routeTo(filter==='all'?'schedule':`schedule/${filter}`,{course,month,track,[key]:value});};
  return <Page title={filter==='all'?'개강일정':filter==='weekday'?'평일반 개강일정':'주말반 개강일정'} group="개강일정">
    <div className="schedule-intro"><p>수업 시간을 먼저 확인하세요. 반 상세에서 준비물과 교육 내용을 확인하거나 바로 상담할 수 있습니다.</p><span>과정별 개강 안내</span></div>
    <div className="session-filters">
      <label>교육 분야<select value={course} onChange={e=>update('course',e.target.value)}><option value="all">전체 분야</option>{courses.map(c=><option key={c.id} value={c.id}>{c.category}</option>)}</select></label>
      <label>수강 목적<select value={track} onChange={e=>update('track',e.target.value)}><option value="all">전체 목적</option>{tracks.map(t=><option value={t.id} key={t.id}>{t.name}</option>)}</select></label>
      <label>개강 월<select value={month} onChange={e=>update('month',e.target.value)}><option value="all">전체 월</option>{months.map(m=><option key={m} value={m}>{m.replace('-','년 ')}월</option>)}</select></label>
      <a className="text-link" href={`#${filter==='all'?'schedule':`schedule/${filter}`}`}>필터 초기화</a>
    </div>
    <p className="result-count" role="status">총 {items.length}개 반 · 개강일순</p>
    {items.length?<SessionRows items={items} filters={filters}/>:<div className="empty"><p>선택한 조건의 반이 없습니다.</p><LinkButton to="schedule" secondary>전체 일정 보기</LinkButton></div>}
    <DemoNote>개강 일정과 수업 시간은 변경될 수 있습니다. 등록 전 희망 반의 운영 여부를 확인해주세요.</DemoNote>
  </Page>;
}
export function SessionDetail({id,params=new URLSearchParams()}) {
  const session=sessionById(id);
  const {setModal}=useAcademy();
  if(!session)return <NotFound/>;
  const course=courseById(session.course);
  const group=['weekday','weekend'].includes(params.get('group'))?params.get('group'):'';
  const back=routeTo(group?`schedule/${group}`:'schedule',{course:params.get('course'),month:params.get('month'),track:params.get('track')});
  return <Page title={session.title} group="개강일정" className="session-detail">
    <a className="text-link" href={`#${back}`}>선택한 일정 목록으로</a>
    <div className="session-detail-layout">
      <article>
        <div className="session-heading"><span>{session.group==='weekend'?'주말반':'평일반'} · {tracks.find(t=>t.id===session.track).name}</span><h2>{session.title}</h2><p>{session.audience}</p></div>
        <dl className="session-facts"><div><dt>수업 기간</dt><dd>{dateLabel(session.start)} – {dateLabel(session.end)} / {session.weeks}주</dd></div><div><dt>시간표</dt><dd>{session.time}</dd></div><div><dt>교육 장소</dt><dd>{session.room}</dd></div><div><dt>담당 강사</dt><dd>{session.teacher} 강사</dd></div></dl>
        <section className="session-section"><h3>이 반에서 배우는 내용</h3><ol>{session.outcomes.map(item=><li key={item}>{item}</li>)}</ol><details className="faq"><summary>분야별 전체 커리큘럼 확인</summary>{course.curriculum.map(([week,title,text])=><p key={week}><strong>{week} · {title}</strong><br/>{text}</p>)}<p className="small muted">위 내용은 분야 전체 구성입니다. 선택한 반은 위 학습 목표를 중심으로 진행합니다.</p></details></section>
        <section className="session-section"><h3>첫 수업 준비물</h3><ul>{session.preparation.map(item=><li key={item}>{item}</li>)}</ul><p>개인 도구가 있다면 상담 시 알려주세요. 필요한 재료는 등록 안내 후 준비하는 구성입니다.</p></section>
        <section className="session-section"><h3>등록 전 확인</h3><p>수강 목적, 수업 시간, 도구 보유 여부를 상담에서 확인합니다. 신청 버튼은 실제 결제나 좌석 예약을 진행하지 않습니다.</p></section>
      </article>
      <aside className="session-booking"><p className="small">선택한 반</p><h3>{session.title}</h3><p>{dateLabel(session.start)} 개강<br/>{session.time}</p><dl><div><dt>수강료</dt><dd>{session.fee}</dd></div><div><dt>재료비</dt><dd>{money(course.kit)} 별도</dd></div></dl><button className="button" onClick={()=>setModal({type:'consult',course:session.course,session:id,track:session.track})}>이 반으로 상담 신청</button><small>선택한 과정·개강일·시간이 상담에 자동 입력됩니다.</small></aside>
    </div>
    <DemoNote>일정과 준비물, 교육비를 확인한 뒤 수강 계획을 세워주세요.</DemoNote>
  </Page>;
}
