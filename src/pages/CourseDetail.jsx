import React from 'react';
import { money, teachers, tracks } from '../academyData.js';
import { courseProfiles } from '../courseProfiles.js';
import { ConsultationForm, DemoNote, LinkButton, Page, useAcademy } from '../components.jsx';
import '../course-detail.css';

export default function CourseDetail({ course, track }) {
  const { setModal } = useAcademy();
  const profile = courseProfiles[course.id];
  const available = tracks.filter(item => profile.certificate || item.id !== 'certificate');
  const selected = available.find(item => item.id === track);
  const teacher = teachers.find(item => item.name === course.teacher);
  const title = selected ? `${course.category} ${selected.name}` : `${course.category} 과정`;
  if (track && !selected) return <Page title="등록되지 않은 과정" group="교육과정"><div className="empty"><p>해당 분야에서 운영하지 않는 과정입니다.</p><LinkButton to={`courses/${course.id}`}>과정 전체 보기</LinkButton></div></Page>;
  const topics = item => item.id === 'certificate' ? course.topics : profile[item.id];
  const curriculum = selected?.id === 'certificate' ? course.curriculum : selected?.id === 'salon'
    ? [['기본기 점검','실습 자세와 도구',course.topics.slice(0,2).join(', ')],['응용 실습',profile.salon[0],profile.salon.slice(1).join(', ')],['현장 연습','고객 맞춤 시술','상담 기록, 시간 배분, 사후 관리 안내']]
    : [['작품 기획',profile.portfolio[0],'참고 자료 분석, 콘셉트와 색채 계획'],['작품 제작',profile.portfolio[1],course.topics.join(', ')],['촬영·정리',profile.portfolio[2],'완성도 점검, 작품 선택과 개별 피드백']];
  return <Page title={title} group="교육과정" className="course-page">
    <div className="course-cover">
      <div className="course-cover-copy">
        <p className="course-cover-name">{title}</p>
        <p>{selected ? selected.text : profile.introduction}</p>
        <button className="button" onClick={() => setModal({ type:'consult', course:course.id })}>과정 상담 신청</button>
      </div>
      <img src={course.banner} alt={`${course.category} 교육 도구를 구성한 배너 시안`} width="1448" height="1086" fetchPriority="high" />
    </div>
    <nav className="course-switcher" aria-label={`${course.category} 세부 과정`}>
      <a href={`#courses/${course.id}`} aria-current={!selected?'page':undefined}>전체 과정</a>
      {available.map(item => <a key={item.id} href={`#courses/${course.id}/${item.id}`} aria-current={selected?.id===item.id?'page':undefined}>{item.name}</a>)}
    </nav>

    {!selected ? <section className="course-block" aria-labelledby="roadmap-title">
      <div className="course-section-heading"><h2 id="roadmap-title">수강 로드맵</h2><p>준비하려는 목표에 맞춰 세부 교육 내용을 확인하세요.</p></div>
      <div className="course-roadmap">
        {available.map(item => <article key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.text}</p>
          <ul>{topics(item).map(topic => <li key={topic}>{topic}</li>)}</ul>
          <LinkButton to={`courses/${course.id}/${item.id}`} secondary>{item.name} 자세히</LinkButton>
        </article>)}
      </div>
    </section> : <>
      <section className="course-block course-goals" aria-labelledby="goals-title">
        <h2 id="goals-title">교육 목표</h2>
        <ul>{(selected.id==='certificate' ? profile.goals : topics(selected)).map(text => <li key={text}>{text}</li>)}</ul>
      </section>
      <section className="course-block" aria-labelledby="curriculum-title">
        <div className="course-section-heading"><h2 id="curriculum-title">커리큘럼 안내</h2><p>{course.category} {selected.name} 과정의 학습 순서입니다.</p></div>
        <div className="course-curriculum">{curriculum.map(([period,name,text]) => <article key={period}><span>{period}</span><div><h3>{name}</h3><p>{text}</p></div></article>)}</div>
      </section>
      <section className="course-block course-outcome" aria-labelledby="outcome-title">
        <h2 id="outcome-title">{selected.id==='certificate'?'준비 자격증':'수업 결과물'}</h2>
        <div><h3>{selected.id==='certificate'?profile.certificate:selected.id==='salon'?'고객 맞춤 실습 기록':'개인 작품 포트폴리오'}</h3>
          <p>{selected.id==='certificate'?'필기 이론과 실기 과제를 함께 준비합니다. 시험 응시 조건과 최신 출제 기준은 Q-Net 공식 공고를 확인해주세요.':selected.id==='salon'?'상담 내용, 디자인 선택, 실습 순서와 관리 방법을 기록하고 강사 피드백을 받습니다.':'콘셉트 기획부터 제작 과정, 완성 사진과 피드백을 하나의 작품집으로 정리합니다.'}</p>
          {selected.id==='certificate' ? <a className="text-link" href="https://www.q-net.or.kr/" target="_blank" rel="noreferrer">Q-Net 시험 안내</a> : <LinkButton to="classroom/materials" secondary>학습 자료실</LinkButton>}
        </div>
      </section>
    </>}

    <section className="course-block course-teacher" aria-labelledby="teacher-title">
      <img src={course.image} alt={`${course.category} 수업 분위기 시안`} loading="lazy" />
      <div><h2 id="teacher-title">과정 담당 강사</h2><p className="course-teacher-name">{course.teacher} 강사</p><p>{teacher?.specialty}</p><p>{teacher?.method}</p><a className="text-link" href="#about/instructors">강사진 전체 보기</a><p className="small muted">강사 정보와 사진은 포트폴리오용 예시입니다.</p></div>
    </section>
    <section className="course-block" aria-labelledby="career-title">
      <div className="course-section-heading"><h2 id="career-title">교육 후 진로</h2><p>실습 경험을 바탕으로 준비할 수 있는 분야입니다.</p></div>
      <div className="course-careers">{profile.careers.map(([name,text]) => <article key={name}><h3>{name}</h3><p>{text}</p></article>)}</div>
    </section>
    <section className="course-block course-enrollment" aria-labelledby="enrollment-title">
      <h2 id="enrollment-title">수강 안내</h2>
      <dl><div><dt>교육 기간</dt><dd>{course.weeks}주</dd></div><div><dt>수업 시간</dt><dd>{course.days}</dd></div><div><dt>다음 개강</dt><dd>{course.date.replaceAll('-','.')}</dd></div><div><dt>예시 수강료</dt><dd>380,000원 ~ 상담</dd></div><div><dt>예시 재료비</dt><dd>{money(course.kit)} 별도</dd></div><div><dt>수업 방식</dt><dd>오프라인 실습{course.id!=='extension'?' + 온라인 이론':''}</dd></div></dl>
      <div className="button-row"><LinkButton to="schedule" secondary>전체 개강일정</LinkButton>{course.id!=='extension' && <LinkButton to={`online/${course.id}`} secondary>온라인 이론 강의</LinkButton>}</div>
      <DemoNote>교육 기간·시간·개강일·수강료는 모두 디자인 시연용 예시입니다. 선택한 과정의 실제 운영 조건은 별도 확정이 필요합니다.</DemoNote>
    </section>
    <section className="course-block course-inquiry" aria-labelledby="inquiry-title">
      <div className="course-section-heading"><h2 id="inquiry-title">상담예약</h2><p>{course.category} 수업의 목표와 희망 시간대를 남겨주세요.</p></div>
      <ConsultationForm course={course.id} />
    </section>
  </Page>;
}
