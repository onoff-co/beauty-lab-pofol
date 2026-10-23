import React from "react";
import { courses, courseById, money } from "../academyData.js";
import CourseDetail from "./CourseDetail.jsx";
import NotFound from "./NotFound.jsx";
import { CourseCatalog } from '../CourseCards.jsx';
import {
  DemoNote,
  LinkButton,
  Page,
  SectionTitle,
} from "../components.jsx";

export function CoursesPage({ id, track }) {
  const course = courseById(id);
  if (id && !course) return <NotFound />;
  if (!course)
    return (
      <Page title="전체 교육과정" group="교육과정">
        <CourseCatalog/>
      </Page>
    );
  return <CourseDetail course={course} track={track} />;
}
export function SupportPage({ section }) {
  const titles = { courses: "과정·수강료", process: "국비지원 신청 절차" };
  return (
    <Page title={titles[section] || "국비지원 안내"} group="국비지원">
      {section === "courses" ? (
        <>
          <DemoNote>
            일반 교육과정의 수강료 안내입니다. 국비 승인 과정이나
            자비부담액은 고용24에서 별도로 확인해주세요.
          </DemoNote>
          <div className="fee-table">
            <table>
              <thead>
                <tr>
                  <th>과정</th>
                  <th>기간</th>
                  <th>수강료</th>
                  <th>재료비</th>
                </tr>
              </thead>
              <tbody>
                {courses
                  .filter((c) => c.id !== "extension")
                  .map((c) => (
                    <tr key={c.id}>
                      <th scope="row">
                        <a href={`#courses/${c.id}/certificate`}>{c.category} 자격증</a>
                      </th>
                      <td>{c.weeks}주</td>
                      <td>380,000원 ~ 상담</td>
                      <td>{money(c.kit)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <p>
            국비지원 여부와 자비부담액은 고용24의 실제 훈련기관·회차·참여자
            유형별 정보로 확인해야 합니다.
          </p>
          <a
            className="button"
            href="https://www.work24.go.kr/"
            target="_blank"
            rel="noreferrer"
          >
            고용24에서 과정 검색
          </a>
        </>
      ) : section === "process" ? (
        <>
          <ol className="process-list">
            {[
              [
                "대상 및 카드 확인",
                "고용24에서 국민내일배움카드 안내를 읽고 자신의 신청 조건을 확인합니다.",
              ],
              [
                "훈련과정 검색",
                "지역, 미용 분야, 수업 시간으로 검색한 뒤 실제 훈련기관과 회차를 확인합니다.",
              ],
              [
                "기관 상담 및 비용 확인",
                "교육 기간, 총훈련비, 자비부담액, 준비물, 출석 기준을 훈련기관에 문의합니다.",
              ],
              [
                "공식 수강 신청",
                "기관 안내에 따라 고용24에서 신청하고 승인 여부와 개강일을 확인합니다.",
              ],
            ].map(([title, text]) => (
              <li key={title}>
                <h2>{title}</h2>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <a
            className="button"
            href="https://www.work24.go.kr/"
            target="_blank"
            rel="noreferrer"
          >
            고용24 안내 확인
          </a>
        </>
      ) : (
        <>
          <div className="support-overview">
            <div>
              <h2>국민내일배움카드</h2>
              <p>
                직업능력 개발을 위한 훈련 지원 제도입니다. 신청 조건과 지원
                범위, 과정별 비용은 공식 안내에서 확인해주세요.
              </p>
              <p>
                이 사이트에서는 국비지원 신청을 접수하지 않습니다.
                등록된 훈련기관과 지원 대상 과정은 고용24에서 확인해주세요.
              </p>
              <div className="button-row">
                <LinkButton to="support/process">신청 절차 보기</LinkButton>
                <LinkButton to="support/courses" secondary>
                  과정·수강료 안내
                </LinkButton>
              </div>
            </div>
            <div className="support-check">
              <h3>상담 전 확인할 항목</h3>
              <ul>
                <li>희망 지역과 실제 훈련기관</li>
                <li>개강일, 훈련 기간과 총 시간</li>
                <li>자비부담액과 재료비 포함 여부</li>
                <li>출석 및 수료 기준</li>
              </ul>
            </div>
          </div>
          <section className="detail-section">
            <SectionTitle>자주 묻는 질문</SectionTitle>
            {[
              [
                "모든 미용 과정에 지원되나요?",
                "과정과 운영 회차에 따라 다릅니다. 고용24에 등록된 해당 훈련과정 정보를 확인해야 합니다.",
              ],
              [
                "사이트에 나온 수강료가 자비부담액인가요?",
                "아닙니다. 일반 수강료와 국비지원 자비부담액은 다릅니다. 지원 여부와 금액은 고용24의 해당 훈련과정에서 확인해주세요.",
              ],
              [
                "이 사이트에서 지원 신청할 수 있나요?",
                "아니요. 공식 수강 신청은 고용24와 실제 훈련기관 안내를 통해 진행해야 합니다.",
              ],
            ].map(([q, a]) => (
              <details className="faq" key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </section>
        </>
      )}
    </Page>
  );
}
