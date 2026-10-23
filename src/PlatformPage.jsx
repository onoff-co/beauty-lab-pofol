import React, { useEffect, useRef, useState } from 'react';
import { noticesSeed } from './academyData.js';
import { normalizeRoute, parseRoute, supportedRoute } from './domain.js';
import { AcademyContext, Header, Footer, Modal } from './components.jsx';
import Home from './pages/Home.jsx';
import { CoursesPage, SupportPage } from './pages/Education.jsx';
import NotFound from './pages/NotFound.jsx';
import { OnlinePage } from './pages/Online.jsx';
import { SchedulePage, SessionDetail } from './pages/Schedule.jsx';
import { AboutPage, CommunityPage, ContactPage, PrivacyPage } from './pages/Academy.jsx';
import { AccountPage, AdminPage, ClassroomPage } from './pages/Student.jsx';

function RouteContent({route}) {
  const {path,params}=parseRoute(route);
  const [root,section,id]=path.split('/');
  if(!supportedRoute(path))return <NotFound/>;
  switch(root){
    case 'home': return section?<NotFound/>:<Home/>;
    case 'about': return <AboutPage section={section}/>;
    case 'courses': return <CoursesPage id={section} track={id}/>;
    case 'online': return <OnlinePage id={section} lessonId={id} params={params}/>;
    case 'schedule': return section==='class'?<SessionDetail id={id} params={params}/>:<SchedulePage filter={section} params={params}/>;
    case 'support': return !section||['courses','process'].includes(section)?<SupportPage section={section}/>:<NotFound/>;
    case 'community': return <CommunityPage section={section} id={id}/>;
    case 'contact': return <ContactPage section={section} params={params}/>;
    case 'classroom': return <ClassroomPage section={section} lessonId={id}/>;
    case 'account': return <AccountPage login={section==='login'} returnTo={params.get('returnTo')}/>;
    case 'admin': return <AdminPage section={section}/>;
    case 'privacy': return <PrivacyPage/>;
    default:return <NotFound/>;
  }
}
export default function PlatformPage(){
  const [route,setRoute]=useState(()=>normalizeRoute(window.location.hash));
  const [modal,setModal]=useState(null);
  const [inquiries,setInquiries]=useState([]);
  const [notices,setNotices]=useState(noticesSeed);
  const [members,setMembers]=useState([{id:'demo-student',name:'김뷰티',email:'beauty@example.com',status:'수강 준비'}]);
  const [user,setUser]=useState(null);
  const [learning,setLearning]=useState({});
  const initialized=useRef(false);
  const path=parseRoute(route).path;
  const record=learning[user?.id]||{enrollments:[],completed:[],history:[]};
  const updateLearning=field=>update=>{if(!user)return;setLearning(all=>{const current=all[user.id]||{enrollments:[],completed:[],history:[]};return {...all,[user.id]:{...current,[field]:typeof update==='function'?update(current[field]):update}};});};
  useEffect(()=>{const change=()=>{setRoute(normalizeRoute(window.location.hash));setModal(null);};window.addEventListener('hashchange',change);return()=>window.removeEventListener('hashchange',change);},[]);
  useEffect(()=>{window.scrollTo({top:0,behavior:'instant'});document.title=`${document.querySelector('[data-page-title]')?.dataset.pageTitle||document.querySelector('main h1')?.textContent||'뷰티랩 미용학원'} | Beauty Lab`;if(initialized.current)document.getElementById('main-content')?.focus({preventScroll:true});initialized.current=true;},[path]);
  const context={route,modal,setModal,inquiries,setInquiries,notices,setNotices,members,setMembers,user,setUser,...record,setEnrollments:updateLearning('enrollments'),setCompleted:updateLearning('completed'),setHistory:updateLearning('history')};
  return <AcademyContext.Provider value={context}><Header route={path}/><main id="main-content" tabIndex={-1}><RouteContent route={route} key={path}/></main><Footer/><Modal/></AcademyContext.Provider>;
}
