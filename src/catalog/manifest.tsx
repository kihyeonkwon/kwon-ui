import type { ReactNode } from "react";
import {
  Actions,
  Body,
  CardTitle,
  CtaBand,
  Display,
  Media,
  PageHead,
  Panel,
  PhotoPanel,
  Pill,
  Row,
  Rows,
  SectionHead,
  Small,
  TextLink,
  Title,
} from "../react/index.js";

/*
 * 카탈로그의 원본. CATALOG.md(모델과 사람이 읽는 목록)와 site/index.html(실제로 그려지는 페이지)이
 * 둘 다 여기서 만들어진다. 조각을 더하거나 바꾸면 이 파일의 항목도 같이 고친다.
 */

export type Entry = {
  /** 대표 클래스 이름. CATALOG.md 와 페이지의 닻 */
  id: string;
  group: "글자" | "뼈대" | "조작부";
  /** 보이는 이름 */
  name: string;
  /** 컴포넌트 이름(없으면 클래스만 있는 조각) */
  component?: string;
  /** 이 조각이 쓰는 클래스 */
  classes: string[];
  /** 언제 쓰나 */
  use: string;
  /** 쓰지 않는 경우 */
  avoid?: string;
  /** 사용 예(JSX) */
  code: string;
  /** 카탈로그 페이지에 그릴 예. 없으면 코드만 보인다 */
  render?: () => ReactNode;
};

/* 사진 판 예시에 쓰는 그림. 리포에 사진을 싣지 않으려고 밝은 면 하나를 그려 넣는다(카탈로그에서만 쓴다) */
const SAMPLE_PHOTO =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9" preserveAspectRatio="none"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6e6e6"/><stop offset="1" stop-color="#5c5c5c"/></linearGradient></defs><rect width="16" height="9" fill="url(#g)"/></svg>`,
  );

export const GROUPS: { name: Entry["group"]; line: string; note: string }[] = [
  { name: "글자", line: "읽는 글자 크기는 **셋**입니다", note: "제목, 본문, 작은 글. 위계는 굵기 대신 진한 글자와 회색 두 톤으로 만듭니다." },
  { name: "뼈대", line: "글은 **한 줄기**로 흐릅니다", note: "왼쪽에 제목이나 작은 라벨, 오른쪽 한 칸에 본문을 둡니다." },
  { name: "조작부", line: "버튼은 **하나**, 링크도 하나", note: "한 화면의 주 행동은 알약 버튼 하나입니다. 둘째 행동은 글자 링크로 둡니다." },
];

export const ENTRIES: Entry[] = [
  {
    id: "n-display",
    group: "글자",
    name: "첫 화면 제목",
    component: "Display",
    classes: ["n-display"],
    use: "첫 화면의 제목. 한 페이지에 한 번만 씁니다.",
    avoid: "구간 제목에는 쓰지 않습니다(Title).",
    code: `<Display line="**기술과 사람** 사이를 공부합니다" />`,
    render: () => <Display as="p" line="**기술과 사람** 사이를 공부합니다" />,
  },
  {
    id: "n-title",
    group: "글자",
    name: "구간 제목",
    component: "Title",
    classes: ["n-title", "lo-inline"],
    use: "구간과 페이지의 제목. 한 문장 한 줄로 쓰고, ** 로 감싼 핵심 낱말 한두 개만 진하게 둡니다.",
    avoid: "제목과 부제를 두 줄로 쌓지 않습니다. 숫자는 숫자가 요점일 때만 진하게 둡니다.",
    code: `<Title line="**문헌 조사**부터 **논문 작성**까지 다룹니다" label="교육 내용" />`,
    render: () => <Title as="p" line="**문헌 조사**부터 **논문 작성**까지 다룹니다" label="교육 내용" />,
  },
  {
    id: "n-body",
    group: "글자",
    name: "본문",
    component: "Body",
    classes: ["n-body", "hi"],
    use: "읽는 문단. 한 구간에 한두 문단까지 둡니다. 목록에서 줄마다 먼저 읽혀야 하는 낱말(기관 이름)은 line 에 ** 로 감싸 진하게 둡니다. 작은 글 안에서도 같은 hi 를 씁니다.",
    avoid: "문단마다 강조를 넣는 데 쓰지 않습니다. 굵기는 바꾸지 않고 색만 올립니다.",
    code: `<Body>현재 업무와 자료를 함께 살펴보고 먼저 만들 것을 정합니다.</Body>\n<Body as="li" line="**○○전자** 임원 AI 워크숍" />`,
    render: () => (
      <>
        <Body>현재 업무와 자료를 함께 살펴보고 먼저 만들 것을 정합니다. 만든 뒤에는 실제 사용 기록을 보고 고칩니다.</Body>
        <Body line="**○○전자** 임원 AI 워크숍" />
        <Body line="**○○대학교** 연구자를 위한 AI 특강" />
      </>
    ),
  },
  {
    id: "n-card-title",
    group: "글자",
    name: "작은 제목",
    component: "CardTitle",
    classes: ["n-card-title"],
    use: "목록 줄이나 카드 안의 제목. 본문과 같은 크기이고 진한 글자입니다.",
    code: `<CardTitle>임원 AI 워크숍</CardTitle>`,
    render: () => <CardTitle as="p">임원 AI 워크숍</CardTitle>,
  },
  {
    id: "n-small",
    group: "글자",
    name: "작은 글",
    component: "Small",
    classes: ["n-small", "n-num"],
    use: "캡션, 기준, 라벨. 숫자 폭을 맞춰야 하면 num 을 줍니다.",
    avoid: "본문을 작은 글로 줄여 넣지 않습니다. 길면 빼거나 접습니다.",
    code: `<Small>홈페이지로 접수된 문의 기준입니다.</Small>\n<Small num>2022 ~ 2026</Small>`,
    render: () => (
      <>
        <Small>홈페이지로 접수된 문의 기준입니다.</Small>
        <Small num>2022 ~ 2026</Small>
      </>
    ),
  },
  {
    id: "n-prose",
    group: "글자",
    name: "긴 글",
    classes: ["n-prose"],
    use: "문단, 목록, 링크, 진한 낱말이 섞인 긴 글(소개 문단, 약관과 정책). 한 줄은 720px 까지이고, 문단 사이는 글자 한 줄 높이만큼 띄웁니다.",
    avoid: "짧은 문단 하나는 Body 로 씁니다. 긴 글 안에 제목 크기를 따로 두지 않습니다(제목은 바깥에 CardTitle 로).",
    code: `<div className="n-prose">\n  <p>회사는 서비스 운영에 필요한 범위에서 아래 업체에 처리를 맡깁니다.</p>\n  <ul>\n    <li>결제 처리</li>\n    <li>데이터베이스 운영</li>\n  </ul>\n  <p><strong>카드 번호는 저장하지 않습니다.</strong> 자세한 내용은 <a href="#">개인정보처리방침</a>에 있습니다.</p>\n</div>`,
    render: () => (
      <div className="n-prose">
        <p>회사는 서비스 운영에 필요한 범위에서 아래 업체에 처리를 맡깁니다.</p>
        <ul>
          <li>결제 처리</li>
          <li>데이터베이스 운영</li>
        </ul>
        <p>
          <strong>카드 번호는 저장하지 않습니다.</strong> 자세한 내용은 <a href="#n-prose">개인정보처리방침</a>에 있습니다.
        </p>
      </div>
    ),
  },
  {
    id: "n-page",
    group: "뼈대",
    name: "페이지와 페이지 머리",
    component: "Page, PageHead",
    classes: ["night", "n-page", "n-page-head", "n-wrap"],
    use: "하위 페이지의 맨 바깥과 머리. 제목 한 줄, 문단 하나, 버튼 줄로 시작합니다.",
    code: `<Page>\n  <PageHead\n    title="교육 과정"\n    lead="직무와 수준에 맞춰 고르실 수 있습니다."\n    actions={<Pill as={Link} href="/contact">교육 문의하기</Pill>}\n  />\n  …\n</Page>`,
    render: () => (
      <PageHead
        title="교육 과정"
        lead="직무와 수준에 맞춰 고르실 수 있습니다."
        actions={
          <>
            <Pill href="#n-page">교육 문의하기</Pill>
            <TextLink href="#n-page" arrow>
              과정 안내서 받기
            </TextLink>
          </>
        }
      />
    ),
  },
  {
    id: "n-sect",
    group: "뼈대",
    name: "구간",
    component: "Section",
    classes: ["n-sect", "n-wrap", "ruled", "slim"],
    use: "페이지를 이루는 구간 하나. 위아래 여백(넓은 화면 128/96px)과 내용 폭을 줍니다. rule 은 앞 구간과의 사이에 가는 선을 내용 폭만큼 긋습니다. slim 은 문장 하나와 버튼 하나뿐인 짧은 구간의 여백(넓은 화면 80px)입니다.",
    avoid: "여백을 구간마다 따로 정하지 않습니다. 구간 머리에 선이 있으면(SectionHead 의 rule) 구간에는 긋지 않습니다.",
    code: `<Section id="courses" rule>\n  <SectionHead title="**직무별** 교육 과정" />\n  …\n</Section>\n<Section id="team" slim rule>\n  …\n</Section>`,
  },
  {
    id: "n-head",
    group: "뼈대",
    name: "구간 머리",
    component: "SectionHead",
    classes: ["n-head", "ruled", "n-title", "n-body"],
    use: "구간의 시작. 왼쪽에 한 줄 제목, 오른쪽에 본문. rule 을 주면 가는 선 아래에서 시작합니다.",
    avoid: "본문에는 진한 강조를 두지 않습니다. 제목 칸에는 한 줄에 15자 안팎이 들어갑니다.",
    code: `<SectionHead rule title="**연구실 상황**에 맞춰 범위를 정합니다" label="진행 방식">\n  <Body>연구 분야와 일정을 알려 주시면 범위와 시간을 함께 정합니다.</Body>\n</SectionHead>`,
    render: () => (
      <SectionHead rule title="**연구실 상황**에 맞춰 범위를 정합니다" label="진행 방식" as="h3">
        <Body>연구 분야와 일정을 알려 주시면 범위와 시간을 함께 정합니다.</Body>
      </SectionHead>
    ),
  },
  {
    id: "n-rule",
    group: "뼈대",
    name: "가는 선",
    classes: ["n-rule"],
    use: "내용 위에 가는 선 하나를 긋습니다. 구간 머리의 선은 SectionHead 의 rule 로 긋습니다.",
    avoid: "상자 테두리로 쓰지 않습니다. 구분은 선 하나와 여백으로 합니다.",
    code: `<div className="n-rule">…</div>`,
    render: () => (
      <div className="n-rule">
        <Small>선 아래의 내용</Small>
      </div>
    ),
  },
  {
    id: "n-rows",
    group: "뼈대",
    name: "줄 목록",
    component: "Rows, Row",
    classes: ["n-rows", "n-row", "n-row-label", "wide-label"],
    use: "항목이 여럿일 때. 왼쪽 200px 에 작은 라벨, 오른쪽에 본문 한 칸. 라벨과 본문은 첫 줄의 글자 밑선이 맞습니다.",
    avoid: "한 줄을 번호, 이름, 설명 세 칸으로 나누지 않습니다.",
    code: `<Rows as="ol">\n  <Row as="li" label="업무 파악">현재 업무와 자료를 함께 살펴보고 먼저 만들 것을 정합니다.</Row>\n  <Row as="li" label="유연한 협업">필요한 만큼 만들고, 쓰면서 범위를 조정합니다.</Row>\n</Rows>`,
    render: () => (
      <Rows as="ol">
        <Row as="li" label="업무 파악" labelAs="p">
          현재 업무와 자료를 함께 살펴보고 먼저 만들 것을 정합니다.
        </Row>
        <Row as="li" label="유연한 협업" labelAs="p">
          필요한 만큼 만들고, 쓰면서 범위를 조정합니다.
        </Row>
        <Row as="li" label="지속적인 개선" labelAs="p">
          사용 기록을 보고 다음에 고칠 것을 함께 정합니다.
        </Row>
      </Rows>
    ),
  },
  {
    id: "n-panel",
    group: "뼈대",
    name: "검은 판",
    component: "Panel",
    classes: ["n-panel", "n-wrap"],
    use: "앞뒤 구간과 구분해야 하는 구간 하나(후기, 수강료처럼). 한 페이지에 두세 번까지.",
    avoid: "모든 구간을 판으로 감싸지 않습니다.",
    code: `<Panel id="price">\n  <SectionHead title="한 번 결제로 **1년간 수강**합니다" />\n  …\n</Panel>`,
    render: () => (
      <Panel as="div">
        <SectionHead title="한 번 결제로 **1년간 수강**합니다" as="h3">
          <Body>자동으로 갱신되거나 추가로 청구되지 않습니다.</Body>
        </SectionHead>
      </Panel>
    ),
  },
  {
    id: "n-media",
    group: "뼈대",
    name: "그림 틀",
    component: "Media",
    classes: ["n-media", "wide"],
    use: "그림과 영상을 담는 틀. 기본 4:3, wide 는 16:9. 안의 img, video 가 틀을 채웁니다.",
    code: `<Media wide>\n  <video src="/lab.mp4" muted loop playsInline />\n</Media>`,
    render: () => <Media wide />,
  },
  {
    id: "n-photo",
    group: "뼈대",
    name: "사진 판",
    component: "PhotoPanel",
    classes: ["n-photo", "n-photo-in"],
    use: "어둡게 누른 사진 위 왼쪽 아래에 제목 한 줄과 문단 하나를 둡니다. 강의 현장처럼 사진이 내용인 구간에 씁니다. media 에 img 나 video 를 넘기면 판을 채웁니다.",
    avoid: "한 페이지에 하나까지 둡니다. 글이 길면 사진 판에 넣지 않습니다.",
    code: `<PhotoPanel media={<Image src="/hall.jpg" alt="강의 현장" fill sizes="100vw" />}>\n  <Title line="**강의 현장**에서 다듬은 과정입니다" label="강사" />\n  <Body>실습에 쓰는 자료와 순서는 수업을 거치며 고쳐 왔습니다.</Body>\n</PhotoPanel>`,
    render: () => (
      <PhotoPanel media={<img src={SAMPLE_PHOTO} alt="" loading="lazy" />}>
        <Title as="p" line="**강의 현장**에서 다듬은 과정입니다" label="강사" />
        <Body>실습에 쓰는 자료와 순서는 수업을 거치며 고쳐 왔습니다.</Body>
        <Actions>
          <Pill href="#n-photo">교육 문의하기</Pill>
        </Actions>
      </PhotoPanel>
    ),
  },
  {
    id: "n-table",
    group: "뼈대",
    name: "표",
    classes: ["n-table", "n-table-wrap", "hi", "sm"],
    use: "칸이 둘 이상인 자료(시간표, 수집 항목과 보유 기간). 가는 가로선만 긋고 머리글은 작은 회색입니다. 줄의 이름 칸은 hi, 곁들이는 칸은 sm. 좁은 화면에서 넘치면 n-table-wrap 만 옆으로 밉니다.",
    avoid: "칸이 하나면 줄 목록(Rows)을 씁니다. 표를 상자나 면으로 감싸지 않습니다.",
    code: `<div className="n-table-wrap">\n  <table className="n-table">\n    <thead><tr><th>구분</th><th>수집 항목</th><th>보유 기간</th></tr></thead>\n    <tbody>\n      <tr><td className="hi">회원가입</td><td>이메일 주소, 비밀번호</td><td className="sm">회원 탈퇴 시까지</td></tr>\n    </tbody>\n  </table>\n</div>`,
    render: () => (
      <div className="n-table-wrap">
        <table className="n-table">
          <thead>
            <tr>
              <th>구분</th>
              <th>수집 항목</th>
              <th>보유 기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="hi">회원가입</td>
              <td>이메일 주소, 비밀번호</td>
              <td className="sm">회원 탈퇴 시까지</td>
            </tr>
            <tr>
              <td className="hi">결제</td>
              <td>결제 승인번호, 결제 금액과 일시</td>
              <td className="sm">5년</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "n-timeline",
    group: "뼈대",
    name: "연도별 이력",
    classes: ["n-timeline", "n-tl-year", "n-tl-more", "chev"],
    use: "해마다 쌓인 이력. 왼쪽에 연도, 오른쪽에 그 해의 줄들. 많으면 앞의 몇 줄만 보이고 '외 N건'으로 접습니다.",
    code: `<div className="n-timeline">\n  <div className="n-tl-year">\n    <p className="n-card-title n-num">2026</p>\n    <ul>\n      <li className="n-body">임원 AI 워크숍</li>\n      <li className="n-tl-more">\n        <details>\n          <summary className="n-small">외 12건 <span className="chev" aria-hidden>→</span></summary>\n          …\n        </details>\n      </li>\n    </ul>\n  </div>\n</div>`,
    render: () => (
      <div className="n-timeline">
        {[
          { year: "2026", items: ["임원 AI 워크숍", "직무별 AI 실무 과정"], more: 12 },
          { year: "2025", items: ["데이터 분석 실습 과정", "신입사원 AI 기초"], more: 0 },
        ].map((g) => (
          <div className="n-tl-year" key={g.year}>
            <p className="n-card-title n-num">{g.year}</p>
            <ul>
              {g.items.map((t) => (
                <li className="n-body" key={t}>
                  {t}
                </li>
              ))}
              {g.more ? (
                <li className="n-tl-more">
                  <details>
                    <summary className="n-small">
                      외 {g.more}건{" "}
                      <span className="chev" aria-hidden="true">
                        →
                      </span>
                    </summary>
                    <p className="n-small">접힌 줄이 여기에 이어집니다.</p>
                  </details>
                </li>
              ) : null}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "n-cta-band",
    group: "뼈대",
    name: "문의 띠",
    component: "CtaBand",
    classes: ["n-cta-band", "n-actions"],
    use: "페이지 끝의 마지막 행동. 왼쪽에 한 줄 문장, 오른쪽에 버튼 줄. 한 페이지에 하나.",
    code: `<CtaBand\n  title="**시간표**와 **견적서**를 바로 받아 보세요"\n  label="교육 문의"\n  actions={<>\n    <Pill as={Link} href="/contact">교육 문의하기</Pill>\n    <TextLink as={Link} href="/courses" arrow>교육 과정 보기</TextLink>\n  </>}\n/>`,
    render: () => (
      <CtaBand
        title="**시간표**와 **견적서**를 바로 받아 보세요"
        label="교육 문의"
        actions={
          <>
            <Pill href="#n-cta-band">교육 문의하기</Pill>
            <TextLink href="#n-cta-band" arrow>
              교육 과정 보기
            </TextLink>
          </>
        }
      />
    ),
  },
  {
    id: "n-pill",
    group: "조작부",
    name: "알약 버튼",
    component: "Pill",
    classes: ["n-pill", "ghost"],
    use: "한 화면의 주 행동 하나. 높이 48px. ghost 는 어두운 면(둘째 행동이 꼭 버튼이어야 할 때).",
    avoid: "흰 버튼 둘을 나란히 두지 않습니다.",
    code: `<Pill as={Link} href="/contact">교육 문의하기</Pill>\n<Pill as="button" type="button" ghost onClick={open}>진단 시작</Pill>`,
    render: () => (
      <Actions>
        <Pill href="#n-pill">교육 문의하기</Pill>
        <Pill href="#n-pill" ghost>
          진단 시작
        </Pill>
      </Actions>
    ),
  },
  {
    id: "n-link",
    group: "조작부",
    name: "글자 링크",
    component: "TextLink",
    classes: ["n-link"],
    use: "버튼 옆의 둘째 행동, 본문 아래의 '더 보기'. arrow 를 주면 끝에 화살표가 붙습니다.",
    code: `<TextLink as={Link} href="/about" arrow>회사소개 보기</TextLink>`,
    render: () => (
      <TextLink href="#n-link" arrow>
        회사소개 보기
      </TextLink>
    ),
  },
  {
    id: "n-actions",
    group: "조작부",
    name: "버튼 줄",
    component: "Actions",
    classes: ["n-actions"],
    use: "버튼과 글자 링크를 나란히 놓는 줄. 버튼 하나와 링크 하나까지.",
    code: `<Actions>\n  <Pill as={Link} href="/signup">얼리버드로 신청하기</Pill>\n  <TextLink as={Link} href="#check" arrow>2분 무료 진단</TextLink>\n</Actions>`,
    render: () => (
      <Actions>
        <Pill href="#n-actions">얼리버드로 신청하기</Pill>
        <TextLink href="#n-actions" arrow>
          2분 무료 진단
        </TextLink>
      </Actions>
    ),
  },
  {
    id: "n-field",
    group: "조작부",
    name: "입력 칸",
    classes: ["n-field", "n-label"],
    use: "글을 넣는 칸(input, textarea, select)과 그 위의 칸 이름. 칸 높이 52px, 칸 안의 글자는 16px(휴대폰이 화면을 키우지 않게).",
    avoid: "칸 이름을 칸 안의 안내 글(placeholder)로 대신하지 않습니다.",
    code: `<div>\n  <label className="n-label" htmlFor="email">이메일</label>\n  <input id="email" type="email" className="n-field" />\n</div>\n<div>\n  <label className="n-label" htmlFor="memo">요청 사항</label>\n  <textarea id="memo" className="n-field" />\n</div>`,
    render: () => (
      <>
        <div>
          <label className="n-label" htmlFor="cat-email">
            이메일
          </label>
          <input id="cat-email" type="email" className="n-field" placeholder="name@company.com" />
        </div>
        <div>
          <label className="n-label" htmlFor="cat-size">
            인원
          </label>
          <select id="cat-size" className="n-field" defaultValue="20">
            <option value="20">20명 이하</option>
            <option value="50">50명 이하</option>
          </select>
        </div>
      </>
    ),
  },  {
    id: "n-nav",
    group: "조작부",
    name: "머리 메뉴",
    classes: ["n-nav", "n-nav-bar", "n-nav-left", "n-nav-links", "n-nav-link", "n-nav-right", "n-nav-cta", "n-brand", "n-nav-pill", "n-nav-menu", "n-nav-sheet"],
    use: "화면 위에 떠 있는 머리 메뉴. 넓은 화면의 맨 위에서는 넓은 줄(왼쪽에 로고와 링크, 오른쪽에 글자 링크와 버튼 하나)이고, 조금 내리면 가운데 위의 작은 알약으로 바뀝니다(앱이 data-compact=\"true\" 를 붙입니다). 1023px 이하는 처음부터 알약입니다. 알약의 메뉴 단추로 메뉴판을 엽니다. 내린 정도와 여닫기, 로고의 글꼴과 크기는 앱이 정합니다.",
    avoid: "메뉴에 흰 버튼을 둘 두지 않습니다(로그인은 글자 링크). 메뉴는 문서 흐름에서 자리를 차지하지 않으므로 첫 구간의 위 여백을 앱에서 둡니다.",
    code: `<div className="n-nav" data-compact={scrolled}>
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
</div>`,
    render: () => (
      <div className="n-nav" data-compact="true">
        <div className="n-nav-pill">
          <a href="#n-nav" className="n-brand">
            kwon-ui
          </a>
          <button type="button" className="n-nav-menu" aria-expanded="true" aria-label="메뉴 닫기">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>
        <nav className="n-nav-sheet" aria-label="메뉴 예시">
          <a href="#n-nav">교육 과정</a>
          <a href="#n-nav">교육 사례</a>
          <a href="#n-nav">문의</a>
          <a href="#n-nav" className="n-nav-cta">
            맞춤 커리큘럼
          </a>
        </nav>
      </div>
    ),
  },
  {
    id: "n-tabs",
    group: "조작부",
    name: "탭",
    classes: ["n-tabs", "n-tab"],
    use: "같은 자리에서 내용을 바꾸는 탭(버튼에 role=\"tab\", 고른 탭은 aria-selected=\"true\"), 또는 쪽 안의 구간으로 건너뛰는 링크 묶음(a.n-tab). 휴대폰에서는 한 줄로 두고 옆으로 밉니다.",
    avoid: "탭마다 숫자 배지나 설명 글을 붙이지 않습니다(배지는 한 화면에 하나까지).",
    code: `<div role="tablist" className="n-tabs">
  <button type="button" role="tab" aria-selected={tab === "all"} className="n-tab" onClick={() => setTab("all")}>전체</button>
  <button type="button" role="tab" aria-selected={tab === "hr"} className="n-tab" onClick={() => setTab("hr")}>인사</button>
</div>`,
    render: () => (
      <div role="tablist" aria-label="탭 예시" className="n-tabs">
        <button type="button" role="tab" aria-selected="true" className="n-tab">
          전체
        </button>
        <button type="button" role="tab" aria-selected="false" className="n-tab">
          기획
        </button>
        <button type="button" role="tab" aria-selected="false" className="n-tab">
          인사
        </button>
        <button type="button" role="tab" aria-selected="false" className="n-tab">
          데이터
        </button>
      </div>
    ),
  },
];
