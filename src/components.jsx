import React, { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
import { courses, navigation } from './academyData.js';
import { validateInquiry, parseRoute, routeTo } from './domain.js';
import { sessionById } from './scheduleData.js';
import { assetUrl } from './assets.js';
import PromotionContent from './PromotionContent.jsx';
import { admissionsPlans, admissionsMajors } from './admissionsData.js';

export const AcademyContext = createContext(null);
export const useAcademy = () => useContext(AcademyContext);
export function LinkButton({to,children,secondary=false,...props}) {
  return <a className={`button${secondary?' secondary':''}`} href={`#${to}`} {...props}>{children}</a>;
}
export function BrandLogo() {
  return <a className="brand" href="#home" aria-label="beauty lab 홈"><img className="brand-logo" src={assetUrl('/assets/beauty-lab-logo.svg')} alt="beauty lab" width="300" height="64"/></a>;
}
export function Header({route}) {
  const [open,setOpen] = useState(false);
  const [mobile,setMobile] = useState(false);
  const [expanded,setExpanded] = useState('');
  const {user} = useAcademy();
  const navRef = useRef(null);
  useEffect(()=>{setOpen(false);setMobile(false);},[route]);
  const active = item => route===item.route || item.children.some(([,path])=>route===path || route.startsWith(`${path}/`));
  const close = () => {setOpen(false);setMobile(false);};
  return <header className={`site-header${open?' mega-open':''}`} onMouseLeave={()=>setOpen(false)} onKeyDown={e=>{if(e.key==='Escape'){navRef.current?.querySelector('a')?.focus();close();}}}>
    <a className="skip-link" href="#main-content" onClick={e=>{e.preventDefault();document.getElementById('main-content')?.focus();}}>본문 바로가기</a>
    <div className="utility wrap"><div><a href={user?'#classroom':'#account/login'}>{user?`${user.name}님의 강의실`:'수강생 로그인'}</a><a href="#account">회원가입</a><a href="#contact/tuition">수강료 조회</a></div></div>
    <div className="header-row wrap">
      <BrandLogo/>
      <nav ref={navRef} className="desktop-nav" aria-label="주 메뉴" onMouseEnter={()=>setOpen(true)} onFocus={()=>setOpen(true)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false);}}>
        {navigation.map(item=><div className="nav-column" key={item.route}>
          <a className={`parent-link${active(item)?' active':''}`} href={`#${item.route}`} onClick={close} aria-current={active(item)?'page':undefined}>{item.label}</a>
          <div className="submenu" hidden={!open}>{item.children.map(([name,path])=><a href={`#${path}`} key={path} onClick={close} aria-current={route===path?'page':undefined}>{name}</a>)}</div>
        </div>)}
      </nav>
      <button className="mobile-trigger" aria-expanded={mobile} aria-controls="mobile-nav" onClick={()=>setMobile(!mobile)}>{mobile?'메뉴 닫기':'전체 메뉴'}</button>
    </div>
    {mobile&&<nav className="mobile-nav" id="mobile-nav" aria-label="모바일 메뉴">{navigation.map(item=><div key={item.route}><button aria-expanded={expanded===item.route} onClick={()=>setExpanded(expanded===item.route?'':item.route)}>{item.label}<span aria-hidden="true">{expanded===item.route?'−':'+'}</span></button>{expanded===item.route&&<div className="mobile-children">{item.children.map(([name,path])=><a href={`#${path}`} onClick={close} key={path}>{name}</a>)}</div>}</div>)}</nav>}
  </header>;
}
export function Footer() {
  return <footer className="site-footer"><div className="wrap footer-top"><BrandLogo/><nav aria-label="하단 메뉴"><a href="#about">학원소개</a><a href="#contact">상담예약</a><a href="#privacy">개인정보 안내</a><a href="#admin">관리자</a></nav></div><div className="wrap footer-bottom"><p>메이크업 · 헤어 · 네일아트 · 피부미용 · 붙임머리<br/>교육과정부터 온라인 이론 학습까지, 뷰티랩과 함께 준비하세요.</p><small>© Beauty Lab. All rights reserved.</small></div></footer>;
}
export function Page({title,group,children,className=''}) {
  const {route:fullRoute}=useAcademy();
  const {path:route,params}=parseRoute(fullRoute);
  const menu=navigation.find(item=>item.label===group);
  const destination=path=>group==='개강일정'?routeTo(path,{course:params.get('course'),month:params.get('month'),track:params.get('track')}):path;
  return <><div className="subnav"><div className="wrap"><span>{group||title}</span><nav aria-label="현재 카테고리">{menu?.children.map(([name,path])=><a key={path} href={`#${destination(path)}`} className={route===path?'active':''} aria-current={route===path?'page':undefined}>{name}</a>)}</nav></div></div><section className={`wrap page ${className}`} aria-label={title} data-page-title={title}>{children}</section></>;
}
export function SectionTitle({children,to,action='전체 보기'}) {return <div className="section-title"><h2>{children}</h2>{to&&<a className="text-link" href={`#${to}`}>{action}</a>}</div>;}
export function DemoNote({children}) {return <p className="demo-note">{children||'과정별 상세 내용과 이용 안내를 확인해주세요.'}</p>;}
export function ConsultationForm({course='',mode='과정 상담',session='',track='',grade='',onComplete}) {
  const {setInquiries}=useAcademy();
  const id=useId();
  const initialValues={name:'',phone:'',course,mode,session,track,grade,consent:false,date:'',message:''};
  const admissions=mode==='입시 상담';
  const [values,setValues]=useState(initialValues);
  const selectedClass=sessionById(values.session);
  const [errors,setErrors]=useState({});
  const [receipt,setReceipt]=useState('');
  const form=useRef(null);
  const field=(name,value)=>setValues(old=>({...old,[name]:value,...(name==='course'&&value!==old.course?{session:'',track:''}:{})}));
  function submit(e){
    e.preventDefault();
    const next=validateInquiry(values);
    if(mode==='방문 상담'&&(!values.date||values.date<new Date().toLocaleDateString('en-CA')))next.date='오늘 이후의 희망 날짜를 선택해주세요.';
    setErrors(next);
    if(Object.keys(next).length){requestAnimationFrame(()=>form.current?.querySelector('[aria-invalid="true"]')?.focus());return;}
    const receiptId=`BL-${Date.now().toString().slice(-7)}`;
    const message=admissions?`[입시 상담 · ${admissionsPlans.find(item=>item.id===values.grade).label}] ${values.message}`:values.message;
    setInquiries(rows=>[{...values,message,name:values.name.trim(),id:receiptId,status:'상담 대기',created:new Date().toLocaleDateString('ko-KR')},...rows]);
    setReceipt(receiptId);onComplete?.();
  }
  const error=name=>errors[name]&&<span className="field-error" id={`${id}-${name}-error`}>{errors[name]}</span>;
  const attrs=name=>({id:`${id}-${name}`,name,value:values[name],onChange:e=>field(name,e.target.value),'aria-invalid':Boolean(errors[name]),'aria-describedby':errors[name]?`${id}-${name}-error`:undefined});
  if(receipt)return <div className="receipt" role="status"><h2>상담 내용이 작성되었습니다</h2><p>작성번호 {receipt}</p>{selectedClass&&<p>{selectedClass.title} · {selectedClass.start} · {selectedClass.time}</p>}<p>작성 내용은 현재 화면에서만 유지됩니다. 상담 접수나 예약이 확정된 것은 아닙니다.</p><button className="button secondary" onClick={()=>{setReceipt('');setValues(initialValues);}}>새 상담 작성</button></div>;
  return <form className="consult-form" onSubmit={submit} noValidate ref={form}>
    {selectedClass&&<div className="selected-class"><strong>{selectedClass.title}</strong><span>{selectedClass.start} 개강 · {selectedClass.time}</span><small>선택한 반이 접수 내용에 포함됩니다. 관심 과정을 바꾸면 선택 반은 해제됩니다.</small></div>}
    <div className="form-grid"><label htmlFor={`${id}-name`}>이름 <span className="required">필수</span><input {...attrs('name')} autoComplete="off" maxLength={30} placeholder="예: 김뷰티"/>{error('name')}</label><label htmlFor={`${id}-phone`}>연락처 <span className="required">필수</span><input {...attrs('phone')} type="tel" autoComplete="off" placeholder="010-1234-5678" maxLength={15}/>{error('phone')}</label></div>
    {admissions&&<label htmlFor={`${id}-grade`}>현재 학년 <span className="required">필수</span><select {...attrs('grade')}><option value="">학년 선택</option>{admissionsPlans.map(item=><option value={item.id} key={item.id}>{item.label}</option>)}</select>{error('grade')}</label>}
    <label htmlFor={`${id}-course`}>{admissions?'관심 전공':'관심 과정'} <span className="required">필수</span><select {...attrs('course')}><option value="">과정 선택</option>{courses.filter(c=>!admissions||admissionsMajors.some(item=>item.id===c.id)).map(c=><option value={c.id} key={c.id}>{c.category}</option>)}</select>{error('course')}</label>
    {mode==='방문 상담'&&<label htmlFor={`${id}-date`}>방문 희망일<input {...attrs('date')} type="date" min={new Date().toLocaleDateString('en-CA')}/>{error('date')}<small>희망일 입력이며 실제 예약을 확정하지 않습니다.</small></label>}
    <label htmlFor={`${id}-message`}>{mode==='수강료 문의'?'확인하고 싶은 수강료·재료비':'문의 내용'} <span className="optional">선택</span><textarea {...attrs('message')} rows={3} maxLength={600} placeholder={admissions?'희망 대학·학과, 준비 경험, 수업 가능한 시간을 적어주세요.':'수업 목적이나 희망 시간대를 적어주세요.'}/></label>
    <label className="check-label"><input type="checkbox" id={`${id}-consent`} checked={values.consent} onChange={e=>field('consent',e.target.checked)} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent?`${id}-consent-error`:undefined}/><span>입력 내용은 서버로 전송되지 않으며 새로고침 시 삭제됩니다. 실제 개인정보를 입력하지 않겠습니다.</span></label>{error('consent')}
    <button className="button" type="submit">{mode} 신청</button>
  </form>;
}
export function Modal() {
  const {modal,setModal}=useAcademy();
  const dialog=useRef(null);
  useEffect(()=>{
    if(!modal)return;
    const active=document.activeElement;
    const node=dialog.current;
    const overflow=document.body.style.overflow;
    node?.showModal();
    document.body.style.overflow='hidden';
    return()=>{node?.close();document.body.style.overflow=overflow;active?.focus();};
  },[modal]);
  if(!modal)return null;
  const promotion=modal.type==='promotion';
  return <dialog ref={dialog} className={`modal${promotion?' event-modal':''}`} aria-labelledby="modal-title" onCancel={()=>setModal(null)} onClick={e=>{if(e.target===e.currentTarget)setModal(null);}}>
    {promotion?<PromotionContent onClose={()=>setModal(null)} onConsult={()=>setModal({type:'consult',mode:'첫 수강 상담'})}/>:<div className="modal-body"><button className="modal-close" onClick={()=>setModal(null)} aria-label="창 닫기">닫기 ×</button><h2 id="modal-title">{modal.mode||'무료 과정 상담'}</h2><p className="muted">관심 분야와 수업 시간을 남겨주세요.</p><ConsultationForm key={`${modal.course||''}/${modal.session||''}`} mode={modal.mode} course={modal.course} session={modal.session} track={modal.track}/></div>}
  </dialog>;
}
