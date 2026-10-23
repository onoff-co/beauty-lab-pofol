# 공통 제목 제거 및 교육과정 상세 화면 개편

## 기준

- 사용자 지정 참고: https://www.mbcbeauty.co.kr/curriculum/hair 및 해당 페이지에서 연결된 /curriculum/hair/742.
- 브라우저에서 대표 과정 화면, 수강 로드맵, 강사진, 진로, 상담 영역과 세부 과정의 교육 목표·커리큘럼·자격증 안내 배치를 확인했다.
- 디자인 스킬의 임의 방향 추첨보다 사용자가 지정한 구성을 우선했다. 경쟁사 로고·사진·강사·후기는 복제하지 않았다.
- 기존 블러시·버건디 색상, 1280px 이상 2:6:2 프레임, 모바일 여백, 기존 메뉴와 데모 기능 유지.

## 변경

- 공통 Page 컴포넌트의 page-title 블록(반복 H1와 경로 표시), 관련 CSS를 삭제했다. 숨겨 놓은 제목으로 대체하지 않았다.
- 화면 식별을 위한 aria-label과 브라우저 탭 제목은 유지했다. 메인 배너의 H1 및 본문 내용에 필요한 소제목은 삭제 대상이 아니다.
- 5개 분야의 전체 과정 화면: 이미지와 과정 설명 → 실제 링크가 있는 수강 로드맵 → 강사 → 진로 → 수강 정보 → 상담 폼.
- 14개 세부 과정: 대표 화면 → 교육 목표 → 커리큘럼 → 준비 자격증 또는 결과물 → 강사·진로·수강 정보·상담.
- 붙임머리는 국가자격증 과정을 노출하지 않는다. 없는 과정 URL은 안내 화면을 보여준다.
- 상담 폼은 방문한 교육 분야를 기본 선택한다. 실제 예약·개인정보 전송 기능은 추가하지 않았다.
- 기간·수강료·개강일·강사·이미지는 기존 포트폴리오 예시를 유지했다. 운영용 공개 전 교체·확정 필요.

## 검증

- 변경 전: 반복 H1 삭제 검사가 about 페이지에서 실패하는 것을 확인.
- 변경 후: 43개 경로 × 6개 화면 폭 = 258개 검사 통과. 반복 제목 부재, 가로 넘침, 2줄 초과 제목, 과정별 콘텐츠, 선택 메뉴 및 상담 분야 확인.
- 단위 검사 11개 통과. 최종 production build 통과.
- 인앱 브라우저: 헤어 로드맵의 국가자격증 자세히 클릭 → 실제 경로 및 커리큘럼 변경 확인. 상담 모달 열림·닫힘 확인.
- 시각 검사: artifacts/course-redesign-final/ (1440, 768, 390px). 검사 예외를 적용한 결과 0 FAIL, 4 WARN.

## 디자인 검사 예외와 한계

- no-title: 사용자가 반복 H 태그와 제목 영역 삭제를 명시했다. 별도의 H1를 재삽입하지 않음.
- hairline / card-rows: 참고 학원 사이트의 메뉴·로드맵·커리큘럼 정보 구획을 사용.
- focal-point: 과도한 큰 제목 대신 기존 60% 본문 폭과 절제된 크기 유지.
- few-pictures / no-footage: 기존 생성 시안을 재사용했다. 실제 강사 사진·현장 영상은 제공되지 않았으며 임의로 가져오지 않음.
- body-size / grey-body: 기존 헤더·푸터·보조 안내 13px 스타일 유지. 새 주요 본문은 15~16px.
- measure: 장문의 데모 주석과 푸터가 감지됨. 읽기용 본문은 카드/열 안에서 제한됨.

ROUND 1
Seen in one second: 헤어 실습 이미지와 과정 선택 메뉴.
Idea (one sentence): 뷰티랩의 5개 분야와 온라인 이론 연계를 목표별 수강 로드맵으로 연결한다.
Live thing: 로드맵 선택으로 과정 경로·교육 내용·상담 선택값이 달라진다.
Layout words by section: cover=split / roadmap=columns / teacher=split / careers=columns / enrollment=table / inquiry=form
Scores: design 6.5 · usability 8 · creativity 6 · content 7 → overall 6.9
Caps applied: 기존 이미지 2개 재사용, 참고 사이트 기반의 익숙한 구성.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. desktop-fold: 상단 여백이 공통 CSS에 덮임. .page.course-page로 정확히 지정해 수정.
2. 세부 과정 검사: 자격증 제목의 그리드 세로 늘어남. align-items:start로 수정.
3. desktop-page-01: 대표 화면과 강사 영역의 동일 사진. 임의의 타 학원 사진을 쓰지 않고 현장 사진 교체 과제로 유지.

ROUND 2
Seen in one second: 과정 설명과 이미지, 바로 이어지는 유형 선택.
Idea (one sentence): 분야에서 목표별 수업으로 바로 이동하는 학원 과정 안내.
Live thing: 14개 독립 세부 경로와 분야가 미리 선택된 상담.
Layout words by section: cover=split / roadmap=columns / teacher=split / careers=columns / enrollment=table / inquiry=form
Scores: design 6.5 · usability 8 · creativity 6 · content 7 → overall 6.9
Caps applied: 동일 사진 반복과 실제 운영 자료 미제공은 남아 있음.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. 최종 전체 페이지: 사진 재사용은 남아 있음. 운영용 실제 과정별 사진 확보 시 교체.
2. 최종 세부 화면: 시간·비용은 분야별 공통 예시. 실제 반별 데이터 확정 필요.
3. 최종 모바일: 새 기능상 겹침·가로 넘침 없음. 제목과 세부 메뉴의 짧은 표기를 유지.
