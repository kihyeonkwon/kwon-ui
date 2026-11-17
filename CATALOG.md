# kwon-ui 카탈로그

버전 0.8.0. 이 파일은 `npm run build` 가 `src/catalog/manifest.tsx` 에서 만든다. 직접 고치지 않는다.

화면을 만들기 전에 이 목록에서 고른다. 여기 없는 조각이 필요하면 페이지에서 새로 만들지 않고, kwon-ui 에 추가를 제안한다.

## 쓰는 법

```tsx
import "kwon-ui/kwon-ui.css"; // 앱의 레이아웃에서 한 번
import { Page, PageHead, Section, SectionHead, Rows, Row, Pill, TextLink } from "kwon-ui";
```

- 페이지 맨 바깥에 `.night` 가 있어야 한다(`<Page>` 가 붙인다).
- 흰 바탕 화면(라이트)은 `.night` 에 `.light` 를 함께 붙인다(`<Page light>`). 조각은 같고 색 토큰만 바뀐다. 사진 판과 떠 있는 메뉴의 알약, 메뉴판은 라이트에서도 어두운 판이다. 라이트는 페이지 맨 바깥에 붙인다.
- 색, 글자 크기, 모서리, 폭은 토큰(`var(--n-…)`)으로만 쓴다. 값을 직접 쓰지 않는다.
- 링크는 `as` 로 프레임워크의 링크 컴포넌트를 넘긴다: `<Pill as={Link} href="/contact">`.
- 조각에는 바깥 여백(margin)이 없다. 조각 사이 간격은 앱에서 준다.
- 제목은 `"**진한 낱말** 나머지"` 꼴의 한 줄로 쓴다. 진한 글자는 핵심 낱말 한두 개에만 준다.

## 한눈에

| 조각 | 컴포넌트 | 클래스 | 언제 |
|---|---|---|---|
| 첫 화면 제목 | `<Display>` | `.n-display` | 첫 화면의 제목. 한 페이지에 한 번만 씁니다. |
| 구간 제목 | `<Title>` | `.n-title` | 구간과 페이지의 제목. 한 문장 한 줄로 쓰고, ** 로 감싼 핵심 낱말 한두 개만 진하게 둡니다. |
| 본문 | `<Body>` | `.n-body` | 읽는 문단. 한 구간에 한두 문단까지 둡니다. 목록에서 줄마다 먼저 읽혀야 하는 낱말(기관 이름)은 line 에 ** 로 감싸 진하게 둡니다. 작은 글 안에서도 같은 hi 를 씁니다. |
| 작은 제목 | `<CardTitle>` | `.n-card-title` | 목록 줄이나 카드 안의 제목. 본문과 같은 크기이고 진한 글자입니다. |
| 작은 글 | `<Small>` | `.n-small` | 캡션, 기준, 라벨. 숫자 폭을 맞춰야 하면 num 을 줍니다. |
| 긴 글 | (클래스만) | `.n-prose` | 문단, 목록, 링크, 진한 낱말이 섞인 긴 글(소개 문단, 약관과 정책). 한 줄은 720px 까지이고, 문단 사이는 글자 한 줄 높이만큼 띄웁니다. |
| 페이지와 페이지 머리 | `<Page>` `<PageHead>` | `.n-page` | 하위 페이지의 맨 바깥과 머리. 제목 한 줄, 문단 하나, 버튼 줄로 시작합니다. 흰 바탕 화면은 Page 에 light 를 줍니다(night 와 light 가 함께 붙습니다). 조각은 같고 색 토큰만 바뀝니다. 운영체제 설정이나 방문자의 선택으로 문서 전체를 흰 바탕으로 바꿀 때는 html 에 light 를 붙입니다(언제 붙일지는 앱이 정합니다). 그 안에서도 어둡게 둘 구간(어두운 그림이나 영상 위에 흰 글을 얹은 곳)에는 n-dark 를 붙입니다. |
| 구간 | `<Section>` | `.n-sect` | 페이지를 이루는 구간 하나. 위아래 여백(넓은 화면 128/96px)과 내용 폭을 줍니다. rule 은 앞 구간과의 사이에 가는 선을 내용 폭만큼 긋습니다. slim 은 문장 하나와 버튼 하나뿐인 짧은 구간의 여백(넓은 화면 80px)입니다. |
| 구간 머리 | `<SectionHead>` | `.n-head` | 구간의 시작. 왼쪽에 한 줄 제목, 오른쪽에 본문. rule 을 주면 가는 선 아래에서 시작합니다. |
| 가는 선 | (클래스만) | `.n-rule` | 내용 위에 가는 선 하나를 긋습니다. 구간 머리의 선은 SectionHead 의 rule 로 긋습니다. |
| 줄 목록 | `<Rows>` `<Row>` | `.n-rows` | 항목이 여럿일 때. 왼쪽 200px 에 작은 라벨, 오른쪽에 본문 한 칸. 라벨과 본문은 첫 줄의 글자 밑선이 맞습니다. |
| 검은 판 | `<Panel>` | `.n-panel` | 앞뒤 구간과 구분해야 하는 구간 하나(후기, 수강료처럼). 한 페이지에 두세 번까지. |
| 그림 틀 | `<Media>` | `.n-media` | 그림과 영상을 담는 틀. 기본 4:3, wide 는 16:9. 안의 img, video 가 틀을 채웁니다. |
| 사진 판 | `<PhotoPanel>` | `.n-photo` | 어둡게 누른 사진 위 왼쪽 아래에 제목 한 줄과 문단 하나를 둡니다. 강의 현장처럼 사진이 내용인 구간에 씁니다. media 에 img 나 video 를 넘기면 판을 채웁니다. |
| 표 | (클래스만) | `.n-table` | 칸이 둘 이상인 자료(시간표, 수집 항목과 보유 기간). 가는 가로선만 긋고 머리글은 작은 회색입니다. 줄의 이름 칸은 hi, 곁들이는 칸은 sm. 좁은 화면에서 넘치면 n-table-wrap 만 옆으로 밉니다. |
| 연도별 이력 | (클래스만) | `.n-timeline` | 해마다 쌓인 이력. 왼쪽에 연도, 오른쪽에 그 해의 줄들. 많으면 앞의 몇 줄만 보이고 '외 N건'으로 접습니다. |
| 문의 띠 | `<CtaBand>` | `.n-cta-band` | 페이지 끝의 마지막 행동. 왼쪽에 한 줄 문장, 오른쪽에 버튼 줄. 한 페이지에 하나. |
| 알약 버튼 | `<Pill>` | `.n-pill` | 한 화면의 주 행동 하나. 높이 48px. ghost 는 어두운 면(둘째 행동이 꼭 버튼이어야 할 때). sm 은 앱 화면(계정, 결제, 강의실, 워크스페이스)의 작은 알약으로 높이 36px, 글자는 작은 글 크기입니다. |
| 글자 링크 | `<TextLink>` | `.n-link` | 버튼 옆의 둘째 행동, 본문 아래의 '더 보기'. arrow 를 주면 끝에 화살표가 붙습니다. |
| 버튼 줄 | `<Actions>` | `.n-actions` | 버튼과 글자 링크를 나란히 놓는 줄. 버튼 하나와 링크 하나까지. |
| 입력 칸 | (클래스만) | `.n-field` | 글을 넣는 칸(input, textarea, select)과 그 위의 칸 이름. 칸 높이 52px, 칸 안의 글자는 16px(휴대폰이 화면을 키우지 않게). |
| 머리 메뉴 | (클래스만) | `.n-nav` | 화면 위에 떠 있는 머리 메뉴. 넓은 화면의 맨 위에서는 넓은 줄(왼쪽에 로고와 링크, 오른쪽에 글자 링크와 버튼 하나)이고, 조금 내리면 가운데 위의 작은 알약으로 바뀝니다(앱이 data-compact="true" 를 붙입니다). 1023px 이하는 처음부터 알약입니다. 알약의 메뉴 단추로 메뉴판을 엽니다. 내린 정도와 여닫기, 로고의 글꼴과 크기는 앱이 정합니다. |
| 탭 | (클래스만) | `.n-tabs` | 같은 자리에서 내용을 바꾸는 탭(버튼에 role="tab", 고른 탭은 aria-selected="true"), 또는 쪽 안의 구간으로 건너뛰는 링크 묶음(a.n-tab). 휴대폰에서는 한 줄로 두고 옆으로 밉니다. |

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

`<Body>` · `.n-body` `.hi`

읽는 문단. 한 구간에 한두 문단까지 둡니다. 목록에서 줄마다 먼저 읽혀야 하는 낱말(기관 이름)은 line 에 ** 로 감싸 진하게 둡니다. 작은 글 안에서도 같은 hi 를 씁니다. 문단마다 강조를 넣는 데 쓰지 않습니다. 굵기는 바꾸지 않고 색만 올립니다.

```tsx
<Body>현재 업무와 자료를 함께 살펴보고 먼저 만들 것을 정합니다.</Body>
<Body as="li" line="**○○전자** 임원 AI 워크숍" />
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

### 긴 글

`.n-prose`

문단, 목록, 링크, 진한 낱말이 섞인 긴 글(소개 문단, 약관과 정책). 한 줄은 720px 까지이고, 문단 사이는 글자 한 줄 높이만큼 띄웁니다. 짧은 문단 하나는 Body 로 씁니다. 긴 글 안에 제목 크기를 따로 두지 않습니다(제목은 바깥에 CardTitle 로).

```tsx
<div className="n-prose">
  <p>회사는 서비스 운영에 필요한 범위에서 아래 업체에 처리를 맡깁니다.</p>
  <ul>
    <li>결제 처리</li>
    <li>데이터베이스 운영</li>
  </ul>
  <p><strong>카드 번호는 저장하지 않습니다.</strong> 자세한 내용은 <a href="#">개인정보처리방침</a>에 있습니다.</p>
</div>
```

## 뼈대

글은 한 줄기로 흐릅니다. 왼쪽에 제목이나 작은 라벨, 오른쪽 한 칸에 본문을 둡니다.

### 페이지와 페이지 머리

`<Page>`, `<PageHead>` · `.night` `.light` `.n-dark` `.n-page` `.n-page-head` `.n-wrap`

하위 페이지의 맨 바깥과 머리. 제목 한 줄, 문단 하나, 버튼 줄로 시작합니다. 흰 바탕 화면은 Page 에 light 를 줍니다(night 와 light 가 함께 붙습니다). 조각은 같고 색 토큰만 바뀝니다. 운영체제 설정이나 방문자의 선택으로 문서 전체를 흰 바탕으로 바꿀 때는 html 에 light 를 붙입니다(언제 붙일지는 앱이 정합니다). 그 안에서도 어둡게 둘 구간(어두운 그림이나 영상 위에 흰 글을 얹은 곳)에는 n-dark 를 붙입니다.

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

`<Section>` · `.n-sect` `.n-wrap` `.ruled` `.slim`

페이지를 이루는 구간 하나. 위아래 여백(넓은 화면 128/96px)과 내용 폭을 줍니다. rule 은 앞 구간과의 사이에 가는 선을 내용 폭만큼 긋습니다. slim 은 문장 하나와 버튼 하나뿐인 짧은 구간의 여백(넓은 화면 80px)입니다. 여백을 구간마다 따로 정하지 않습니다. 구간 머리에 선이 있으면(SectionHead 의 rule) 구간에는 긋지 않습니다.

```tsx
<Section id="courses" rule>
  <SectionHead title="**직무별** 교육 과정" />
  …
</Section>
<Section id="team" slim rule>
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

항목이 여럿일 때. 왼쪽 200px 에 작은 라벨, 오른쪽에 본문 한 칸. 라벨과 본문은 첫 줄의 글자 밑선이 맞습니다. 한 줄을 번호, 이름, 설명 세 칸으로 나누지 않습니다.

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

### 사진 판

`<PhotoPanel>` · `.n-photo` `.n-photo-in`

어둡게 누른 사진 위 왼쪽 아래에 제목 한 줄과 문단 하나를 둡니다. 강의 현장처럼 사진이 내용인 구간에 씁니다. media 에 img 나 video 를 넘기면 판을 채웁니다. 한 페이지에 하나까지 둡니다. 글이 길면 사진 판에 넣지 않습니다.

```tsx
<PhotoPanel media={<Image src="/hall.jpg" alt="강의 현장" fill sizes="100vw" />}>
  <Title line="**강의 현장**에서 다듬은 과정입니다" label="강사" />
  <Body>실습에 쓰는 자료와 순서는 수업을 거치며 고쳐 왔습니다.</Body>
</PhotoPanel>
```

### 표

`.n-table` `.n-table-wrap` `.hi` `.sm`

칸이 둘 이상인 자료(시간표, 수집 항목과 보유 기간). 가는 가로선만 긋고 머리글은 작은 회색입니다. 줄의 이름 칸은 hi, 곁들이는 칸은 sm. 좁은 화면에서 넘치면 n-table-wrap 만 옆으로 밉니다. 칸이 하나면 줄 목록(Rows)을 씁니다. 표를 상자나 면으로 감싸지 않습니다.

```tsx
<div className="n-table-wrap">
  <table className="n-table">
    <thead><tr><th>구분</th><th>수집 항목</th><th>보유 기간</th></tr></thead>
    <tbody>
      <tr><td className="hi">회원가입</td><td>이메일 주소, 비밀번호</td><td className="sm">회원 탈퇴 시까지</td></tr>
    </tbody>
  </table>
</div>
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

`<Pill>` · `.n-pill` `.ghost` `.sm`

한 화면의 주 행동 하나. 높이 48px. ghost 는 어두운 면(둘째 행동이 꼭 버튼이어야 할 때). sm 은 앱 화면(계정, 결제, 강의실, 워크스페이스)의 작은 알약으로 높이 36px, 글자는 작은 글 크기입니다. 흰 버튼 둘을 나란히 두지 않습니다. 소개 페이지의 주 행동에는 sm 을 쓰지 않습니다.

```tsx
<Pill as={Link} href="/contact">교육 문의하기</Pill>
<Pill as="button" type="button" ghost onClick={open}>진단 시작</Pill>
<Pill as="button" type="submit" sm>저장</Pill>
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

### 입력 칸

`.n-field` `.n-label`

글을 넣는 칸(input, textarea, select)과 그 위의 칸 이름. 칸 높이 52px, 칸 안의 글자는 16px(휴대폰이 화면을 키우지 않게). 칸 이름을 칸 안의 안내 글(placeholder)로 대신하지 않습니다.

```tsx
<div>
  <label className="n-label" htmlFor="email">이메일</label>
  <input id="email" type="email" className="n-field" />
</div>
<div>
  <label className="n-label" htmlFor="memo">요청 사항</label>
  <textarea id="memo" className="n-field" />
</div>
```

### 머리 메뉴

`.n-nav` `.n-nav-bar` `.n-nav-left` `.n-nav-links` `.n-nav-link` `.n-nav-right` `.n-nav-cta` `.n-brand` `.n-nav-pill` `.n-nav-menu` `.n-nav-sheet`

화면 위에 떠 있는 머리 메뉴. 넓은 화면의 맨 위에서는 넓은 줄(왼쪽에 로고와 링크, 오른쪽에 글자 링크와 버튼 하나)이고, 조금 내리면 가운데 위의 작은 알약으로 바뀝니다(앱이 data-compact="true" 를 붙입니다). 1023px 이하는 처음부터 알약입니다. 알약의 메뉴 단추로 메뉴판을 엽니다. 내린 정도와 여닫기, 로고의 글꼴과 크기는 앱이 정합니다. 메뉴에 흰 버튼을 둘 두지 않습니다(로그인은 글자 링크). 메뉴는 문서 흐름에서 자리를 차지하지 않으므로 첫 구간의 위 여백을 앱에서 둡니다.

```tsx
<div className="n-nav" data-compact={scrolled}>
  <div className="n-nav-bar" aria-hidden={scrolled}>
    <div className="n-nav-left">
      <Link href="/" className="n-brand">{logo}</Link>
      <nav className="n-nav-links">
        <Link href="/courses" className="n-nav-link">교육 과정</Link>
        <Link href="/cases" className="n-nav-link">교육 사례</Link>
      </nav>
    </div>
    <div className="n-nav-right">
      <Link href="/contact" className="n-nav-link">문의</Link>
      <Link href="/quote" className="n-nav-cta">맞춤 커리큘럼</Link>
    </div>
  </div>
  <div className="n-nav-pill">
    <Link href="/" className="n-brand">{logo}</Link>
    <button type="button" className="n-nav-menu" aria-expanded={open} aria-label="메뉴 열기" onClick={toggle}>{icon}</button>
  </div>
  {open && (
    <nav className="n-nav-sheet">
      <Link href="/courses">교육 과정</Link>
      <Link href="/cases">교육 사례</Link>
      <Link href="/quote" className="n-nav-cta">맞춤 커리큘럼</Link>
    </nav>
  )}
</div>
```

### 탭

`.n-tabs` `.n-tab`

같은 자리에서 내용을 바꾸는 탭(버튼에 role="tab", 고른 탭은 aria-selected="true"), 또는 쪽 안의 구간으로 건너뛰는 링크 묶음(a.n-tab). 휴대폰에서는 한 줄로 두고 옆으로 밉니다. 탭마다 숫자 배지나 설명 글을 붙이지 않습니다(배지는 한 화면에 하나까지).

```tsx
<div role="tablist" className="n-tabs">
  <button type="button" role="tab" aria-selected={tab === "all"} className="n-tab" onClick={() => setTab("all")}>전체</button>
  <button type="button" role="tab" aria-selected={tab === "hr"} className="n-tab" onClick={() => setTab("hr")}>인사</button>
</div>
```

## 토큰

값은 `src/css/tokens.css` 에만 있다. `.night` 안에서 쓴다. 라이트 칸은 `.night.light` 에서 바뀌는 값이다(빈 칸은 같은 값).

| 이름 | 값 | 라이트 |
|---|---|---|
| `--n-bg` | `#000000` |  |
| `--n-panel` | `#0d0d0d` |  |
| `--n-card` | `#171717` |  |
| `--n-card-2` | `#202020` |  |
| `--n-line` | `rgba(255, 255, 255, 0.1)` |  |
| `--n-hi` | `#ffffff` |  |
| `--n-soft` | `rgba(255, 255, 255, 0.78)` |  |
| `--n-mid` | `rgba(255, 255, 255, 0.5)` |  |
| `--n-dim` | `rgba(255, 255, 255, 0.32)` |  |
| `--n-btn` | `#ffffff` |  |
| `--n-btn-ink` | `#000000` |  |
| `--n-btn-hover` | `#e9e9e9` |  |
| `--n-ghost` | `rgba(255, 255, 255, 0.08)` |  |
| `--n-ghost-hover` | `rgba(255, 255, 255, 0.16)` |  |
| `--n-focus` | `rgba(255, 255, 255, 0.55)` |  |
| `--n-nav-glass` | `rgba(30, 30, 36, 0.55)` |  |
| `--n-menu-hover` | `rgba(255, 255, 255, 0.06)` |  |
| `--n-icon-hover` | `rgba(255, 255, 255, 0.1)` |  |
| `--n-tabs` | `rgba(255, 255, 255, 0.05)` |  |
| `--n-tab-on` | `rgba(255, 255, 255, 0.12)` |  |
| `--n-shade` | `rgba(0, 0, 0, 0.82)` |  |
| `--n-shade-soft` | `rgba(0, 0, 0, 0.1)` |  |
| `--n-on-photo` | `rgba(255, 255, 255, 0.62)` |  |
| `--n-field` | `rgba(255, 255, 255, 0.05)` |  |
| `--n-field-focus` | `rgba(255, 255, 255, 0.4)` |  |
| `--n-field-option` | `#141414` |  |
| `--n-underline` | `rgba(255, 255, 255, 0.35)` |  |
| `--n-fs-display` | `clamp(34px, 3.8vw, 50px)` |  |
| `--n-fs-title` | `clamp(26px, 2.4vw, 32px)` |  |
| `--n-fs-body` | `18px` |  |
| `--n-fs-small` | `14px` |  |
| `--n-fs-control` | `15px` |  |
| `--n-fs-input` | `16px` |  |
| `--n-fs-menu` | `16px` |  |
| `--n-radius` | `32px` |  |
| `--n-radius-md` | `20px` |  |
| `--n-radius-sm` | `12px` |  |
| `--n-radius-pill` | `999px` |  |
| `--n-radius-menu` | `14px` |  |
| `--n-radius-xs` | `8px` |  |
| `--n-wrap` | `1064px` |  |
| `--n-gutter` | `24px` |  |
| `--n-edge` | `clamp(20px, 3.2vw, 48px)` |  |
| `--n-nav-top` | `clamp(16px, 3.2vw, 44px)` |  |
| `--n-font` | `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |  |
