import React from 'react';
import { Page, LinkButton, ConsultationForm } from '../components.jsx';
import { admissionsPlans, admissionsMajors, admissionsSelection, admissionsFaq } from '../admissionsData.js';
import { assetUrl } from '../assets.js';
import { routeTo } from '../domain.js';

function PreparationPlan({plan,major}) {
  return <section className="admissions-section" aria-labelledby="admissions-plan-title">
    <div className="admissions-heading"><h2 id="admissions-plan-title">학년별 준비 과정</h2><p>지금 필요한 준비부터 확인하세요.</p></div>
    <nav className="admissions-options" aria-label="준비 학년">{admissionsPlans.map(item=><a key={item.id} href={`#${routeTo('admissions',{grade:item.id,major:major.id})}`} aria-current={item.id===plan.id?'true':undefined}>{item.label}</a>)}</nav>
    <div className="admissions-plan" aria-live="polite" aria-atomic="true">
      <div className="admissions-plan-intro"><h3>{plan.title}</h3><p>{plan.description}</p></div>
      <ol className="admissions-steps">{plan.steps.map(([title,description,result])=><li key={title}><h3>{title}</h3><p>{description}</p><span>준비 기록 · {result}</span></li>)}</ol>
    </div>
  </section>;
}

function MajorPreparation({plan,major}) {
  return <section className="admissions-section" aria-labelledby="admissions-major-title">
    <div className="admissions-heading"><h2 id="admissions-major-title">전공별 실기 준비</h2><p>관심 전공의 기초와 작품 기록을 살펴보세요.</p></div>
    <nav className="admissions-options majors" aria-label="입시 관심 전공">{admissionsMajors.map(item=><a key={item.id} href={`#${routeTo('admissions',{grade:plan.id,major:item.id})}`} aria-current={item.id===major.id?'true':undefined}>{item.name}</a>)}</nav>
    <article className="admissions-major" aria-live="polite" aria-atomic="true">
      <div><h3>{major.name}</h3><p>{major.description}</p><ul>{major.practice.map(item=><li key={item}>{item}</li>)}</ul></div>
      <div className="admissions-record"><h3>남겨두면 좋은 기록</h3><p>{major.record}</p><p className="admissions-note">아래 과정은 전공 기초 수업입니다. 입시 과제와 제출 자료는 지원 전형에 맞춰 별도로 확인합니다.</p><LinkButton secondary to={`courses/${major.id}`}>{major.name} 기초 과정 보기</LinkButton></div>
    </article>
    <p className="admissions-note">실기 실시 여부와 과제, 자격증 반영, 포트폴리오 제출 기준은 대학·전형별로 다릅니다. 반드시 해당 연도 모집요강을 확인해주세요.</p>
  </section>;
}

function WorkPreparation() {
  return <section className="admissions-section admissions-work" aria-labelledby="admissions-work-title">
    <div className="admissions-work-intro"><h2 id="admissions-work-title">작품을 만들고,<br/>과정을 설명하는 연습</h2><p>완성 사진만 모으기보다, 무엇을 표현하려 했고 어떻게 수정했는지를 기록합니다.</p><LinkButton secondary to="community/portfolio">작품 갤러리 보기</LinkButton></div>
    <div className="admissions-work-cards">
      <article><h3>작품 구성</h3><p>주제와 참고 자료를 정리하고 스케치, 색채 계획, 재료 선택의 이유를 기록합니다.</p><ul><li>주제와 디자인 의도</li><li>작업 과정과 수정 내용</li><li>완성 사진과 자기 평가</li></ul></article>
      <article><h3>면접 준비</h3><p>지원 동기와 학습 경험을 구체적인 사례로 말하고, 작품에 대한 질문에 답하는 연습을 합니다.</p><ul><li>이 전공을 선택한 이유</li><li>작업 중 어려움과 해결 과정</li><li>입학 후 배우고 싶은 분야</li></ul></article>
    </div>
  </section>;
}

function AdmissionsConsult({plan,major}) {
  return <Page title="입시 상담" group="입시센터" className="admissions-page">
    <div className="admissions-consult-layout">
      <div><h2>입시 준비 상담</h2><p>현재 학년과 관심 전공을 알려주세요. 준비 경험과 희망 대학을 바탕으로 필요한 수업과 준비 항목을 확인합니다.</p><div className="admissions-consult-note"><h3>상담에서 함께 확인해요</h3><ul><li>희망 대학·학과와 지원 전형</li><li>자격증·실습 경험과 보완할 부분</li><li>학교 일정과 수업 가능한 시간</li><li>수업 기간·수강료·준비물</li></ul></div><LinkButton secondary to={routeTo('admissions',{grade:plan.id,major:major.id})}>입시 과정 다시 보기</LinkButton></div>
      <div className="admissions-consult-form"><ConsultationForm mode="입시 상담" grade={plan.id} course={major.id}/></div>
    </div>
  </Page>;
}

export default function AdmissionsPage({section,params}) {
  const {plan,major}=admissionsSelection(params);
  const consultation=routeTo('admissions/consult',{grade:plan.id,major:major.id});
  if(section==='consult')return <AdmissionsConsult plan={plan} major={major}/>;
  return <Page title="미용대학 입시 준비" group="입시센터" className="admissions-page">
    <div className="admissions-hero">
      <img src={assetUrl('/assets/admissions-mentoring.png')} alt="메이크업 작품집을 함께 살펴보며 디자인 구성을 지도하는 장면" width="1536" height="1024" fetchPriority="high"/>
      <div><h2>미용대학<br/>입시 준비반</h2><p>전공 선택부터 실기, 작품 정리와 면접까지.<br/>현재 학년과 목표에 맞춰 준비합니다.</p><LinkButton to={consultation}>입시 상담 신청</LinkButton></div>
    </div>
    <PreparationPlan plan={plan} major={major}/>
    <MajorPreparation plan={plan} major={major}/>
    <WorkPreparation/>
    <section className="admissions-section admissions-faq" aria-labelledby="admissions-faq-title"><h2 id="admissions-faq-title">입시 준비, 자주 묻는 질문</h2>{admissionsFaq.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
    <div className="admissions-closing"><div><h2>나의 입시 준비, 어디서 시작할까요?</h2><p>{plan.label} · {major.name}에 관심이 있다면 준비 상황부터 함께 살펴보세요.</p></div><LinkButton to={consultation}>입시 상담 신청</LinkButton></div>
  </Page>;
}
