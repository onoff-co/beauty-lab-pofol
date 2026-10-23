# Implementation Plan: Beauty Academy Full Site + Editorial Redesign

## 2026-10-23 이용 동선·온라인 강의·이미지 개편

- 개강일정은 반별 데이터와 독립 상세 페이지를 제공한다. 목록 필터를 URL에 보존하고 선택 반을 상담 접수까지 전달한다.
- 교육과정 상세 안에서 해당 분야/트랙의 개강반을 바로 확인한다. 일정 상세를 다시 교육과정 첫 화면으로 보내지 않는다.
- 온라인 공개 강의는 검색으로 확인한 원본 YouTube 강의를 출처와 함께 임베드한다. 로그인 없이 열람하며 실제 인증·수료와 구분한다.
- 중복 배너/인물/강의 이미지를 제거한다. 이미지가 필요한 학원소개·강사진·시설·작품·캠페인에 신규 시안을 사용한다. 트랙과 일정은 정보 중심으로 구성하므로 이전 74장 계획은 대체한다.
- 기존 블러시/버건디, 데스크톱 2:6:2, 모바일 18px 여백 유지. 반복 슬로건/페이지 타이틀 배너는 추가하지 않는다.
- 잘못된 하위 주소는 동일 화면으로 묵인하지 않고 찾을 수 없음 처리한다.

### 구현 순서 및 검증

1. 일정/라우트 모델 + 회귀 테스트 (domain.js, scheduleData.js, tests/domain.test.mjs).
2. 일정 목록/상세 + 선택 반 상담 전달 (Schedule.jsx, components.jsx, PlatformPage.jsx, journey.css).
3. 과정/홈/문의 연결 및 로그인 복귀 (CourseDetail.jsx, Home.jsx, Academy.jsx, Student.jsx).
4. 검증된 공개 강의 목록/플레이어 (onlineData.js, Online.jsx, online.css, tests/content.test.mjs).
5. 역할별 신규 이미지 및 중복 제거 (media.js, Academy.jsx, Home.jsx, CourseDetail.jsx, Student.jsx).
6. 전체 테스트/빌드, 320/768/1024/1440px 브라우저 확인. 목록→상세→상담→완료 및 강의 전환 확인.

주의: 모든 반별 일정·비용은 명시된 데모 데이터다. 영상 저작권은 원저작자에게 있으며 외부 플레이어 차단 시 원본 링크를 제공한다. 개인정보/진도는 현재 탭의 시연 상태만 사용한다.

## Overview

미용학원 공개 사이트의 정보 구조를 참고해 Beauty Academy를 교육 플랫폼형 독립 반응형 사이트로 구현한다. 공개 화면과 수강생 학습센터, 관리자 콘솔을 하나의 사용자 여정으로 연결하고, 이번 재설계에서는 핑크·버건디 기반의 에디토리얼 럭셔리 디자인 시스템을 적용한다.

## Architecture Decisions

- 독립 Vite + React 프로젝트로 유지한다. `closefit` 쇼핑몰과 코드를 공유하지 않는다.
- 별도 라우터 의존성 없이 hash 기반 화면 전환을 사용해 포트폴리오 실행을 단순하게 유지한다.
- 교육과정·일정·강사진·후기·FAQ·문의 데이터는 `src/data.js`에 모아 교체 가능하게 한다.
- 공개 참고 사이트의 정보 구조만 사용하고, 브랜드명·고유 문구·원본 이미지는 복제하지 않는다.

## Task List

### Phase 1: Foundation

- [x] Task 1: 독립 메뉴·해시 라우팅·공통 헤더/푸터
- [x] Task 2: 목데이터 모델과 메뉴별 화면 상태

### Phase 2: Core Features

- [x] Task 3: 교육과정·과정 상세·과정 이미지
- [x] Task 4: 수강 일정·지원제도·강사진·성공사례
- [x] Task 5: 문의·상담예약·FAQ 화면

### Checkpoint: Core Features

- [x] 메뉴 전체 이동 가능
- [x] 과정·일정·강사진·문의 목데이터 표시
- [x] 상담 폼 제출 완료 상태 표시
- [x] 모바일 레이아웃 확인

### Phase 3: Polish

- [x] Task 6: 배너·카드뉴스·팝업 이미지 및 접근성 보정
- [x] Task 7: 전체 빌드·브라우저 검증·README 갱신

### Checkpoint: Complete

- [x] `npm run build` 성공
- [x] 모든 화면에 h1과 의미 있는 빈 상태가 있음
- [x] 키보드로 메뉴와 폼 사용 가능
- [x] 화면 폭 320px 이상에서 가로 스크롤 없음

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| 참고 사이트와의 시각적 유사성 | Medium | 정보 구조만 참고하고 독자적 핑크 팔레트·카피·생성 이미지를 사용 |
| 목데이터가 실제 운영 데이터로 오인될 수 있음 | Medium | README와 화면에 포트폴리오용 예시 데이터임을 명시 |
| 메뉴가 많아 모바일 탐색이 복잡해질 수 있음 | High | 모바일 메뉴 버튼과 짧은 1단계 메뉴로 제한 |

## Editorial Redesign Contract

- **Domain:** 미용 교육 플랫폼. 핵심 흐름은 발견 → 과정 비교 → 상담/수강 신청 → 학습 관리 → 운영 관리다.
- **Emotional direction:** 60% 신뢰/전문성, 30% 따뜻함, 10% 에너지. 과장된 뷰티 광고보다 실제 커리어 전환을 돕는 교육 브랜드로 보이게 한다.
- **Identity:** Beauty Lab Academy — 기술을 배우고 나의 일을 시작하는 뷰티 교육 플랫폼.
- **Visual system:** 블랙 플럼 `#241A20`, 버건디 `#702F49`, 핑크 `#D97896`, 블러시 `#F7EEF2`, 샴페인 `#C89B63`, 아이보리 `#FCFAF8`; Playfair Display 계열 헤딩 + Inter/pretendard 계열 본문.
- **Interaction:** 링크·필터·신청 버튼은 150–250ms 피드백, 콘텐츠 진입은 짧은 stagger reveal, `prefers-reduced-motion`에서는 정적 상태로 제공한다.
