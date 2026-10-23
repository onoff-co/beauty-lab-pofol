// Public lessons observed on the creator's YouTube listings, 2026-10-23.
// Videos remain on YouTube; no copies, invented durations or academy ownership claims.
export const onlineLessons = [
  {id:'makeup-concept',course:'makeup',title:'메이크업의 개념',videoId:'dqo4qUJwm-E',duration:'7:14',sourceTitle:'[에듀웨이] 기분파 메이크업 자격증(필기) 1강 - 메이크업의 개념',summary:'메이크업 필기 공부를 시작하기 전, 분야의 기본 개념을 살펴보는 공개 이론 강의입니다.'},
  {id:'makeup-history',course:'makeup',title:'메이크업의 역사',videoId:'Qgqom5qJeGc',duration:'10:43',sourceTitle:'[에듀웨이] 기분파 메이크업 자격증(필기) 2강 - 메이크업의 역사',summary:'메이크업의 역사적 흐름을 학습하는 두 번째 이론 강의입니다. 시청 후 시대별 특징을 정리해보세요.'},
  {id:'hair-intro',course:'hair',title:'헤어미용 총론 1',videoId:'ICu6xkNxCuU',duration:'24:18',sourceTitle:'에듀웨이 기분파 헤어미용 필기자격증 1강 (헤어미용 총론)',summary:'헤어미용 필기 이론의 기본 내용을 다루는 첫 강의입니다. 실습 전 이해할 용어를 노트에 정리해보세요.'},
  {id:'hair-foundations',course:'hair',title:'미용 총론 2',videoId:'_k8gkTFZ71U',duration:'26:53',sourceTitle:'에듀웨이 기분파 헤어미용 필기 자격증 2강 (미용 총론)',summary:'첫 강의에 이어 미용 총론을 학습합니다. 이전 단원의 용어와 연결해 복습할 수 있습니다.'},
  {id:'nail-history',course:'nail',title:'네일미용의 역사',videoId:'l7vUzqMYNFg',duration:'6:15',sourceTitle:'[에듀웨이] 기분파 네일미용 자격증 [필기] 1강 - 네일미용의역사',summary:'네일미용 이론 입문을 위한 역사 강의입니다. 짧은 단위로 시청하고 주요 흐름을 기록해보세요.'},
  {id:'nail-service',course:'nail',title:'네일미용 위생 서비스',videoId:'ARoOMusbWS0',duration:'19:59',sourceTitle:'[에듀웨이] 기분파 네일미용 자격증 [필기] 2강 - 네일미용 위생 서비스',summary:'네일미용의 위생 서비스에 관한 공개 강의입니다. 현재 적용되는 법규와 시험 기준은 공식 자료를 별도로 확인하세요.'},
  {id:'skin-intro',course:'skin',title:'피부미용의 이해',videoId:'Y3_Z8NHb8w8',duration:'12:34',sourceTitle:'[에듀웨이] 기분파 피부미용 자격증(필기) 1강 - 피부미용의 이해',summary:'피부미용 분야를 처음 공부하는 분을 위한 기초 이론 강의입니다. 치료·의료 목적의 안내가 아닌 학습 참고 자료입니다.'},
  {id:'skin-consultation',course:'skin',title:'피부분석과 고객상담',videoId:'IR-gJQpmBtU',duration:'12:58',sourceTitle:'[에듀웨이] 기분파 피부미용 자격증(필기) 2강 - 피부분석과 고객상담',summary:'피부미용 상담과 분석의 학습 항목을 살펴보는 강의입니다. 실습 수업에서 사용할 질문을 정리해보세요.'},
].map(lesson=>({...lesson,creator:'미용관 · 에듀웨이 기분파',url:`https://www.youtube.com/watch?v=${lesson.videoId}`,thumbnail:`https://i.ytimg.com/vi/${lesson.videoId}/hqdefault.jpg`}));
export const lessonsForCourse = course => onlineLessons.filter(lesson=>lesson.course===course);
export const onlineLessonById = id => onlineLessons.find(lesson=>lesson.id===id);
