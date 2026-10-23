import React, { useState } from 'react';
import { assetUrl } from './assets.js';
import { hidePromotionToday } from './promotion.js';
import './promotion.css';

export default function PromotionContent({ onClose, onConsult }) {
  const [storageError, setStorageError] = useState(false);
  function hideToday() {
    if (hidePromotionToday(window)) onClose();
    else setStorageError(true);
  }
  return <div className="entry-promotion">
    <button className="event-close" type="button" onClick={onClose} aria-label="이벤트 팝업 닫기">×</button>
    <div className="event-photo">
      <img src={assetUrl('/assets/promotion-starter.png')} alt="브러시와 헤어 도구를 담은 뷰티 실습 키트" width="1448" height="1086"/>
      <span>BEAUTY LAB · FIRST CLASS</span>
    </div>
    <div className="event-copy">
      <p className="event-eyebrow">처음 배우는 분을 위한 상담 이벤트</p>
      <h2 id="modal-title">뷰티의 첫 수업,<br/>함께 준비해요.</h2>
      <p className="event-description">어떤 과정부터 시작할지 고민이라면,<br/>목표와 일상에 맞는 수업을 찾아보세요.</p>
      <ul className="event-benefits">
        <li><span>01</span><div><strong>관심 분야에 맞는 과정 안내</strong><small>헤어 · 메이크업 · 네일 · 피부미용 · 붙임머리</small></div></li>
        <li><span>02</span><div><strong>나에게 맞는 시간표 확인</strong><small>평일·주말반과 온라인 이론 학습</small></div></li>
        <li><span>03</span><div><strong>첫 수업 준비물 체크</strong><small>개인 도구부터 과정별 재료 구성까지</small></div></li>
      </ul>
      <button className="button event-cta" type="button" onClick={onConsult}>첫 수강 무료 상담 신청</button>
      <p className="event-caption">미용 입문자 및 새로운 분야를 시작하는 분 대상</p>
    </div>
    <div className="event-controls"><button type="button" onClick={hideToday}>오늘 하루 보지 않기</button><button type="button" onClick={onClose}>닫기</button></div>
    {storageError&&<p className="event-storage-error" role="status">브라우저 저장이 제한되어 설정을 저장하지 못했습니다. 닫기를 눌러 계속 이용해주세요.</p>}
  </div>;
}
