# Beauty Lab Academy

독립 미용학원 웹사이트 포트폴리오. React + Vite로 구성하며 `closefit` 쇼핑몰과 별개입니다.

## 실행

Node.js 24 이상에서 의존성을 먼저 설치합니다.

```powershell
npm.cmd ci
npm.cmd run dev -- --host 127.0.0.1 --port 5174 --strictPort
npm.cmd test
npm.cmd run build
```

확인 주소: http://localhost:5174/

## 공개 사이트와 배포

- 사이트: https://onoff-co.github.io/beauty-lab-pofol/
- 저장소: https://github.com/onoff-co/beauty-lab-pofol
- 설명: 뷰티학원 프로젝트 사이트
- `main`에 push하면 GitHub Actions에서 의존성 설치, 테스트, 보안 감사, 빌드를 통과한 뒤 GitHub Pages에 배포합니다.
- Pages 설정의 Source는 **GitHub Actions**입니다. 별도 서버나 비밀키가 필요하지 않습니다.
- 배포 이미지는 `assetUrl()`로 `/beauty-lab-pofol/` 아래에서 읽으며, 로컬 개발은 기존 `/` 주소를 유지합니다.
- 배포 빌드 확인: `npm.cmd run build` 후 `npm.cmd run preview`, 표시된 `/beauty-lab-pofol/` 주소로 접속합니다.
- 문제 발생 시 원인 커밋을 `git revert <commit>`로 되돌리고 `main`에 push하면 재배포됩니다.
- `tests/*.test.mjs`는 독립 실행 가능하며 CI 대상입니다. 나머지 브라우저 점검 스크립트는 원래 포트폴리오 작업공간의 CDP 도구가 필요한 로컬 보조 자료입니다.

배포 설정은 [Vite GitHub Pages 안내](https://vite.dev/guide/static-deploy.html#github-pages)를 따릅니다. 공개 사이트 역시 아래에 기재한 포트폴리오 데모이며 실제 학원 운영 서비스가 아닙니다.

## 구현 범위

- 학원소개, 강사진, 분야별 교육환경
- 메이크업·헤어·네일·피부미용·붙임머리 상세 과정
- 자격증·실무·포트폴리오 구분, 커리큘럼, 기간·비용 예시
- 온라인 이론 영상 8개: 분야별 목록·검색, 출처가 표시된 YouTube 플레이어, 강의 목차·이전/다음 강의
- 데모 회원등록·계정 선택, 계정별 진도와 학습 이력
- Markdown 학습 자료 다운로드
- 개강일정 분야·목적·월·평일/주말 필터, 14개 반별 상세, 선택 반을 유지한 상담
- 국비지원 안내, 신청 절차, 일반 과정 비용 예시
- 공지 검색·상세, 작품 갤러리 필터·상세, 가상 수강 사례
- 과정·방문·수강료 상담 폼, 필수값 검증, 데모 접수
- 관리자: 상담 상태/삭제, 회원 상태/삭제, 공지 등록/수정/삭제
- 상담 모달, 스타터 패키지 팝업
- 동일 열에 정렬된 메가메뉴, 모바일 아코디언 메뉴

## 주소와 소스

주요 주소: `#courses/hair`, `#courses/hair/salon`, `#online`, `#schedule/weekend`, `#support`, `#community/notices`, `#contact/visit`, `#account/login`, `#classroom`, `#admin`

메뉴·예시 데이터는 `src/academyData.js`, 경로 정규화는 `src/domain.js`, 페이지별 구성은 `src/pages/`, 공통 스타일은 `src/platform.css`에서 관리합니다.

## 데모 제한

데이터는 현재 탭의 React 상태에만 보관되며 새로고침하면 초기화됩니다. 실제 개인정보를 입력하지 마세요. 서버 전송, 이메일 발송, 실제 예약·결제는 없습니다.

로그인은 인증이 아닌 체험 계정 선택 기능입니다. 관리자는 공개 미리보기입니다. 운영 시 서버 인증·권한 검증, DB, 개인정보 동의 및 보관/삭제 정책, 폼 전송 API가 필요합니다.

공개 강의는 YouTube 외부 플레이어로 제공합니다. 영상 저작권은 원저작자에게 있으며 뷰티랩 자체 강의가 아닙니다. 클릭 전에는 플레이어를 불러오지 않습니다(목록의 썸네일은 YouTube에서 로드). 로그인 없이 열람할 수 있고 데모 로그인 시 자율 학습 기록을 남깁니다. 공식 출석·수료증은 제공하지 않습니다.

과정·비용·강사·일정·후기는 가상 예시입니다. 국비 승인이나 특정 지원 금액을 주장하지 않습니다. 이미지는 AI 생성 시안이며 실제 학생 작품·시설 사진으로 표시하지 않습니다.

설계와 검증 내용: [변경 기록](docs/2026-10-23-redesign.md)

이용 동선·영상 출처·검증: [2026-10-23 동선 개편](docs/2026-10-23-learning-journey.md)

생성 이미지 26장의 용도·프롬프트: [이미지 기록](docs/media-generation-manifest.json). 일정/세부 과정에는 반복 이미지 배너를 넣지 않습니다.
