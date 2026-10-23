# 카드형 콘텐츠 정리 · 2026-10-23

## 적용 기준

- 참고: https://www.mbcbeauty.co.kr/curriculum/special
- 브라우저에서 확인한 구조: 단계명, 대표 이미지, 하위 과정 버튼을 한 카드에 묶은 로드맵.
- 기존 버건디·블러시 팔레트, 2:6:2 데스크톱 프레임, 로고, 메뉴와 경로 유지.
- 신규 브랜드 방향을 추첨하지 않고 요청한 레퍼런스의 카드 컴포넌트 구조를 적용.
- 사용자가 요청한 카드 테두리·반복 그리드는 taste 스킬의 일반적인 카드 최소화 규칙보다 우선.
- 큰 공통 제목 배너나 슬로건을 새로 추가하지 않음.
- 새 이미지 생성·외부 이미지 복제 없이 프로젝트의 분야별 기존 이미지 활용.
- Python 실행기가 없어 ui-ux 검색 데이터베이스는 사용하지 못함. 직접 관찰한 레퍼런스와 일반 가독성·접근성 기준으로 검수.

## 변경 범위

- 교육과정: 분야별 이미지 카드, 핵심 실습·학습 방식, 14개 세부 과정 바로가기, 분야가 유지되는 일정 링크.
- 과정 개요: 수강 대상·이미지·기간·학습 내용을 포함하는 로드맵 카드.
- 세부 과정: 교육 목표, 단계별 커리큘럼, 결과물, 개강일정 구역 구분.
- 강사진·교육환경·수강 가이드·갤러리: 이미지와 설명을 한 영역으로 묶음.
- 국비지원: 안내와 확인 사항 분리, 신청 절차 카드.
- 상담: 준비 정보와 입력 양식 분리. 기존 접수 범위 안내 유지.
- 일정: 날짜·과정·상담 액션 단위로 구분. 필터와 선택 반 전달 기능 유지.
- 홈: 기존 텍스트 중심 전문 교육과정 카드의 여백·대비 개선.
- 관리자·로그인·영상 플레이어는 기존 동작 유지.

## 검수

ROUND 1
Seen in one second: 설명형 목록에서 분야별 선택 카드로 바뀜.
Idea (one sentence): 뷰티랩의 분야·수강 목적·개강 반을 카드 안에서 이어 선택한다.
Live thing: 14개 세부 과정 및 분야별 일정으로 직접 이동.
Layout words by section: catalog=photo cards / roadmap=course cards / curriculum=stages / schedule=dated rows / contact=split panels.
Scores: design 7 · usability 8 · creativity 6 · content 7 → overall 7.1
Caps applied: 레퍼런스형 반복 카드·테두리는 사용자 명시 요구로 유지. 독창적 브랜드 재설계 점수는 낮게 평가.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. 데스크톱 로드맵 사진이 HTML 높이 속성 때문에 길어짐 → height:auto와 일정한 비율 적용.
2. 모바일 카드 내 내용이 좁아짐 → 1열 카드, 44px 이상 과정 버튼, 20–22px 내부 여백.
3. 세부 과정의 제목 구역이 공통 배너처럼 반복될 수 있음 → 색상 박스를 제거하고 기존 정보 제목만 유지.

ROUND 2
Seen in one second: 과정 이미지와 선택 버튼이 명확히 연결됨.
Idea (one sentence): 관심 분야에서 수강 목적과 일정까지 불필요한 목록 왕복 없이 이동한다.
Live thing: 각 카드의 과정 링크·개강일 링크.
Layout words by section: catalog=2-column cards / roadmap=3-column cards / curriculum=2-column stages / assistance=split panels.
Scores: design 7 · usability 8 · creativity 6 · content 7 → overall 7.1
Caps applied: 독립된 아트디렉션보다 요청한 학원형 정보 구성에 맞춤.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. 참고용 생성 이미지와 실제 운영 정보 교체는 별도 운영 준비 사항이며 이번 변경에서 신규 사실을 추가하지 않음.
2. 작은 화면에서는 긴 상세 페이지를 스크롤해야 함. 카드 내 세부 링크로 필요한 경로를 직접 선택 가능.
3. 본문 가독성을 우선하여 장식 모션은 추가하지 않음.

- CUA 실제 브라우저로 17개 경로 × 4개 폭 = 68개 레이아웃 검사: 가로 넘침·가로 버튼 잘림 없음.
- 14개 세부 과정: 서로 다른 제목·커리큘럼·일정 확인.
- 1440px 목록·로드맵·강사·신청 절차 및 390px 목록·상담 화면 시각 검수.
- taste lint: 0 FAIL, 테두리 관련 14 WARN. 테두리는 사용자 요구에 따른 의도적 선택.
- 별도 CDP inspector 대신 현재 CUA 브라우저의 DOM 측정과 스크린샷으로 검증.
- push/배포하지 않음.
