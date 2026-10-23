# 작품 갤러리 이미지 교체

## 변경 범위

메인 ‘수강생 작품’ 3개 카드와 동일 데이터를 사용하는 작품 갤러리·상세페이지에 적용.
교육과정 이미지와 과정 배너는 보존. 피부미용 실습 갤러리 항목은 변경하지 않음.
실제 수강생 작품이 아닌 포트폴리오용 생성 시안이라는 기존 안내를 유지함.

## 생성 방식

내장 image_gen 도구로 각각 신규 생성. CLI/API fallback은 사용하지 않음.
세 이미지 모두 1448×1086, 4:3. 원본은 생성 디렉터리에 보존하고 아래 프로젝트 경로로 복사.

## 최종 파일 및 프롬프트

### makeup

파일: `public/assets/portfolio-makeup.png`

Use case: photorealistic-natural. Create one finished photographic image asset for the student-work gallery of a premium Korean beauty academy portfolio demo. Landscape 4:3 aspect ratio, high resolution. Show the FINISHED BEAUTY WORK as the main subject, not a teacher, classroom, products or tools. Real studio photography, natural material and skin texture, soft diffuse light, understated blush-beige and neutral palette, premium restrained editorial finish. Center the important subject within a 10% safe margin suitable for a 4:3 thumbnail. No text, watermark, logo, collage, frame, illustration, CGI, neon, plastic-looking skin, extreme retouching or artificial gradients. Subject: finished natural bridal makeup on one adult Korean female model, head and shoulders, three-quarter view looking softly towards camera. Face large and clearly visible, refined rose-beige eyeshadow, delicate eyeliner, natural separate lashes, softly flushed cheeks, satin rose lip, realistic skin pores. Hair pulled back in a simple low bun; plain ivory neckline. Plain warm off-white studio wall. Focus on the makeup result; no brushes, artist hands or application action.

### hair

파일: `public/assets/portfolio-hair.png`

Use case: photorealistic-natural. Create one finished photographic image asset for the student-work gallery of a premium Korean beauty academy portfolio demo. Landscape 4:3 aspect ratio, high resolution. Show the FINISHED BEAUTY WORK as the main subject, not a teacher, classroom, products or tools. Real studio photography, natural material and skin texture, soft diffuse light, understated blush-beige and neutral palette, premium restrained editorial finish. Center the important subject within a 10% safe margin suitable for a 4:3 thumbnail. No text, watermark, logo, collage, frame, illustration, CGI, neon, plastic-looking skin, extreme retouching or artificial gradients. Subject: a finished chestnut-brown medium-long layered haircut with softly curved blow-dried ends, photographed from the back at a slight three-quarter angle on one adult female model. Entire hair silhouette from crown to below ends visible, clear layered lengths and separation, natural individual fibers with subtle healthy shine. Plain charcoal salon cape across shoulders, plain warm beige wall. No visible face needed. No scissors, combs, hairdryer, stylist hands, classroom, or treatment action. The finished haircut is unmistakably the focus.

### nail

파일: `public/assets/portfolio-nail.png`

Use case: photorealistic-natural. Create one finished photographic image asset for the student-work gallery of a premium Korean beauty academy portfolio demo. Landscape 4:3 aspect ratio, high resolution. Show the FINISHED BEAUTY WORK as the main subject, not a teacher, classroom, products or tools. Real studio photography, natural material and skin texture, soft diffuse light, understated blush-beige and neutral palette, premium restrained editorial finish. Center the important subject within a 10% safe margin suitable for a 4:3 thumbnail. No text, watermark, logo, collage, frame, illustration, CGI, neon, plastic-looking skin, extreme retouching or artificial gradients. Subject: a completed refined blush-pink gel nail art set photographed close-up on exactly one naturally posed adult hand resting palm-down on matte ivory linen. Exactly five anatomically plausible fingers including the thumb, all five nails visible and in focus, medium-short oval nails. Coordinated dusty rose and sheer blush base, delicate fine burgundy French-tip accent on two nails, one subtle pearl accent nail, clean cuticles, realistic skin and lacquer reflections. Hand and nail art fill central composition. No nail polish bottles, tools, technician hands, extra fingers, jewelry or unrelated props.
