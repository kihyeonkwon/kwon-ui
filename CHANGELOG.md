# 바뀐 것

## 0.2.0 (2026-11-16)

스킬캠퍼스에 넣으면서 앱이 덧붙여 쓰던 여섯 가지를 올렸다. 없어진 이름은 없다.

더한 것

- 선으로 시작하는 구간: `.n-sect.ruled`, `<Section rule>`. 앞 구간과의 사이에 가는 선을 내용 폭만큼 긋는다.
- 짧은 구간: `.n-sect.slim`, `<Section slim>`. 문장 하나와 버튼 하나뿐인 줄. 위아래 64px, 넓은 화면 80px.
- 본문 안의 진한 낱말: `.hi`, `hi()`, `<Body line>`. `n-body`와 `n-small` 안에서 색만 올린다. 굵기는 그대로다.
- 사진 판: `.n-photo`, `.n-photo-in`, `<PhotoPanel>`. 어둡게 누른 사진 위 왼쪽 아래에 글을 둔다.
- 토큰 셋(모두 30개): `--n-shade`, `--n-shade-soft`(사진 위의 그늘), `--n-on-photo`(사진 위에서 받쳐 주는 말).

바뀐 값

- 줄 목록 `.n-row`: 라벨과 본문의 첫 줄 밑선을 맞춘다(`align-items: baseline`). 본문 칸은 `minmax(0, 1fr)`이라 긴 낱말이 칸을 밀지 않는다.
- 글자 링크 `.n-link`: 줄 높이를 1.6으로 정했다. 앱의 바탕 줄 높이를 물려받아 앱마다 높이가 달랐다(홈페이지 24px, 스킬캠퍼스 24.75px).

근거

- 구간 선: 스킬캠퍼스 세 페이지의 구간 17곳. Projects 랜딩에도 같은 자리에 선이 있다(그쪽은 선이 바깥 여백까지 닿는다).
- 짧은 구간: 스킬캠퍼스 세 페이지의 구간 5곳.
- 줄 목록: 스킬캠퍼스와 Projects 랜딩이 둘 다 밑선 맞춤과 `minmax(0, 1fr)`을 덧붙여 쓰고 있었다.
- 진한 낱말: 연도별 이력의 기관 이름. 홈페이지는 유틸리티(`text-white`)로, 스킬캠퍼스는 `b`에 규칙을 덧붙여 쓰고 있었다.
- 사진 판: 홈페이지의 교육 문의 판(`.n-closing`)과 스킬캠퍼스의 강사 판. 그늘, 사진을 누르는 정도, 안쪽 여백, 넓은 화면 높이(560px)는 두 곳이 같다. 두 곳이 다른 값은 스킬캠퍼스 쪽을 따랐다: 좁은 화면 높이 480px, 제목과 문단 사이 16px, 사진 위 회색 글자 62%.

확인

- 스킬캠퍼스 공개 네 페이지를 0.1.0과 0.2.0에서 요소별로 대조했다(화면 폭 390·768·1024·1440). 앱의 덧붙임을 지우고도 세 페이지는 차이가 없고, 한 페이지에서 글자 링크 두 곳의 높이만 1px 줄었다. 사진 판은 픽셀이 같다.
- 홈페이지 원본 CSS와 계산된 스타일을 대조했다. 넣을 때 달라지는 값은 `claude/ADOPTING.md`의 '넣을 때 알아 둘 차이'에 적었다.

## 0.1.0 (2026-11-16)

첫 판. kwonandcompany.com 밤 테마에서 여러 화면이 같이 쓰는 핵심만 값 그대로 옮겼다.

- 토큰 27개: 바탕과 면, 글자 네 톤, 버튼, 글자 크기(display, title, body, small, control), 모서리, 폭과 바깥 여백.
- 글자: `n-display`, `n-title`(두 톤 `lo`, `lo-inline`), `n-body`, `n-card-title`, `n-small`, `n-num`.
- 뼈대: `n-wrap`, `n-page`, `n-page-head`, `n-sect`, `n-rule`, `n-head`, `n-rows`, `n-row`, `n-row-label`, `n-panel`, `n-media`, `n-cta-band`, `n-timeline`, `n-tl-year`, `n-tl-more`.
- 조작부: `n-pill`(`ghost`), `n-link`.
- 컴포넌트 17개: `Display`, `Title`, `Body`, `CardTitle`, `Small`, `Page`, `PageHead`, `Section`, `SectionHead`, `Rows`, `Row`, `Panel`, `Media`, `CtaBand`, `Pill`, `TextLink`, `Actions`. 그리고 `tone()`.
- 검사기 `kwon-ui check`(기준선 방식), Claude Code 훅 `claude/hook.mjs`.

근거와 확인

- 범위는 사용 수로 정했다. 홈페이지에서 `n-` 조각을 쓰는 TSX 45개 파일 가운데 `n-small`은 25개, `n-wrap` 24개, `n-body` 22개, `n-title` 21개, `n-head`와 `n-link` 18개, `n-pill` 15개 파일이 쓴다. 여러 화면이 쓰는 이름과, 다른 제품(스킬캠퍼스, Projects 랜딩)에도 있는 이름을 먼저 담았다.
- 같은 마크업에 홈페이지 원본 CSS와 이 패키지의 CSS를 각각 입혀 계산된 스타일을 대조했다(요소 38개, 속성 47개, 화면 폭 390·768·1024·1440). 다른 것은 줄바꿈 규칙 둘뿐이다: `word-break: keep-all`과 `text-wrap: balance`·`pretty`. 홈페이지는 같은 규칙을 전역 CSS에서 이미 준다.

홈페이지에 없던 이름(되풀이되던 조합에 이름을 붙였다. 값은 같다)

- `.n-head.ruled`: `n-head n-rule pt-12 md:pt-16`을 28곳에서 손으로 쓰던 것.
- `.n-actions`: 버튼과 글자 링크를 나란히 놓던 `flex flex-wrap items-center gap-x-8 gap-y-4`(18곳).
- `Rows`, `Row`: 네 페이지가 저마다 따로 정의해 쓰던 줄 목록 컴포넌트.
- `.n-sr`: 두 톤 제목 앞의 화면 낭독용 구간 이름(Tailwind `sr-only` 대신).
- `.n-page-head > .n-head`의 아래 여백 0, `.n-cta-band .n-title + .n-body`의 위 여백과 최대 폭: 인라인 스타일과 유틸리티로 쓰던 값.
- 글자 크기, 버튼 색, 모서리, 내용 폭 토큰: CSS에 직접 적혀 있던 값.

아직 담지 않은 것

- 떠 있는 메뉴(세 제품에 다 있지만 제품마다 링크와 동작이 다르다), 첫 화면, 탭, 읽는 페이지(흰 바탕) 조각.
- 한 제품에서만 쓰는 조각: 그 앱에 둔다.
