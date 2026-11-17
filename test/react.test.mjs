// 컴포넌트가 내는 마크업 시험. 빌드 결과(dist)를 불러온다.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Body, CtaBand, Page, PageHead, PhotoPanel, Pill, Row, Rows, Section, SectionHead, TextLink, Title, hi, titleText, tone } from "../dist/react/index.js";

const html = (node) => renderToStaticMarkup(node);
const frag = (node) => renderToStaticMarkup(h("div", null, node)).slice(5, -6);

test("tone: ** 로 감싼 곳만 진하고 나머지는 회색", () => {
  assert.equal(frag(tone("**기술과 사람** 사이를 공부합니다")), '기술과 사람<span class="lo-inline"> 사이를 공부합니다</span>');
  assert.equal(frag(tone("앞 **가운데** 뒤", "구간")), '<span class="n-sr">구간. </span><span class="lo-inline">앞 </span>가운데<span class="lo-inline"> 뒤</span>');
});

test("titleText: 표시가 없는 제목은 전부 진한 글자", () => {
  assert.equal(frag(titleText("임원 AI 워크숍")), "임원 AI 워크숍");
  assert.equal(frag(titleText("**단체 수강** 안내")), '단체 수강<span class="lo-inline"> 안내</span>');
});

test("hi, Body 의 line: 본문 안에서 ** 로 감싼 낱말만 진하다", () => {
  assert.equal(frag(hi("**○○전자** 임원 AI 워크숍")), '<span class="hi">○○전자</span> 임원 AI 워크숍');
  assert.equal(frag(hi("표시가 없는 글")), "표시가 없는 글");
  assert.equal(html(h(Body, { as: "li", line: "**○○전자** 임원 AI 워크숍" })), '<li class="n-body"><span class="hi">○○전자</span> 임원 AI 워크숍</li>');
  assert.equal(html(h(Body, null, "그대로 둔 문단")), '<p class="n-body">그대로 둔 문단</p>');
});

test("Section: rule 은 선으로 시작하고 slim 은 짧은 구간이다", () => {
  assert.equal(html(h(Section, { id: "courses" }, "가")), '<section class="n-sect" id="courses"><div class="n-wrap">가</div></section>');
  assert.equal(html(h(Section, { rule: true }, "가")), '<section class="n-sect ruled"><div class="n-wrap">가</div></section>');
  assert.equal(html(h(Section, { slim: true, rule: true, bare: true }, "가")), '<section class="n-sect slim ruled">가</section>');
});

test("Page: 맨 바깥 판, light 는 흰 바탕", () => {
  assert.equal(html(h(Page, null, "가")), '<div class="night n-page">가</div>');
  assert.equal(html(h(Page, { light: true }, "가")), '<div class="night light n-page">가</div>');
  assert.equal(html(h(Page, { as: "main", light: true, className: "pb-24" }, "가")), '<main class="night light n-page pb-24">가</main>');
});

test("PhotoPanel: 사진은 판의 바로 아래에, 글은 안쪽 상자에", () => {
  assert.equal(
    html(h(PhotoPanel, { media: h("img", { src: "/hall.jpg", alt: "강의 현장", loading: "lazy" }) }, h(Title, { line: "**현장**에서" }))),
    '<div class="n-photo"><img src="/hall.jpg" alt="강의 현장" loading="lazy"/><div class="n-photo-in"><h2 class="n-title">현장<span class="lo-inline">에서</span></h2></div></div>',
  );
  assert.match(html(h(PhotoPanel, { as: "figure", id: "teacher" })), /^<figure class="n-photo" id="teacher"><div class="n-photo-in"><\/div><\/figure>$/);
});

test("Title, SectionHead", () => {
  assert.equal(html(h(Title, { line: "**직무별** 교육 과정" })), '<h2 class="n-title">직무별<span class="lo-inline"> 교육 과정</span></h2>');
  assert.equal(html(h(SectionHead, { title: "교육 과정" })), '<div class="n-head"><h2 class="n-title">교육 과정</h2></div>');
  assert.equal(
    html(h(SectionHead, { title: "교육 과정", rule: true }, "직무에 맞춰 고릅니다.")),
    '<div class="n-head ruled"><h2 class="n-title">교육 과정</h2><div><p class="n-body">직무에 맞춰 고릅니다.</p></div></div>',
  );
});

test("Rows, Row", () => {
  assert.equal(
    html(h(Rows, { as: "ol" }, h(Row, { as: "li", label: "업무 파악" }, "먼저 만들 것을 정합니다."))),
    '<ol class="n-rows"><li class="n-row"><h3 class="n-row-label">업무 파악</h3><p class="n-body">먼저 만들 것을 정합니다.</p></li></ol>',
  );
  assert.match(html(h(Row, { label: "기간", wide: true }, h("span", null, "1년"))), /^<div class="n-row wide-label">/);
});

test("Pill, TextLink: as 로 태그를 바꾸고 나머지 속성은 그대로 넘긴다", () => {
  assert.equal(html(h(Pill, { href: "/contact" }, "문의")), '<a class="n-pill" href="/contact">문의</a>');
  assert.equal(html(h(Pill, { as: "button", type: "button", ghost: true }, "시작")), '<button class="n-pill ghost" type="button">시작</button>');
  assert.equal(html(h(Pill, { as: "button", type: "submit", sm: true }, "저장")), '<button class="n-pill sm" type="submit">저장</button>');
  assert.equal(html(h(Pill, { href: "#", ghost: true, sm: true }, "취소")), '<a class="n-pill ghost sm" href="#">취소</a>');
  assert.equal(html(h(TextLink, { href: "/about", arrow: true }, "회사소개 보기")), '<a class="n-link" href="/about">회사소개 보기<span aria-hidden="true">→</span></a>');
});

test("PageHead, CtaBand", () => {
  assert.equal(
    html(h(PageHead, { title: "교육 과정", lead: "직무에 맞춰 고릅니다." })),
    '<header class="n-wrap n-page-head"><div class="n-head"><h1 class="n-title">교육 과정</h1><p class="n-body">직무에 맞춰 고릅니다.</p></div></header>',
  );
  assert.match(html(h(CtaBand, { title: "**시간표**를 받아 보세요", actions: h(Pill, { href: "#" }, "문의") })), /^<div class="n-cta-band"><h2 class="n-title">시간표<span class="lo-inline">를 받아 보세요<\/span><\/h2><div class="n-actions">/);
});

test("컴포넌트가 쓰는 클래스는 모두 CSS 에 있다", () => {
  const names = JSON.parse(readFileSync(new URL("../dist/classes.json", import.meta.url), "utf8"));
  const known = new Set([...names.classes, ...names.modifiers, "night"]);
  const markup = [
    html(h(PageHead, { title: "가", lead: "나", actions: h(Pill, { href: "#", ghost: true }, "다") })),
    html(h(SectionHead, { title: "**가** 나", label: "다", rule: true }, "라")),
    html(h(Rows, null, h(Row, { label: "가", wide: true }, "나"))),
    html(h(CtaBand, { title: "가", body: "나", actions: h(TextLink, { href: "#", arrow: true }, "다") })),
    html(h(Section, { rule: true, slim: true }, h(Body, { line: "**가** 나" }))),
    html(h(PhotoPanel, { media: h("img", { src: "#", alt: "", loading: "lazy" }) }, h(Title, { line: "**가** 나" }))),
  ].join("");
  for (const m of markup.matchAll(/class="([^"]+)"/g)) for (const c of m[1].split(" ")) assert.ok(known.has(c), `CSS 에 없는 클래스: ${c}`);
});
