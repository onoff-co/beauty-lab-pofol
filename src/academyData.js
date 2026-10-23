import { assetUrl } from './assets.js';
// Portfolio fixtures, not an operating academy's fees, personnel or results.
export const courses = [
  {id:'makeup', category:'메이크업', english:'Makeup', title:'메이크업 아티스트', image:'/assets/course-makeup.png', banner:'/assets/banner-makeup.png', weeks:12, fee:1200000, kit:250000, teacher:'정다은', days:'월·수 18:30–21:30', date:'2026-11-09',
    description:'피부 표현부터 아이 메이크업, 웨딩과 촬영 메이크업까지. 얼굴의 비율과 색채를 이해하고 룩을 완성하는 수업입니다.',
    topics:['피부 표현과 베이스','아이·립 메이크업','웨딩·뷰티 메이크업','촬영 포트폴리오'],
    curriculum:[['1–3주','기초와 도구','위생 관리, 브러시 사용, 피부 타입에 맞는 베이스'],['4–6주','자격증 실기','뷰티 메이크업 유형별 표현과 과제 연습'],['7–9주','살롱 응용','웨딩·트렌드 메이크업, 고객 상담과 룩 제안'],['10–12주','작품 완성','모의 실기, 촬영 시안, 개인 작품 피드백']]},
  {id:'hair', category:'헤어', english:'Hair', title:'헤어디자인', image:'/assets/course-hair.png', banner:'/assets/banner-hair.png', weeks:12, fee:1380000, kit:300000, teacher:'김서진', days:'화·목 19:00–22:00', date:'2026-11-03',
    description:'샴푸와 커트의 기본 자세부터 펌, 컬러, 스타일링까지. 반복 실습과 개별 교정으로 미용사(일반) 자격증과 살롱 실무를 준비합니다.',
    topics:['두피·모발과 샴푸','베이직 커트','펌·컬러 테크닉','드라이와 스타일링'],
    curriculum:[['1–3주','기본기','도구 관리, 두피·모발 이론, 샴푸와 블로 드라이'],['4–6주','커트','원랭스, 그래듀에이션, 레이어의 기본 형태'],['7–9주','펌과 컬러','와인딩, 색채 기초, 염색 도포 연습'],['10–12주','실전 연습','과제별 시간 배분, 모의 실기, 살롱 스타일링']]},
  {id:'nail', category:'네일아트', english:'Nail', title:'네일아트 디자인', image:'/assets/course-nail.png', banner:'/assets/banner-nail.png', weeks:10, fee:1050000, kit:220000, teacher:'박채원', days:'토 10:00–16:00', date:'2026-11-07',
    description:'손발톱 관리와 컬러링부터 젤 아트까지. 위생적인 시술 순서를 익히고 디자인 샘플을 직접 제작합니다.',
    topics:['매니큐어·페디큐어','젤 컬러와 프렌치','인조 네일과 연장','네일 디자인 샘플'],
    curriculum:[['1–2주','케어','손발톱 구조, 위생 관리, 기본 케어'],['3–5주','컬러링','풀 코트, 프렌치, 그라데이션 실습'],['6–8주','연장과 아트','팁, 실크, 젤 연장과 디자인'],['9–10주','모의 실기','과제 수행, 제거, 디자인북 정리']]},
  {id:'skin', category:'피부미용', english:'Esthetic', title:'피부미용 에스테틱', image:'/assets/course-skin.png', banner:'/assets/banner-skin.png', weeks:12, fee:1260000, kit:180000, teacher:'이하윤', days:'화·목 14:00–17:00', date:'2026-11-10',
    description:'피부 분석과 위생 관리, 얼굴·바디 관리의 기본 동작을 학습합니다. 상담 기록부터 관리 계획까지 실습으로 연결합니다.',
    topics:['피부 분석과 상담','클렌징·딥클렌징','얼굴·바디 매뉴얼','팩·마스크와 마무리'],
    curriculum:[['1–3주','기초 이론','피부 구조, 위생, 도구 준비와 상담 기록'],['4–6주','얼굴 관리','클렌징, 매뉴얼 테크닉, 팩과 마스크'],['7–9주','바디 관리','팔·다리 관리 순서, 자세와 압 조절'],['10–12주','관리 설계','과제별 모의 실기, 관리 계획과 피드백']]},
  {id:'extension', category:'붙임머리', english:'Extensions', title:'붙임머리 살롱 실무', image:'/assets/course-extension.png', banner:'/assets/banner-extension.png', weeks:6, fee:780000, kit:240000, teacher:'김서진', days:'일 13:00–17:00', date:'2026-11-15',
    description:'모발 상태 확인부터 컬러 매칭, 섹션 분할, 부착과 제거까지. 고객의 생활 습관에 맞는 유지 관리 안내를 함께 연습합니다.',
    topics:['모발 상태 확인','섹션과 컬러 매칭','부착·제거 실습','리터치와 사후 관리'],
    curriculum:[['1주','상담','모발 상태, 시술 주의점, 재료 이해'],['2–3주','부착 기초','섹션 분할, 장력과 간격, 부착 연습'],['4–5주','응용 시술','길이·볼륨 설계, 컬러 매칭, 리터치'],['6주','완성','제거와 마무리 커트, 홈케어 안내']]},
].map(course => ({ ...course, image: assetUrl(course.image), banner: assetUrl(course.banner) }));
export const courseById = id => courses.find(course => course.id === id);
export const money = value => `${value.toLocaleString('ko-KR')}원`;
export const tracks = [
  {id:'certificate',name:'국가자격증',text:'필기 이론과 실기 과제별 연습, 모의 테스트로 구성합니다.'},
  {id:'salon',name:'살롱 실무',text:'고객 상담, 디자인 제안, 시술 순서를 실습합니다.'},
  {id:'portfolio',name:'포트폴리오',text:'레퍼런스 분석, 시안 제작, 작품 촬영과 피드백을 진행합니다.'},
];
export const navigation = [
  {label:'학원소개',route:'about',children:[['학원소개','about'],['강사진','about/instructors'],['교육환경','about/facilities']]},
  {label:'교육과정',route:'courses',children:courses.map(c=>[c.category,`courses/${c.id}`])},
  {label:'온라인 강의',route:'online',children:[['자격증 이론','online'],['나의 강의실','classroom'],['강의 자료실','classroom/materials'],['출석·수강 이력','classroom/history']]},
  {label:'개강일정',route:'schedule',children:[['전체 일정','schedule'],['평일반','schedule/weekday'],['주말반','schedule/weekend']]},
  {label:'국비지원',route:'support',children:[['지원제도 안내','support'],['과정·수강료','support/courses'],['신청 절차','support/process']]},
  {label:'커뮤니티',route:'community/notices',children:[['공지사항','community/notices'],['작품 갤러리','community/portfolio'],['수강 이야기','community/stories']]},
  {label:'상담예약',route:'contact',children:[['과정 상담','contact'],['방문 상담','contact/visit'],['수강료 문의','contact/tuition']]},
];
export const teachers = [
  {name:'정다은',course:'makeup',role:'메이크업 교육',specialty:'뷰티 메이크업 / 촬영 룩',method:'얼굴 비율을 분석하고 베이스와 색조를 단계별로 교정합니다.'},
  {name:'김서진',course:'hair',role:'헤어 교육',specialty:'베이직 커트 / 살롱 디자인',method:'커트의 각도와 자세를 확인하고 실습 결과를 함께 비교합니다.'},
  {name:'박채원',course:'nail',role:'네일아트 교육',specialty:'네일 케어 / 젤 디자인',method:'시술의 정확도와 위생적인 도구 사용을 함께 지도합니다.'},
  {name:'이하윤',course:'skin',role:'피부미용 교육',specialty:'에스테틱 / 고객 상담',method:'관리 순서와 손의 압을 점검하고 상담 기록을 피드백합니다.'},
];
export const noticesSeed = [
  {id:'november',title:'11월 자격증·실무반 개강 안내',date:'2026-10-23',category:'모집',body:'11월 헤어, 메이크업, 네일아트, 피부미용 신규반을 안내합니다. 과정별 수업 시간은 개강일정에서 확인할 수 있습니다.\n\n처음 배우는 분은 기초반, 자격증 취득 후 실무를 준비하는 분은 살롱 실무반을 선택해주세요. 수업 준비물과 재료비는 과정 상세에 안내되어 있습니다.\n\n이 공지는 포트폴리오 시연을 위한 예시이며 실제 모집 공고가 아닙니다.'},
  {id:'theory',title:'온라인 이론 수업 이용 안내',date:'2026-10-20',category:'학습',body:'온라인 강의에서 관심 과정을 선택한 뒤 데모 수강 신청을 진행해주세요. 나의 강의실에서 학습 자료를 읽고 학습 완료를 기록할 수 있습니다.\n\n현재 제공되는 콘텐츠는 텍스트 학습 예시입니다. 실제 강의 영상과 수료증 발급은 연결되어 있지 않습니다.'},
  {id:'portfolio-day',title:'11월 포트폴리오 촬영 실습 안내',date:'2026-10-15',category:'실습',body:'작품 시안, 준비물 목록, 촬영 참고 이미지를 먼저 정리해주세요. 실습 후에는 완성 사진과 제작 과정을 함께 기록합니다.\n\n예시 실습 일정: 2026년 11월 21일, 13:00–16:00. 인물 촬영과 작품 공개에는 별도의 동의가 필요합니다.'},
];
export const lessons = [
  {id:'hygiene',title:'위생과 작업 준비',minutes:15, paragraphs:['미용 실습 전에는 작업대와 도구를 정리하고 손을 씻습니다. 사용 전·후 도구를 구분하여 교차 오염을 줄이는 것이 첫 단계입니다.','일회용품과 재사용 도구를 나눠 관리합니다. 소독제는 제품에 표시된 사용법과 주의사항을 따르고, 환기와 보관 상태를 확인합니다.','실습 체크: 작업대 정리, 손 위생, 도구 점검, 개인 보호용품 준비 순서를 자신의 말로 설명해보세요.']},
  {id:'consultation',title:'고객 상담과 기록',minutes:20,paragraphs:['상담은 원하는 디자인뿐 아니라 이전 시술 경험, 불편했던 점, 평소 관리 습관을 확인하는 과정입니다. 필요한 정보만 질문하고 동의 없이 기록을 공유하지 않습니다.','원하는 결과를 사진과 언어로 구체화합니다. 시술의 범위와 한계를 설명하고 시간, 비용, 유지 관리 방법을 미리 확인합니다.','실습 과제: 첫 방문 고객을 가정해 다섯 가지 질문을 작성하고 상담 기록 양식을 만들어보세요.']},
  {id:'color',title:'색채와 디자인 기초',minutes:18,paragraphs:['색을 설명할 때는 색상, 명도, 채도를 구분합니다. 같은 색상도 밝기와 선명도에 따라 인상이 달라집니다.','실내 조명과 자연광 아래에서 색을 비교하고, 대상의 바탕색과 주변 색이 결과에 미치는 영향을 관찰합니다.','실습 과제: 유사색으로 구성한 조합과 대비를 활용한 조합을 각각 하나씩 제작하고 선택 이유를 기록해보세요.']},
  {id:'review',title:'실습 계획과 복습',minutes:12,paragraphs:['실습 목표를 하나 정하고 준비, 수행, 정리 시간을 나눕니다. 과제의 결과만이 아니라 도구 사용과 작업 순서도 기록합니다.','완료 후에는 잘된 점과 다시 연습할 점을 구분합니다. 다음 수업에서는 교정할 동작 한 가지에 집중합니다.','복습 질문: 오늘 실습에서 시간을 가장 많이 사용한 단계는 무엇이며, 다음에는 어떤 순서로 연습할 계획인가요?']},
];
export const portfolio = courses.slice(0,4).map((c,i)=>({id:c.id,category:c.category,image:i<3?assetUrl(`/assets/portfolio-${c.id}.png`):c.image,title:['내추럴 웨딩 룩','레이어 커트 스타일링','블러시 컬러 네일','에스테틱 관리 실습'][i],description:['피부 표현과 색조 밸런스를 연습하는 메이크업 작품 예시입니다.','레이어의 연결과 드라이 흐름을 확인하는 헤어 디자인 예시입니다.','톤온톤 컬러 조합과 정돈된 라인을 연습하는 네일 디자인 예시입니다.','관리 동선과 정확한 자세를 학습하는 피부미용 실습 예시입니다.'][i]}));
