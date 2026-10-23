import React, { useState } from "react";
import { assetUrl } from "../assets.js";
import { courses, portfolio, teachers } from "../academyData.js";
import {
  ConsultationForm,
  LinkButton,
  SectionTitle,
  useAcademy,
} from "../components.jsx";
import HomeCourses from "./HomeCourses.jsx";
import "../home.css";

const campaigns = [
  {
    title: "11월 미용 자격증반",
    description:
      "헤어·메이크업·네일아트·피부미용 기초 실습과 필기 이론을 함께 준비하세요.",
    image: assetUrl("/assets/beauty-academy-hero.png"),
    button: "개강일정 확인",
    to: "schedule",
  },
  {
    title: "메이크업 실무 클래스",
    description: "웨딩부터 촬영 메이크업까지, 실습으로 익히는 현장 테크닉.",
    image: assetUrl("/assets/course-makeup.png"),
    button: "과정 상세 보기",
    to: "courses/makeup",
  },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const { notices, setModal } = useAcademy();
  const campaign = campaigns[slide];
  const changeSlide = (direction) =>
    setSlide(
      (current) => (current + direction + campaigns.length) % campaigns.length,
    );
  return (
    <div className="home-page">
      <section
        className={`hero hero-${slide}`}
        aria-roledescription="캐러셀"
        aria-label="교육과정 안내"
      >
        <div className="wrap hero-stage">
          <img
            className="hero-photo"
            src={campaign.image}
            alt={
              slide === 0
                ? "미용 실습실에서 교육 도구를 든 인물 시안"
                : "메이크업 실습 시안"
            }
            fetchPriority="high"
          />
          <div className="hero-layout">
            <div className="hero-copy">
              <h1>{campaign.title}</h1>
              <p>{campaign.description}</p>
              <LinkButton to={campaign.to}>{campaign.button}</LinkButton>
            </div>
          </div>
        </div>
        <div className="wrap hero-pagination">
          <button aria-label="이전 배너" onClick={() => changeSlide(-1)}>
            이전
          </button>
          {campaigns.map((item, index) => (
            <button
              className="campaign-selector"
              key={item.to}
              aria-pressed={slide === index}
              onClick={() => setSlide(index)}
            >
              {item.title}
            </button>
          ))}
          <span className="slide-count" aria-live="polite">
            {slide + 1} / {campaigns.length}
          </span>
          <button aria-label="다음 배너" onClick={() => changeSlide(1)}>
            다음
          </button>
        </div>
      </section>

      <div className="quick-strip">
        <nav className="wrap" aria-label="빠른 안내">
          <a href="#contact/tuition">
            <strong>수강료 조회</strong>
            <span>교육비·재료비 안내</span>
          </a>
          <a href="#schedule">
            <strong>개강일정</strong>
            <span>평일·주말반 확인</span>
          </a>
          <a href="#courses">
            <strong>커리큘럼</strong>
            <span>분야별 교육 내용</span>
          </a>
          <button onClick={() => setModal({ type: "consult" })}>
            <strong>상담예약</strong>
            <span>맞춤 과정 상담</span>
          </button>
        </nav>
      </div>

      <HomeCourses />

      <section className="home-work section-space">
        <div className="wrap">
          <SectionTitle to="community/portfolio">수강생 작품</SectionTitle>
          <div className="work-grid">
            {portfolio.slice(0, 3).map((work) => (
              <a href={`#community/portfolio/${work.id}`} key={work.id}>
                <img
                  src={work.image}
                  alt={work.title + " 시안"}
                  loading="lazy"
                />
                <div>
                  <span>{work.category}</span>
                  <h3>{work.title}</h3>
                </div>
              </a>
            ))}
          </div>
          <p className="small muted">
            실제 수강생 작품이 아닌 포트폴리오용 생성 시안입니다.
          </p>
        </div>
      </section>

      <section className="wrap home-teachers section-space">
        <SectionTitle to="about/instructors">과정별 강사진</SectionTitle>
        <div className="home-teacher-grid">
          {teachers.map((teacher) => (
            <a href="#about/instructors" key={teacher.course}>
              <img
                src={courses.find((c) => c.id === teacher.course).image}
                alt={teacher.role + " 이미지 시안"}
                loading="lazy"
              />
              <div>
                <p>{teacher.role}</p>
                <h3>{teacher.name} 강사</h3>
                <span>{teacher.specialty}</span>
              </div>
            </a>
          ))}
        </div>
        <p className="small muted">
          강사 이름과 인물 이미지는 데모 설정입니다.
        </p>
      </section>

      <section className="home-services">
        <div className="wrap service-grid">
          <div>
            <h2>온라인 이론 수업</h2>
            <p>필기 이론 학습부터 자료 다운로드, 수강 이력까지.</p>
            <LinkButton to="online" secondary>
              온라인 강의 보기
            </LinkButton>
          </div>
          <div>
            <h2>국비지원 안내</h2>
            <p>국민내일배움카드 과정 검색과 신청 절차를 확인하세요.</p>
            <LinkButton to="support" secondary>
              지원제도 확인
            </LinkButton>
          </div>
          <div>
            <h2>스타터 패키지</h2>
            <p>처음 시작하는 분을 위한 수업 준비물과 과정 안내.</p>
            <button
              className="button secondary"
              onClick={() => setModal({ type: "promotion" })}
            >
              패키지 안내
            </button>
          </div>
        </div>
      </section>

      <section className="home-information">
        <div className="wrap info-grid">
          <div className="opening-panel">
            <SectionTitle to="schedule">11월 개강일정</SectionTitle>
            <div className="opening-list">
              {courses
                .slice(0, 4)
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((c) => (
                  <a key={c.id} href={`#courses/${c.id}`}>
                    <time dateTime={c.date}>
                      <b>{c.date.slice(8)}</b>11월
                    </time>
                    <div>
                      <strong>{c.category} 기초·자격증반</strong>
                      <p>{c.days}</p>
                    </div>
                  </a>
                ))}
            </div>
            <p className="small muted">포트폴리오용 모집 일정 예시</p>
          </div>
          <div className="news-panel">
            <SectionTitle to="community/notices">공지사항</SectionTitle>
            <div className="news-list">
              {notices.slice(0, 3).map((n) => (
                <a key={n.id} href={`#community/notices/${n.id}`}>
                  <span>{n.category}</span>
                  <strong>{n.title}</strong>
                  <time>{n.date}</time>
                </a>
              ))}
            </div>
            <a className="notice-contact" href="#contact/visit">
              <strong>방문 상담 예약</strong>
              <span>희망 날짜와 관심 과정을 남겨주세요.</span>
            </a>
          </div>
        </div>
      </section>

      <section className="home-consult">
        <div className="wrap consult-layout">
          <div>
            <h2>과정 상담 신청</h2>
            <p>관심 분야와 수업 목적을 알려주세요.</p>
            <dl className="consult-facts">
              <div>
                <dt>교육 분야</dt>
                <dd>메이크업 · 헤어 · 네일아트 · 피부미용 · 붙임머리</dd>
              </div>
              <div>
                <dt>상담 항목</dt>
                <dd>커리큘럼, 개강일정, 수강료, 준비물</dd>
              </div>
            </dl>
            <p className="small muted">
              신청 흐름을 체험하는 데모입니다. 실제 개인정보를 입력하지 마세요.
            </p>
          </div>
          <ConsultationForm />
        </div>
      </section>
    </div>
  );
}
