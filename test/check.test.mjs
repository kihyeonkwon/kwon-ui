// 검사기 시험. 먼저 npm run build 로 dist/classes.json 을 만든 뒤 돌린다(npm run verify).
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { checkCss, checkTsx, DEFAULT_CONFIG, loadSystem, overBaseline, run, summarize, writeBaseline } from "../check/index.mjs";

const system = loadSystem();
const css = (src, extra = {}) => checkCss(src, { file: "src/app/page.css", system, config: { ...DEFAULT_CONFIG, ...extra } }).map((v) => v.rule);
const tsx = (src) => checkTsx(src).map((v) => v.rule);

test("색 값을 직접 쓰면 잡는다", () => {
  assert.deepEqual(css(".x { color: #fff }"), ["raw-color"]);
  assert.deepEqual(css(".x { background: rgba(255, 255, 255, 0.08) }"), ["raw-color"]);
  assert.deepEqual(css(".x { border: 1px solid white }"), ["raw-color"]);
  assert.deepEqual(css(".x { color: var(--n-hi); border-top: 1px solid var(--n-line) }"), []);
  assert.deepEqual(css('.x { background: url("data:image/svg+xml,%23fff"); content: "#fff" }'), []);
  assert.deepEqual(css(".x { background: color-mix(in srgb, var(--n-hi) 20%, transparent) }"), []);
});

test("글자 크기와 굵기는 토큰과 두 가지 굵기만", () => {
  assert.deepEqual(css(".x { font-size: 16px }"), ["raw-font-size"]);
  assert.deepEqual(css(".x { font-size: clamp(26px, 2.4vw, 32px) }"), ["raw-font-size"]);
  assert.deepEqual(css(".x { font: 500 16px/1.5 sans-serif }"), ["raw-font-size"]);
  assert.deepEqual(css(".x { font-size: var(--n-fs-body) }"), []);
  assert.deepEqual(css(".x { font-size: inherit }"), []);
  assert.deepEqual(css(".x { font-weight: 700 }"), ["font-weight"]);
  assert.deepEqual(css(".x { font-weight: 500 } .y { font-weight: 400 }"), []);
});

test("모서리는 토큰이나 0, 50%, 999px", () => {
  assert.deepEqual(css(".x { border-radius: 12px }"), ["raw-radius"]);
  assert.deepEqual(css(".x { border-radius: var(--n-radius-md) } .y { border-radius: 999px } .z { border-radius: 50% }"), []);
  assert.deepEqual(css(".x { border-top-left-radius: 8px }"), ["raw-radius"]);
});

test("시스템 조각과 토큰을 앱에서 다시 정의하면 잡는다", () => {
  assert.deepEqual(css(".night .n-title { letter-spacing: 0 }"), ["system-redefine"]);
  assert.deepEqual(css(".n-row > .n-row-label { letter-spacing: 0 }"), ["system-redefine"]);
  assert.deepEqual(css(".night .n-title .lo-inline { opacity: 0.5 }"), ["system-redefine"]);
  assert.deepEqual(css(".n-brand-new { display: block }"), ["reserved-prefix"]);
  assert.deepEqual(css(".night { --n-hi: var(--x) }"), ["token-redefine"]);
});

test("페이지 문맥에서 덮어쓴 것은 경고로만 센다", () => {
  const found = checkCss(".cp-letter .n-media { aspect-ratio: 4 / 5 }", { file: "a.css", system, config: DEFAULT_CONFIG });
  assert.deepEqual(found.map((v) => v.rule), ["system-override"]);
  assert.deepEqual(summarize(found.map((v) => ({ ...v, file: "a.css" }))), {});
});

test("앱 토큰 파일과 @theme 안에서는 변수 값으로 색을 쓸 수 있다", () => {
  assert.deepEqual(css(":root { --cp-marker: #ffe45c }"), ["raw-color"]);
  assert.deepEqual(css(":root { --cp-marker: #ffe45c }", { tokenFiles: ["src/app/page.css"] }), []);
  assert.deepEqual(css("@theme { --color-brand: #1420e6 }"), []);
  // 토큰 파일이어도 일반 선언에는 값을 직접 쓸 수 없다
  assert.deepEqual(css(".x { color: #fff }", { tokenFiles: ["src/app/page.css"] }), ["raw-color"]);
});

test("키프레임과 평범한 앱 클래스는 건드리지 않는다", () => {
  assert.deepEqual(css("@keyframes spin { from { transform: rotate(0) } to { transform: rotate(360deg) } }"), []);
  assert.deepEqual(css(".cp-hero { display: grid; gap: 24px; padding: 40px var(--n-gutter) }"), []);
});

test("TSX: Tailwind 로 글자와 색을 직접 정하면 잡는다", () => {
  assert.deepEqual(tsx('<p className="text-lg font-bold">x</p>'), ["tw-type"]);
  assert.deepEqual(tsx('<p className="text-white">x</p>'), ["tw-color"]);
  assert.deepEqual(tsx('<p className="md:bg-zinc-900/50">x</p>'), ["tw-color"]);
  assert.deepEqual(tsx('<p className="text-[13px]">x</p>'), ["tw-arbitrary"]);
  assert.deepEqual(tsx('<p className="rounded-[20px]">x</p>'), ["tw-arbitrary"]);
  assert.deepEqual(tsx('<p className="bg-[#111]">x</p>'), ["tw-arbitrary"]);
});

test("TSX: 조각, 배치 유틸리티, 토큰을 가리키는 값은 그대로 둔다", () => {
  assert.deepEqual(tsx('<h2 className="n-title mt-6 max-w-[34em] grid-cols-[200px_1fr]">x</h2>'), []);
  assert.deepEqual(tsx('<div className="bg-[var(--n-card)] rounded-[var(--n-radius-md)] border-[3px] font-medium">x</div>'), []);
  assert.deepEqual(tsx("<p>글 안의 text-large 같은 낱말</p>"), []);
});

test("TSX: style 에 색과 글자 값을 직접 쓰면 잡는다", () => {
  assert.deepEqual(tsx('<p style={{ color: "#fff", marginTop: 8 }}>x</p>'), ["inline-style"]);
  assert.deepEqual(tsx("<p style={{ fontSize: 14 }}>x</p>"), ["inline-style"]);
  assert.deepEqual(tsx('<p style={{ color: "var(--n-mid)", marginBottom: 0, width: `${w}%` }}>x</p>'), []);
});

test("기준선: 파일별 수가 늘어날 때만 실패한다", () => {
  const counts = { "a.css": { "raw-color": 3 }, "b.tsx": { "tw-type": 1 } };
  assert.deepEqual(overBaseline(counts, { files: { "a.css": { "raw-color": 3 }, "b.tsx": { "tw-type": 2 } } }), []);
  assert.deepEqual(overBaseline(counts, { files: { "a.css": { "raw-color": 2 } } }), [
    { file: "a.css", rule: "raw-color", count: 3, base: 2 },
    { file: "b.tsx", rule: "tw-type", count: 1, base: 0 },
  ]);
  assert.equal(overBaseline(counts, null).length, 2);
});

test("폴더 전체 검사와 기준선 쓰기", () => {
  const dir = mkdtempSync(join(tmpdir(), "kwon-ui-"));
  mkdirSync(join(dir, "src/app"), { recursive: true });
  writeFileSync(join(dir, "kwon-ui.config.json"), JSON.stringify({ tokenFiles: ["src/app/tokens.css"] }));
  writeFileSync(join(dir, "src/app/tokens.css"), ":root { --cp-marker: #ffe45c }\n");
  writeFileSync(join(dir, "src/app/page.css"), ".cp-a { color: #fff }\n.cp-b { font-size: 13px }\n");
  writeFileSync(join(dir, "src/app/page.tsx"), 'export default () => <p className="n-body">x</p>;\n');
  let r = run({ cwd: dir });
  assert.equal(r.targets.length, 3);
  assert.deepEqual(r.counts, { "src/app/page.css": { "raw-color": 1, "raw-font-size": 1 } });
  assert.equal(r.over.length, 2);
  assert.equal(writeBaseline(dir).total, 2);
  assert.equal(run({ cwd: dir }).over.length, 0);
  // 위반이 하나 늘면 그 파일의 그 규칙만 실패한다
  writeFileSync(join(dir, "src/app/page.css"), ".cp-a { color: #fff }\n.cp-b { font-size: 13px }\n.cp-c { color: #000 }\n");
  r = run({ cwd: dir });
  assert.deepEqual(r.over, [{ file: "src/app/page.css", rule: "raw-color", count: 2, base: 1 }]);
  // 파일 하나만 볼 때도 같다(훅이 이렇게 부른다)
  assert.equal(run({ cwd: dir, files: ["src/app/page.tsx"] }).over.length, 0);
});
