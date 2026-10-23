import React, { useState } from "react";
import { media } from "../media.js";
import { courseById, courses, teachers, portfolio } from "../academyData.js";
import {
  ConsultationForm,
  DemoNote,
  LinkButton,
  Page,
  SectionTitle,
  useAcademy,
} from "../components.jsx";
import NotFound from "./NotFound.jsx";

export function AboutPage({ section }) {
  const [selected, setSelected] = useState("makeup");
  if (section === "instructors")
    return (
      <Page title="강사진" group="학원소개">
        <DemoNote>
          분야별 담당 강사와 수업 방식을 확인하고 학습 목표에 맞는 과정을 선택하세요.
        </DemoNote>
        <div className="teacher-list">
          {teachers.map((t) => (
            <article key={t.name}>
              <img
                src={media.teacherProfile[t.course]}
                alt={`${t.name} 강사 프로필 이미지`}
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
            src={media.facility[selected]}
            alt={`${courseById(selected).category} 실습 공간 이미지`}
          />
          <figcaption>
            <h2>{courseById(selected).category} 실습 공간</h2>
            <p>
              개인 실습 자리와 분야별 도구를 활용하는 교육환경입니다. 작업
              전 준비, 실습, 정리까지 수업 동선에 맞춰 구성합니다.
            </p>
          </figcaption>
        </figure>
        <DemoNote>
          분야별 실습 도구와 작업 동선을 살펴보세요.
        </DemoNote>
      </Page>
    );
  if (section) return <NotFound />;
  return (
    <Page title="학원소개" group="학원소개">
      <div className="about-image">
        <img
          src={media.academy}
          alt="뷰티랩 학원 리셉션 공간 콘셉트"
        />
      </div>
      <div className="about-intro">
        <h2>뷰티랩 미용학원</h2>
        <div>
          <p>
            메이크업, 헤어, 네일아트, 피부미용, 붙임머리를 배우는 미용 전문 교육
            브랜드입니다. 온라인으로 기초 이론을 익히고 실습 수업으로 연결해
            기본기부터 차근차근 배웁니다.
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
        목표와 경험에 맞는 교육과정은 상담을 통해 안내합니다.
      </DemoNote>
    </Page>
  );
}
export function ContactPage({ section,params=new URLSearchParams() }) {
  const title =
    section === "visit"
      ? "방문 상담"
      : section === "tuition"
        ? "수강료 문의"
        : "과정 상담";
  return (
    <Page title={title} group="상담예약">
      {section==='tuition'&&<div className="tuition-options"><p>분야별 교육비을 확인하고 문의할 과정을 선택하세요.</p><div className="fee-table"><table><thead><tr><th>분야</th><th>수강료</th><th>재료비</th><th>선택</th></tr></thead><tbody>{courses.map(c=><tr key={c.id}><th scope="row">{c.category}</th><td>380,000원 ~ 상담</td><td>{c.kit.toLocaleString('ko-KR')}원</td><td><a className="text-link" href={`#contact/tuition?course=${c.id}`} aria-current={params.get('course')===c.id?'true':undefined}>{params.get('course')===c.id?'선택됨':'문의 선택'}</a></td></tr>)}</tbody></table></div><DemoNote>최종 수강료와 재료 구성은 상담에서 확인해주세요. 국비지원 자비부담액과는 별개입니다.</DemoNote></div>}
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
              ? "희망 날짜와 관심 분야를 선택해주세요. 방문 상담은 시간과 장소를 확인한 뒤 확정됩니다."
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
            입력 내용은 서버로 전송되지 않으며 현재 화면에서만 유지됩니다.
            실제 연락처 등 개인정보는 입력하지 마세요.
          </DemoNote>
        </aside>
        <ConsultationForm key={`${title}/${params.get('course')||''}`} mode={title} course={courseById(params.get('course'))?.id||''} />
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
            교육과정에는 수강료와 재료비를 구분해서 표시합니다. 실제 등록
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
            <img src={media.workDetail[work.id]} alt={`${work.title} 세부 표현`} />
            <div>
              <span>{work.category}</span>
              <h2>{work.title}</h2>
              <p>{work.description}</p>
              <DemoNote>작품의 색감과 표현 기법을 살펴보세요.</DemoNote>
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
                    <img src={media.gallery[w.id]} alt={`${w.title}`} loading="lazy" />
                    <span>{w.category}</span>
                    <h2>{w.title}</h2>
                  </a>
                ))}
            </div>
            <DemoNote>
              분야별 표현 기법과 완성 이미지를 참고하며 나만의 작품을 준비하세요.
            </DemoNote>
          </>
        )}
      </Page>
    );
  }
  if (section === "stories" && !id)
    return (
      <Page title="수강 가이드" group="커뮤니티">
        <DemoNote>
          수업 목적과 생활 패턴에 맞는 학습 방법을 살펴보세요.
        </DemoNote>
        <div className="story-list">
          {[
            [
              "hair",
              "직장과 병행하는 헤어 기초반",
              "평일 저녁 수업 전에 온라인 이론을 복습하고, 실습 시간에는 기본 커트 자세를 집중적으로 연습하는 학습 방법입니다.",
              "목표: 미용 기초 습득",
            ],
            [
              "makeup",
              "촬영 작품을 준비하는 메이크업반",
              "레퍼런스 사진을 분석하고 색채 계획을 만든 뒤, 촬영과 피드백을 거쳐 작품을 정리하는 학습 방법입니다.",
              "목표: 개인 작품집 제작",
            ],
            [
              "nail",
              "주말에 배우는 네일아트반",
              "도구 관리와 케어부터 시작해 컬러링과 젤 디자인을 하나씩 익히는 입문자의 학습 방법입니다.",
              "목표: 네일 실무 입문",
            ],
          ].map(([key, title, text, goal]) => (
            <article key={key}>
              <img
                src={media.story[key]}
                alt={`${courseById(key).category} 수업 이미지`}
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
    <Page title="개인정보·이용 안내">
      <article className="legal-copy">
        <h2>실제 개인정보를 입력하지 마세요</h2>
        <p>
          상담 및 회원 화면에는 실제 개인정보를 입력하지 마세요.
          현재 입력 정보는 본인 인증이나 상담 접수에 사용되지 않습니다.
        </p>
        <h2>데이터 처리</h2>
        <p>
          입력값과 수강 진도는 브라우저의 현재 화면 상태에만 저장됩니다. 서버
          전송, 이메일 발송, 실제 결제는 수행하지 않습니다. 새로고침하면
          입력값이 초기화됩니다.
        </p>
        <h2>이벤트 표시 설정</h2>
        <p>
          이벤트의 ‘오늘 하루 보지 않기’를 선택하면 선택한 날짜만 브라우저에 저장합니다.
          한국 시간 자정 이후에는 팝업이 다시 표시되며, 개인정보는 저장하지 않습니다.
        </p>
        <h2>관리자 화면 안내</h2>
        <p>
          관리자 화면에는 접근 권한 검증이 연결되어 있지 않습니다.
          실제 개인정보나 비공개 문서는 등록하지 마세요.
        </p>
        <h2>콘텐츠</h2>
        <p>
          브랜드·강사 소개와 교육 일정·비용은 실제 운영 정보가 아닙니다.
          이미지는 AI로 제작한 교육 분야별 참고 이미지이며 실제 시설·인물·수강생 성과를 나타내지 않습니다.
        </p>
      </article>
    </Page>
  );
}
