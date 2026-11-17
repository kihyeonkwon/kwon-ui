// 빌드한 CSS 시험: 문서 라이트(html.light)와 라이트 안의 어두운 구간(.n-dark). 빌드 결과(dist)를 읽는다.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import postcss from "postcss";

const root = postcss.parse(readFileSync(new URL("../dist/kwon-ui.css", import.meta.url), "utf8"));
const findRule = (selector) => {
  let found = null;
  root.walkRules((r) => {
    if (!found && r.selectors.includes(selector)) found = r;
  });
  return found;
};
const decls = (rule) => Object.fromEntries(rule.nodes.filter((n) => n.type === "decl").map((d) => [d.prop, d.value]));
// 색이 아닌 토큰(글자 크기, 모서리, 폭, 여백, 글꼴)
const NOT_COLOR = /^--n-(fs-|radius|wrap|gutter|edge|nav-top|font)/;

test("문서 라이트: html.light .night 는 .night.light 와 같은 규칙이다", () => {
  const rule = findRule("html.light .night");
  assert.ok(rule, "html.light .night 규칙이 없다");
  assert.ok(rule.selectors.includes(".night.light"));
});

test("문서 라이트에서도 사진 판과 떠 있는 메뉴는 어두운 판이다", () => {
  for (const piece of ["n-photo", "n-nav-pill", "n-nav-sheet"]) {
    const rule = findRule(`html.light .night .${piece}`);
    assert.ok(rule, `${piece} 규칙이 없다`);
    assert.ok(rule.selectors.includes(`.night.light .${piece}`));
  }
});

test(".n-dark 는 어두운 화면의 색 토큰을 빠짐없이 같은 값으로 다시 깐다", () => {
  const dark = decls(findRule(".night"));
  const nDark = findRule("html.light .night .n-dark");
  assert.ok(nDark, ".n-dark 규칙이 없다");
  assert.ok(nDark.selectors.includes("html.light .night.n-dark"));
  assert.ok(nDark.selectors.includes(".night.light .n-dark"));
  const darkColors = Object.fromEntries(Object.entries(dark).filter(([k]) => !NOT_COLOR.test(k)));
  assert.deepEqual(decls(nDark), darkColors);
});
