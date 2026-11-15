# kwon-ui 카탈로그

버전 0.1.0. 이 파일은 `npm run build` 가 `src/catalog/manifest.tsx` 에서 만든다. 직접 고치지 않는다.

화면을 만들기 전에 이 목록에서 고른다. 여기 없는 조각이 필요하면 페이지에서 새로 만들지 않고, kwon-ui 에 추가를 제안한다.

## 쓰는 법

```tsx
import "kwon-ui/kwon-ui.css"; // 앱의 레이아웃에서 한 번
import { Page, PageHead, Section, SectionHead, Rows, Row, Pill, TextLink } from "kwon-ui";
```

- 페이지 맨 바깥에 `.night` 가 있어야 한다(`<Page>` 가 붙인다).
- 색, 글자 크기, 모서리, 폭은 토큰(`var(--n-…)`)으로만 쓴다. 값을 직접 쓰지 않는다.
- 링크는 `as` 로 프레임워크의 링크 컴포넌트를 넘긴다: `<Pill as={Link} href="/contact">`.
- 조각에는 바깥 여백(margin)이 없다. 조각 사이 간격은 앱에서 준다.
- 제목은 `"**진한 낱말** 나머지"` 꼴의 한 줄로 쓴다. 진한 글자는 핵심 낱말 한두 개에만 준다.

## 한눈에

| 조각 | 컴포넌트 | 클래스 | 언제 |
|---|---|---|---|
| 첫 화면 제목 | `<Display>` | `.n-display` | 첫 화면의 제목. 한 페이지에 한 번만 씁니다. |
| 구간 제목 | `<Title>` | `.n-title` | 구간과 페이지의 제목. 한 문장 한 줄로 쓰고, ** 로 감싼 핵심 낱말 한두 개만 진하게 둡니다. |
| 본문 | `<Body>` | `.n-body` | 읽는 문단. 한 구간에 한두 문단까지 둡니다. |
| 작은 제목 | `<CardTitle>` | `.n-card-title` | 목록 줄이나 카드 안의 제목. 본문과 같은 크기이고 진한 글자입니다. |
| 작은 글 | `<Small>` | `.n-small` | 캡션, 기준, 라벨. 숫자 폭을 맞춰야 하면 num 을 줍니다. |
| 페이지와 페이지 머리 | `<Page>` `<PageHead>` | `.n-page` | 하위 페이지의 맨 바깥과 머리. 제목 한 줄, 문단 하나, 버튼 줄로 시작합니다. |
| 구간 | `<Section>` | `.n-sect` | 페이지를 이루는 구간 하나. 위아래 여백(넓은 화면 128/96px)과 내용 폭을 줍니다. |
| 구간 머리 | `<SectionHead>` | `.n-head` | 구간의 시작. 왼쪽에 한 줄 제목, 오른쪽에 본문. rule 을 주면 가는 선 아래에서 시작합니다. |
| 가는 선 | (클래스만) | `.n-rule` | 내용 위에 가는 선 하나를 긋습니다. 구간 머리의 선은 SectionHead 의 rule 로 긋습니다. |
| 줄 목록 | `<Rows>` `<Row>` | `.n-rows` | 항목이 여럿일 때. 왼쪽 200px 에 작은 라벨, 오른쪽에 본문 한 칸. |
| 검은 판 | `<Panel>` | `.n-panel` | 앞뒤 구간과 구분해야 하는 구간 하나(후기, 수강료처럼). 한 페이지에 두세 번까지. |
| 그림 틀 | `<Media>` | `.n-media` | 그림과 영상을 담는 틀. 기본 4:3, wide 는 16:9. 안의 img, video 가 틀을 채웁니다. |
| 연도별 이력 | (클래스만) | `.n-timeline` | 해마다 쌓인 이력. 왼쪽에 연도, 오른쪽에 그 해의 줄들. 많으면 앞의 몇 줄만 보이고 '외 N건'으로 접습니다. |
| 문의 띠 | `<CtaBand>` | `.n-cta-band` | 페이지 끝의 마지막 행동. 왼쪽에 한 줄 문장, 오른쪽에 버튼 줄. 한 페이지에 하나. |
| 알약 버튼 | `<Pill>` | `.n-pill` | 한 화면의 주 행동 하나. 높이 48px. ghost 는 어두운 면(둘째 행동이 꼭 버튼이어야 할 때). |
| 글자 링크 | `<TextLink>` | `.n-link` | 버튼 옆의 둘째 행동, 본문 아래의 '더 보기'. arrow 를 주면 끝에 화살표가 붙습니다. |
| 버튼 줄 | `<Actions>` | `.n-actions` | 버튼과 글자 링크를 나란히 놓는 줄. 버튼 하나와 링크 하나까지. |

## 글자

읽는 글자 크기는 셋입니다. 제목, 본문, 작은 글. 위계는 굵기 대신 진한 글자와 회색 두 톤으로 만듭니다.

### 첫 화면 제목

`<Display>` · `.n-display`

첫 화면의 제목. 한 페이지에 한 번만 씁니다. 구간 제목에는 쓰지 않습니다(Title).

```tsx
<Display line="**기술과 사람** 사이를 공부합니다" />
```

### 구간 제목

`<Title>` · `.n-title` `.lo-inline`

구간과 페이지의 제목. 한 문장 한 줄로 쓰고, ** 로 감싼 핵심 낱말 한두 개만 진하게 둡니다. 제목과 부제를 두 줄로 쌓지 않습니다. 숫자는 숫자가 요점일 때만 진하게 둡니다.

```tsx
<Title line="**문헌 조사**부터 **논문 작성**까지 다룹니다" label="교육 내용" />
```

### 본문

`<Body>` · `.n-body`

읽는 문단. 한 구간에 한두 문단까지 둡니다.

```tsx
<Body>현재 업무와 자료를 함께 살펴보고 먼저 만들 것을 정합니다.</Body>
```

### 작은 제목

`<CardTitle>` · `.n-card-title`

목록 줄이나 카드 안의 제목. 본문과 같은 크기이고 진한 글자입니다.

```tsx
<CardTitle>임원 AI 워크숍</CardTitle>
```

### 작은 글

`<Small>` · `.n-small` `.n-num`

캡션, 기준, 라벨. 숫자 폭을 맞춰야 하면 num 을 줍니다. 본문을 작은 글로 줄여 넣지 않습니다. 길면 빼거나 접습니다.

```tsx
<Small>홈페이지로 접수된 문의 기준입니다.</Small>
<Small num>2022 ~ 2026</Small>
```

## 뼈대

글은 한 줄기로 흐릅니다. 왼쪽에 제목이나 작은 라벨, 오른쪽 한 칸에 본문을 둡니다.

### 페이지와 페이지 머리

`<Page>`, `<PageHead>` · `.night` `.n-page` `.n-page-head` `.n-wrap`

하위 페이지의 맨 바깥과 머리. 제목 한 줄, 문단 하나, 버튼 줄로 시작합니다.

```tsx
<Page>
  <PageHead
    title="교육 과정"
    lead="직무와 수준에 맞춰 고르실 수 있습니다."
    actions={<Pill as={Link} href="/contact">교육 문의하기</Pill>}
  />
  …
</Page>
```

### 구간

`<Section>` · `.n-sect` `.n-wrap`

페이지를 이루는 구간 하나. 위아래 여백(넓은 화면 128/96px)과 내용 폭을 줍니다. 여백을 구간마다 따로 정하지 않습니다.

```tsx
<Section id="courses">
  <SectionHead title="**직무별** 교육 과정" />
  …
</Section>
```

### 구간 머리

`<SectionHead>` · `.n-head` `.ruled` `.n-title` `.n-body`

구간의 시작. 왼쪽에 한 줄 제목, 오른쪽에 본문. rule 을 주면 가는 선 아래에서 시작합니다. 본문에는 진한 강조를 두지 않습니다. 제목 칸에는 한 줄에 15자 안팎이 들어갑니다.

```tsx
<SectionHead rule title="**연구실 상황**에 맞춰 범위를 정합니다" label="진행 방식">
  <Body>연구 분야와 일정을 알려 주시면 범위와 시간을 함께 정합니다.</Body>
</SectionHead>
```

### 가는 선

`.n-rule`

내용 위에 가는 선 하나를 긋습니다. 구간 머리의 선은 SectionHead 의 rule 로 긋습니다. 상자 테두리로 쓰지 않습니다. 구분은 선 하나와 여백으로 합니다.

```tsx
<div className="n-rule">…</div>
```

### 줄 목록

`<Rows>`, `<Row>` · `.n-rows` `.n-row` `.n-row-label` `.wide-label`

항목이 여럿일 때. 왼쪽 200px 에 작은 라벨, 오른쪽에 본문 한 칸. 한 줄을 번호, 이름, 설명 세 칸으로 나누지 않습니다.

```tsx
<Rows as="ol">
  <Row as="li" label="업무 파악">현재 업무와 자료를 함께 살펴보고 먼저 만들 것을 정합니다.</Row>
  <Row as="li" label="유연한 협업">필요한 만큼 만들고, 쓰면서 범위를 조정합니다.</Row>
</Rows>
```

### 검은 판

`<Panel>` · `.n-panel` `.n-wrap`

앞뒤 구간과 구분해야 하는 구간 하나(후기, 수강료처럼). 한 페이지에 두세 번까지. 모든 구간을 판으로 감싸지 않습니다.

```tsx
<Panel id="price">
  <SectionHead title="한 번 결제로 **1년간 수강**합니다" />
  …
</Panel>
```

### 그림 틀

`<Media>` · `.n-media` `.wide`

그림과 영상을 담는 틀. 기본 4:3, wide 는 16:9. 안의 img, video 가 틀을 채웁니다.

```tsx
<Media wide>
  <video src="/lab.mp4" muted loop playsInline />
</Media>
```

### 연도별 이력

`.n-timeline` `.n-tl-year` `.n-tl-more` `.chev`

해마다 쌓인 이력. 왼쪽에 연도, 오른쪽에 그 해의 줄들. 많으면 앞의 몇 줄만 보이고 '외 N건'으로 접습니다.

```tsx
<div className="n-timeline">
  <div className="n-tl-year">
    <p className="n-card-title n-num">2026</p>
    <ul>
      <li className="n-body">임원 AI 워크숍</li>
      <li className="n-tl-more">
        <details>
          <summary className="n-small">외 12건 <span className="chev" aria-hidden>→</span></summary>
          …
        </details>
      </li>
    </ul>
  </div>
</div>
```

### 문의 띠

`<CtaBand>` · `.n-cta-band` `.n-actions`

페이지 끝의 마지막 행동. 왼쪽에 한 줄 문장, 오른쪽에 버튼 줄. 한 페이지에 하나.

```tsx
<CtaBand
  title="**시간표**와 **견적서**를 바로 받아 보세요"
  label="교육 문의"
  actions={<>
    <Pill as={Link} href="/contact">교육 문의하기</Pill>
    <TextLink as={Link} href="/courses" arrow>교육 과정 보기</TextLink>
  </>}
/>
```

## 조작부

버튼은 하나, 링크도 하나. 한 화면의 주 행동은 알약 버튼 하나입니다. 둘째 행동은 글자 링크로 둡니다.

### 알약 버튼

`<Pill>` · `.n-pill` `.ghost`

한 화면의 주 행동 하나. 높이 48px. ghost 는 어두운 면(둘째 행동이 꼭 버튼이어야 할 때). 흰 버튼 둘을 나란히 두지 않습니다.

```tsx
<Pill as={Link} href="/contact">교육 문의하기</Pill>
<Pill as="button" type="button" ghost onClick={open}>진단 시작</Pill>
```

### 글자 링크

`<TextLink>` · `.n-link`

버튼 옆의 둘째 행동, 본문 아래의 '더 보기'. arrow 를 주면 끝에 화살표가 붙습니다.

```tsx
<TextLink as={Link} href="/about" arrow>회사소개 보기</TextLink>
```

### 버튼 줄

`<Actions>` · `.n-actions`

버튼과 글자 링크를 나란히 놓는 줄. 버튼 하나와 링크 하나까지.

```tsx
<Actions>
  <Pill as={Link} href="/signup">얼리버드로 신청하기</Pill>
  <TextLink as={Link} href="#check" arrow>2분 무료 진단</TextLink>
</Actions>
```

## 토큰

값은 `src/css/tokens.css` 에만 있다. `.night` 안에서 쓴다.

| 이름 | 값 |
|---|---|
| `--n-bg` | `#000000` |
| `--n-panel` | `#0d0d0d` |
| `--n-card` | `#171717` |
| `--n-card-2` | `#202020` |
| `--n-line` | `rgba(255, 255, 255, 0.1)` |
| `--n-hi` | `#ffffff` |
| `--n-soft` | `rgba(255, 255, 255, 0.78)` |
| `--n-mid` | `rgba(255, 255, 255, 0.5)` |
| `--n-dim` | `rgba(255, 255, 255, 0.32)` |
| `--n-btn` | `#ffffff` |
| `--n-btn-ink` | `#000000` |
| `--n-btn-hover` | `#e9e9e9` |
| `--n-ghost` | `rgba(255, 255, 255, 0.08)` |
| `--n-ghost-hover` | `rgba(255, 255, 255, 0.16)` |
| `--n-focus` | `rgba(255, 255, 255, 0.55)` |
| `--n-fs-display` | `clamp(34px, 3.8vw, 50px)` |
| `--n-fs-title` | `clamp(26px, 2.4vw, 32px)` |
| `--n-fs-body` | `18px` |
| `--n-fs-small` | `14px` |
| `--n-fs-control` | `15px` |
| `--n-radius` | `32px` |
| `--n-radius-md` | `20px` |
| `--n-radius-pill` | `999px` |
| `--n-wrap` | `1064px` |
| `--n-gutter` | `24px` |
| `--n-edge` | `clamp(20px, 3.2vw, 48px)` |
| `--n-font` | `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
