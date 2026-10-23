import React, { useState } from "react";
import { assetUrl } from "../assets.js";
import { courseById, courses, teachers, portfolio } from "../academyData.js";
import {
  ConsultationForm,
  DemoNote,
  LinkButton,
  Page,
  SectionTitle,
  useAcademy,
} from "../components.jsx";
import { NotFound } from "./Education.jsx";

export function AboutPage({ section }) {
  const [selected, setSelected] = useState("makeup");
  if (section === "instructors")
    return (
      <Page title="강사진" group="학원소개">
        <DemoNote>
          강사 이름과 담당 분야는 시연용 설정입니다. 이미지 속 인물은 실제
          강사가 아닙니다.
        </DemoNote>
        <div className="teacher-list">
          {teachers.map((t) => (
            <article key={t.name}>
              <img
                src={courseById(t.course).image}
                alt={`${t.role} 실습 분야 시안`}
              />
              <div>
                <p className="teacher-role">{t.role}</p>
                <h2>{t.name}</h2>
                <p>{t.specialty}</p>
                <p>{t.method}</p>
                <LinkButton to={`courses/${t.course}`} secondary>
                  담당 과정
                </LinkButton>
              </div>
            </article>
          ))}
        </div>
      </Page>
    );
  if (section === "facilities")
    return (
      <Page title="교육환경" group="학원소개">
        <div className="tabs" aria-label="실습실 분야">
          {courses.slice(0, 4).map((c) => (
            <button
              key={c.id}
              aria-pressed={selected === c.id}
              onClick={() => setSelected(c.id)}
            >
              {c.category} 실습실
            </button>
          ))}
        </div>
        <figure className="facility-view">
          <img
            src={courseById(selected).image}
            alt={`${courseById(selected).category} 실습 환경 시안`}
          />
          <figcaption>
            <h2>{courseById(selected).category} 실습 공간</h2>
            <p>
              개인 실습 자리와 분야별 도구를 활용하는 교육환경 제안입니다. 작업
              전 준비, 실습, 정리까지 수업 동선에 맞춰 구성합니다.
            </p>
          </figcaption>
        </figure>
        <DemoNote>
          실제 학원 시설 사진이 아닌 AI 생성 콘셉트 이미지입니다. 실제 주소·시설
          자료는 운영 시 교체해야 합니다.
        </DemoNote>
      </Page>
    );
  if (section) return <NotFound />;
  return (
    <Page title="학원소개" group="학원소개">
      <div className="about-image">
        <img
          src={assetUrl("/assets/beauty-academy-hero.png")}
          alt="뷰티랩 헤어 실습 환경 콘셉트"
        />
      </div>
      <div className="about-intro">
        <h2>뷰티랩 미용학원</h2>
        <div>
          <p>
            메이크업, 헤어, 네일아트, 피부미용, 붙임머리를 배우는 미용 전문 교육
            사이트입니다. 온라인으로 기초 이론을 익히고 실습 수업으로 연결하는
            교육 구성을 제안합니다.
          </p>
          <p>
            교육 목적에 따라 자격증 준비, 살롱 실무, 작품 포트폴리오 과정을
            비교할 수 있습니다.
          </p>
        </div>
      </div>
      <div className="academy-methods">
        <section>
          <h3>자격증 준비</h3>
          <p>
            기본 이론과 실기 과제별 동작을 익히고, 모의 실습을 통해 부족한
            부분을 점검합니다.
          </p>
        </section>
        <section>
          <h3>개별 실습 피드백</h3>
          <p>
            작업 순서와 결과물을 기록하고, 강사의 피드백을 다음 실습에
            반영합니다.
          </p>
        </section>
        <section>
          <h3>온라인 복습</h3>
          <p>
            학습 자료와 진도를 확인하며 수업 사이에도 기초 개념을 반복합니다.
          </p>
        </section>
      </div>
      <div className="button-row">
        <LinkButton to="about/instructors">강사진 보기</LinkButton>
        <LinkButton to="about/facilities" secondary>
          교육환경 보기
        </LinkButton>
      </div>
      <DemoNote>
        가상의 미용학원 브랜드로 제작한 웹사이트 포트폴리오입니다.
      </DemoNote>
    </Page>
  );
}
export function ContactPage({ section }) {
  const title =
    section === "visit"
      ? "방문 상담"
      : section === "tuition"
        ? "수강료 문의"
        : "과정 상담";
  return (
    <Page title={title} group="상담예약">
      <div className="contact-page">
        <aside>
          <h2>
            {title === "방문 상담"
              ? "방문 전 상담 안내"
              : title === "수강료 문의"
                ? "교육비 확인 항목"
                : "교육과정 상담 안내"}
          </h2>
          <p>
            {title === "방문 상담"
              ? "희망 날짜와 분야를 남겨주세요. 방문 시간과 장소는 실제 운영 시 담당자 확인 후 확정하는 구성입니다."
              : title === "수강료 문의"
                ? "교육 기간, 실습 도구 보유 여부, 희망하는 과정에 따라 확인할 항목이 달라집니다."
                : "처음 배우는 분도 관심 분야를 선택하고, 자격증·취업·취미 등 수업 목적을 알려주세요."}
          </p>
          <dl className="spec-list">
            <div>
              <dt>상담 과정</dt>
              <dd>목적 확인 / 과정 안내 / 일정 확인</dd>
            </div>
            <div>
              <dt>준비 정보</dt>
              <dd>관심 분야, 희망 시간, 수강 경험</dd>
            </div>
            <div>
              <dt>비용 항목</dt>
              <dd>수강료, 교재, 도구·재료비</dd>
            </div>
          </dl>
          <DemoNote>
            실제 상담 접수가 아닌 데모입니다. 이름과 연락처는 예시로
            입력해주세요. 서버 전송 없이 현재 탭에서만 유지됩니다.
          </DemoNote>
        </aside>
        <ConsultationForm key={title} mode={title} />
      </div>
      <section className="detail-section">
        <SectionTitle>상담 전에 자주 묻는 질문</SectionTitle>
        <details className="faq">
          <summary>처음 배우는데 어떤 반을 선택하나요?</summary>
          <p>
            기초·자격증반에서 도구와 기본 동작부터 학습합니다. 이미 배운 경험이
            있다면 실무반의 커리큘럼과 비교해주세요.
          </p>
        </details>
        <details className="faq">
          <summary>재료비는 수강료에 포함되나요?</summary>
          <p>
            현재 예시 과정에는 수강료와 재료비를 구분해서 표시합니다. 실제 등록
            전에는 포함 항목과 개인 도구 사용 가능 여부를 확인해야 합니다.
          </p>
        </details>
      </section>
    </Page>
  );
}
export function CommunityPage({ section = "notices", id }) {
  const { notices } = useAcademy();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  if (section === "notices") {
    const notice = notices.find((n) => n.id === id);
    if (id && !notice) return <NotFound />;
    return (
      <Page title={notice ? "공지 상세" : "공지사항"} group="커뮤니티">
        {notice ? (
          <article className="notice-detail">
            <div>
              <span>{notice.category}</span>
              <h2>{notice.title}</h2>
              <time>{notice.date}</time>
            </div>
            <p className="pre-line">{notice.body}</p>
            <LinkButton to="community/notices" secondary>
              목록으로
            </LinkButton>
          </article>
        ) : (
          <>
            <div className="table-toolbar">
              <p>
                총 {notices.filter((n) => n.title.includes(query)).length}건
              </p>
              <label className="search-label">
                공지 검색
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="제목으로 검색"
                />
              </label>
            </div>
            <div className="board">
              {notices
                .filter((n) => n.title.includes(query))
                .map((n) => (
                  <a href={`#community/notices/${n.id}`} key={n.id}>
                    <span>{n.category}</span>
                    <h2>{n.title}</h2>
                    <time>{n.date}</time>
                  </a>
                ))}
            </div>
            {!notices.some((n) => n.title.includes(query)) && (
              <p className="empty">검색된 공지사항이 없습니다.</p>
            )}
          </>
        )}
      </Page>
    );
  }
  if (section === "portfolio") {
    const work = portfolio.find((p) => p.id === id);
    if (id && !work) return <NotFound />;
    return (
      <Page title={work ? "작품 상세" : "작품 갤러리"} group="커뮤니티">
        {work ? (
          <article className="work-detail">
            <img src={work.image} alt={`${work.title} 생성 시안`} />
            <div>
              <span>{work.category}</span>
              <h2>{work.title}</h2>
              <p>{work.description}</p>
              <DemoNote>실제 학생 작품이 아닌 생성 시안입니다.</DemoNote>
              <LinkButton to={`courses/${work.id}`}>관련 교육과정</LinkButton>
              <p>
                <a className="text-link" href="#community/portfolio">
                  갤러리 목록
                </a>
              </p>
            </div>
          </article>
        ) : (
          <>
            <div className="tabs">
              {[
                ["all", "전체"],
                ...courses.slice(0, 4).map((c) => [c.id, c.category]),
              ].map(([value, label]) => (
                <button
                  aria-pressed={category === value}
                  onClick={() => setCategory(value)}
                  key={value}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="gallery-grid">
              {portfolio
                .filter((w) => category === "all" || w.id === category)
                .map((w) => (
                  <a href={`#community/portfolio/${w.id}`} key={w.id}>
                    <img src={w.image} alt={`${w.title} 시안`} />
                    <span>{w.category}</span>
                    <h2>{w.title}</h2>
                  </a>
                ))}
            </div>
            <DemoNote>
              작품 갤러리의 구성 예시입니다. 모든 이미지는 생성 시안이며 실제
              수강생의 작업으로 제시하지 않습니다.
            </DemoNote>
          </>
        )}
      </Page>
    );
  }
  if (section === "stories")
    return (
      <Page title="수강 이야기" group="커뮤니티">
        <DemoNote>
          아래 이야기는 후기 페이지 디자인을 위한 가상의 수강 시나리오입니다.
          실제 후기나 취업 성과가 아닙니다.
        </DemoNote>
        <div className="story-list">
          {[
            [
              "hair",
              "직장과 병행하는 헤어 기초반",
              "평일 저녁 수업 전에 온라인 이론을 복습하고, 실습 시간에는 기본 커트 자세를 집중적으로 연습하는 수강 사례입니다.",
              "목표: 미용 기초 습득",
            ],
            [
              "makeup",
              "촬영 작품을 준비하는 메이크업반",
              "레퍼런스 사진을 분석하고 색채 계획을 만든 뒤, 촬영과 피드백을 거쳐 작품을 정리하는 수강 사례입니다.",
              "목표: 개인 작품집 제작",
            ],
            [
              "nail",
              "주말에 배우는 네일아트반",
              "도구 관리와 케어부터 시작해 컬러링과 젤 디자인을 하나씩 익히는 입문자의 수강 사례입니다.",
              "목표: 네일 실무 입문",
            ],
          ].map(([key, title, text, goal]) => (
            <article key={key}>
              <img
                src={courseById(key).image}
                alt={`${courseById(key).category} 수업 시안`}
              />
              <div>
                <span>{goal}</span>
                <h2>{title}</h2>
                <p>{text}</p>
                <LinkButton to={`courses/${key}`} secondary>
                  교육과정 보기
                </LinkButton>
              </div>
            </article>
          ))}
        </div>
      </Page>
    );
  return <NotFound />;
}
export function PrivacyPage() {
  return (
    <Page title="개인정보·데모 이용 안내">
      <article className="legal-copy">
        <h2>실제 개인정보를 입력하지 마세요</h2>
        <p>
          이 웹사이트는 포트폴리오 데모입니다. 상담 폼, 회원 화면에는 예시
          이름과 예시 연락처만 입력해주세요.
        </p>
        <h2>데이터 처리</h2>
        <p>
          입력값과 수강 진도는 브라우저의 현재 화면 상태에만 저장됩니다. 서버
          전송, 이메일 발송, 실제 결제는 수행하지 않습니다. 새로고침하면
          입력값이 초기화됩니다.
        </p>
        <h2>관리자 화면</h2>
        <p>
          관리자 데모는 접근 제한이 없는 기능 미리보기입니다. 실제 서비스 운영
          시에는 서버 인증, 권한 검증, 개인정보 보호 조치가 별도로 필요합니다.
        </p>
        <h2>콘텐츠</h2>
        <p>
          브랜드, 강사, 과정 정보, 비용과 일정은 가상의 예시입니다. 이미지는 AI
          생성 시안이며 실제 시설·인물·학생 성과를 증명하지 않습니다.
        </p>
      </article>
    </Page>
  );
}
