# 배너 높이와 공통 여백 조정

- 1280px 이상: 공통 `.wrap` 너비 60vw, 좌우 여백 각 20vw. 헤더·배너·본문·하위 메뉴·푸터에 동일 적용.
- 601~1279px: 좌우 24px, 600px 이하: 좌우 18px. 모바일 가독성을 위해 60% 폭을 강제하지 않음.
- 배너는 원본 전체가 보이는 `object-fit: contain` 유지. PC 높이를 최대 560px 및 화면 높이 기준으로 제한.
- 모바일 배너 이미지 높이 제한, 과정명 버튼 2개와 이전·다음 버튼을 두 줄로 표시. 기존 과정명 버튼 숨김 규칙 제거.
- 공통 본문이 좁아지는 것을 고려해 중간 크기 레이아웃 규칙을 1599px 이하에 적용.
- 메뉴·과정 데이터·기능·색상 변경 없음.

## 검증

실행 중인 localhost:5174 기준:

- `node tests/responsive-spacing.mjs`: 9개 화면 크기에서 배너 버튼 노출, 2:6:2 비율, 이전·다음·과정명 전환 확인.
- `node tests/browser-audit.mjs`: 29개 페이지 × 6개 화면 폭 = 174개 렌더링 검사. PC 공통 컨테이너 정렬, 가로 넘침, 제목 줄바꿈, 런타임 오류 확인.
- `npm.cmd test`, `npm.cmd run build`.

스크린샷 및 수치 기록: `artifacts/responsive-spacing-before/`, `artifacts/responsive-spacing-after/`, `artifacts/pages/`.
