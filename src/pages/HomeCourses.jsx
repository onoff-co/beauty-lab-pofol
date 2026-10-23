import React, { useState } from "react";
import { courses, tracks } from "../academyData.js";
import { SectionTitle } from "../components.jsx";

const summaries = {
  makeup: [
    "위생·도구 관리, 유형별 메이크업 과제",
    "웨딩 메이크업, 고객 상담과 룩 제안",
    "촬영 시안, 피부 표현과 색조 밸런스",
  ],
  hair: [
    "샴푸·커트·와인딩, 실기 과제 연습",
    "커트·펌·컬러, 고객별 스타일링",
    "디자인 시안, 작품 촬영과 피드백",
  ],
  nail: [
    "기본 케어·컬러링·연장, 모의 실기",
    "젤 아트·프렌치, 살롱 디자인 실습",
    "컬러 조합, 네일 디자인북 제작",
  ],
  skin: [
    "위생·피부 분석, 얼굴·바디 관리",
    "고객 상담, 관리 순서와 테크닉",
    "관리 계획, 실습 기록과 피드백",
  ],
};

export default function HomeCourses() {
  const [field, setField] = useState("makeup");
  const course = courses.find((item) => item.id === field);
  return (
    <section
      className="wrap home-courses section-space"
      aria-labelledby="home-courses-title"
    >
      <div id="home-courses-title">
        <SectionTitle to="courses">전문 교육과정</SectionTitle>
      </div>
      <div className="course-fields" aria-label="교육 분야 선택">
        {courses.slice(0, 4).map((item) => (
          <button
            key={item.id}
            aria-pressed={field === item.id}
            aria-controls="home-course-previews"
            onClick={() => setField(item.id)}
          >
            {item.category}
          </button>
        ))}
      </div>
      <div
        className="home-course-grid"
        id="home-course-previews"
        aria-label={`${course.category} 세부 과정`}
      >
        {tracks.map((track, index) => (
          <a
            className="home-course"
            key={track.id}
            href={`#courses/${course.id}/${track.id}`}
            aria-label={`${course.category} ${track.name} 과정 상세`}
          >
            <h3>{track.name}</h3>
            <p>{summaries[field][index]}</p>
            <span>과정 자세히</span>
          </a>
        ))}
      </div>
    </section>
  );
}
