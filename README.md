# kwon-ui

권앤컴퍼니의 세 제품(kwonandcompany.com, Campus, Projects)이 같이 쓰는 디자인 시스템입니다. 화면의 값과 조각을 한 곳에 두고, 앱은 발행된 버전을 받아 씁니다.

상태: 0.1.0, npm 발행 전.

## 들어 있는 것

- **토큰과 CSS** (`kwon-ui/kwon-ui.css`): 색, 글자 크기 셋, 모서리, 폭. 글자(`n-title`, `n-body`, `n-small`), 뼈대(`n-sect`, `n-head`, `n-rows`, `n-panel`), 조작부(`n-pill`, `n-link`).
- **컴포넌트** (`kwon-ui`): `Page`, `PageHead`, `Section`, `SectionHead`, `Rows`, `Row`, `Panel`, `Media`, `CtaBand`, `Pill`, `TextLink`, `Actions`, `Title`, `Body`, `Small` 등. 서버에서 그려지는 평범한 마크업입니다.
- **목록** ([CATALOG.md](CATALOG.md)): 조각마다 언제 쓰는지와 사용 예. 화면을 만들기 전에 먼저 읽습니다.
- **검사기** (`kwon-ui check`): 앱 코드에서 색·글자 값을 직접 쓴 곳, 시스템 조각을 다시 정의한 곳을 찾습니다. 이미 있는 위반은 기준선에 적어 두고 늘어날 때만 실패합니다.

## 쓰는 법

```tsx
// 레이아웃에서 한 번
import "kwon-ui/kwon-ui.css";

// 페이지
import Link from "next/link";
import { Page, PageHead, Section, SectionHead, Rows, Row, Pill } from "kwon-ui";

export default function CoursesPage() {
  return (
    <Page>
      <PageHead
        title="교육 과정"
        lead="직무와 수준에 맞춰 고르실 수 있습니다."
        actions={<Pill as={Link} href="/contact">교육 문의하기</Pill>}
      />
      <Section>
        <SectionHead rule title="**직무별** 교육 과정" />
        <Rows>
          <Row label="임원">조직의 AI 도입 방향을 정합니다.</Row>
          <Row label="실무자">반복 업무를 AI에게 맡기는 방법을 익힙니다.</Row>
        </Rows>
      </Section>
    </Page>
  );
}
```

글꼴(Pretendard)은 앱이 불러옵니다. 패키지에는 글꼴 파일이 없습니다.

## 검사

```bash
npx kwon-ui check            # 기준선보다 위반이 늘면 실패
npx kwon-ui check --report   # 규칙별 수만 보기
npx kwon-ui baseline         # 지금의 위반 수를 기준선으로 적기
```

앱에 넣는 순서는 [claude/ADOPTING.md](claude/ADOPTING.md)에 있습니다.

## 카탈로그 보기

```bash
npm install
npm run build
open site/index.html
```

## 고치기

조각을 더하거나 바꾸는 규칙은 [CLAUDE.md](CLAUDE.md)에 있습니다. 요점은 세 가지입니다. 새로 디자인하지 않고 운영 중인 화면에서 뽑아냅니다. 두 곳 이상에서 쓰는 것만 올립니다. 값은 `src/css/tokens.css`에만 둡니다.

## 사용 범위

© 2026 Kwon and Company Co., Ltd. 권앤컴퍼니 제품에 쓰려고 만든 것이며, 코드를 공개해 두었을 뿐 다른 곳에서의 사용을 허락하는 라이선스는 붙이지 않았습니다.
