# 메인 배너·교육과정 후속 수정

## 요청과 구현

- 헤더·푸터 로고의 마침표 제거.
- MBC 메인 화면을 다시 열어 배너, 빠른 안내, 분야 선택, 세부 과정, 작품·강사 영역의 배치를 확인했다.
- 기존 1672×941 배너가 1440×480 및 태블릿 460.8×450 영역에서 `cover`로 표시되어 잘리는 것을 재현했다. 원본 비율과 `contain`을 사용하고 모바일에서는 이미지와 문구를 분리했다.
- 전문 교육과정 사진 카드 4개와 목적별 탭을 제거했다. 메이크업·헤어·네일아트·피부미용 선택 아래 국가자격증·살롱 실무·포트폴리오의 텍스트 요약 카드 3개만 표시한다.
- 작품·강사진을 과정 아래로 이동하고, 온라인·지원·패키지 안내를 짧은 가로 영역으로 구성했다. 개강일정·공지·상담 기능은 유지했다.
- 로고·사진·문구를 레퍼런스에서 복제하지 않았으며 기존 뷰티랩 컬러와 생성 이미지 시안을 사용한다. 사진 재사용과 예시 데이터의 한계는 남아 있다.

## 검증

- `npm.cmd test`: 9개 통과.
- `npm.cmd run build`: 성공.
- `node tests/home-layout.mjs before`: 수정 전 로고·배너·카드 불일치 재현.
- `node tests/home-layout.mjs after`: 1440/1024/768/390/320px에서 로고 점 없음, 배너 잘림 없음, 과정 사진 0개·카드 3개·분야 버튼 4개, 가로 넘침 없음, 제목 2줄 이내 확인.
- `node tests/browser-audit.mjs`: 116개 화면 검사 통과, 실행 오류 없음.
- 실제 브라우저에서 헤어 선택 시 설명 변경, 살롱 실무 카드의 `#courses/hair/salon` 이동, 다음 배너 전환과 `contain` 적용 확인.

검증 중 CSS `@import`의 개발 서버 경로 오류를 발견했다. `Home.jsx`에서 직접 CSS를 import하도록 변경하여 해결했다. 지연 로딩 이미지 전체의 decode를 기다리던 테스트도 배너만 기다리도록 수정했다.

## 시각 검토

결과: [메인 전체 화면](../artifacts/home-revision-final/desktop-page-01.jpg), [모바일](../artifacts/home-revision-final/mobile-page-01.jpg), [회귀검사 수치](../artifacts/home-revision-after/results.json).

시각 검사 도구는 사용자 요구에 따른 예외 적용 후 FAIL 0개, WARN 7개다. 테두리 카드(outlined-box), 메뉴/게시판 구분선(hairline), 실제 달력 날짜(numbering/eyebrow 오탐), 메타데이터 크기(body-size), 절제된 움직임(still-page)을 예외로 명시했다. 정적 스타일 검사에서는 구분선 8개 FAIL, 카드 테두리 WARN 1개가 남으며 기능 오류를 뜻하지 않는다.

남은 경고는 글자 크기 단계 수, 보조 텍스트 대비 5.2:1, 실제 영상 부재, 긴 푸터 고지, 한국어 제목 분류, 카드 내부 들여쓰기, 반복 카드 배치다. 테두리와 카드 구성은 이번 사용자 요청을 우선하여 유지했다. 시각 검사를 모두 무조건 통과했다고 해석하면 안 된다.

ROUND 2

Seen in one second: 머리가 잘리지 않는 모집 이미지와 11월 자격증반 안내.

Idea (one sentence): 분야를 먼저 고르고 세부 과정을 바로 비교하는 학원 안내 화면.

Live thing: 분야 버튼을 누르면 요약 카드 3개와 상세 링크가 함께 바뀜.

Layout words by section: hero=full-width / shortcuts=row / courses=text cards / work=gallery / instructors=portraits / services=strip / notices=two columns / contact=form.

Scores: design 7 · usability 8 · creativity 5 · content 6 → overall 6.5 (자체 평가, 외부 평가 아님).

Caps applied: 사용자 지정 테두리 카드·구분선, 레퍼런스를 따르는 일반적인 학원 구성. 독창성보다 요청한 구조와 동작을 우선.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. before/1440.jpg: 인물 머리와 이미지 하단이 잘림 → 원본 비율과 contain으로 수정.
2. before/390.jpg: 전문 교육과정이 큰 사진 위주 → 분야별 텍스트 카드로 수정.
3. final/desktop-page-01.jpg: 작품과 강사에 동일 생성 이미지 재사용 → 실제 운영 자료가 없으므로 예시 표시 유지. 실제 작품·강사 사진 확보 후 교체 필요.
