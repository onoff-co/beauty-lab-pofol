import React from 'react';
import {LinkButton,Page} from '../components.jsx';
export default function NotFound(){
  return <Page title="페이지를 찾을 수 없습니다"><div className="empty"><p>주소가 변경되었거나 등록되지 않은 페이지입니다.</p><LinkButton to="home">홈으로 이동</LinkButton></div></Page>;
}
