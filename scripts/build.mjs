// 빌드: (1) 타입스크립트 → dist/react (2) CSS 를 한 파일로 → dist/kwon-ui.css
// (3) 시스템 이름 목록 → dist/classes.json (4) 카탈로그 → CATALOG.md, site/index.html
// 사용: npm run build
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import postcss from "postcss";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const read = (p) => readFileSync(join(root, p), "utf8");

// 합치는 순서가 곧 우선순위다(특이도가 같으면 뒤에 온 규칙이 이긴다). 바꾸지 않는다.
const CSS_FILES = ["tokens.css", "base.css", "type.css", "layout.css", "controls.css", "timeline.css", "content.css", "form.css", "nav.css"];

rmSync(join(root, "dist"), { recursive: true, force: true });
rmSync(join(root, "site"), { recursive: true, force: true });
mkdirSync(join(root, "dist"), { recursive: true });
mkdirSync(join(root, "site"), { recursive: true });

// 1. 타입스크립트
execFileSync(process.execPath, [join(root, "node_modules/typescript/bin/tsc"), "-p", root], { stdio: "inherit" });

// 2. CSS
const banner = `/* kwon-ui ${pkg.version}. 이 파일은 빌드 결과다. 앱에서 고치지 않는다. 원본: src/css/ */\n`;
const css = banner + CSS_FILES.map((f) => `\n/* ── ${f} ── */\n` + read(`src/css/${f}`).trim() + "\n").join("");
writeFileSync(join(root, "dist/kwon-ui.css"), css);

// 3. 시스템 이름 목록: 검사기가 이 목록으로 "앱에서 다시 정의했는지"를 본다
const ast = postcss.parse(css);
const classes = new Set();
const modifiers = new Set();
const tokens = [];
ast.walkRules((rule) => {
  for (const name of rule.selector.match(/\.(-?[a-zA-Z_][\w-]*)/g) ?? []) {
    const n = name.slice(1);
    if (n === "night") continue;
    (n.startsWith("n-") ? classes : modifiers).add(n);
  }
});
ast.walkDecls((d) => {
  if (d.prop.startsWith("--") && d.parent.selector === ".night" && d.parent.parent.type === "root") {
    tokens.push({ name: d.prop, value: d.value.replace(/\s+/g, " ") });
  }
});
const names = { version: pkg.version, scope: "night", classes: [...classes].sort(), modifiers: [...modifiers].sort(), tokens: tokens.map((t) => t.name) };
writeFileSync(join(root, "dist/classes.json"), JSON.stringify(names, null, 2) + "\n");

// 4. 카탈로그
const { ENTRIES, GROUPS } = await import(pathToFileURL(join(root, "dist/catalog/manifest.js")).href);
const { renderToStaticMarkup } = await import("react-dom/server");
const { createElement, Fragment } = await import("react");
const { tone } = await import(pathToFileURL(join(root, "dist/react/index.js")).href);

// 항목이 쓰는 클래스가 실제로 CSS 에 있는지 본다(문서와 코드가 어긋나지 않게)
for (const e of ENTRIES) {
  for (const c of e.classes) {
    if (c !== "night" && !classes.has(c) && !modifiers.has(c)) throw new Error(`카탈로그 항목 ${e.id}: CSS 에 없는 클래스 ${c}`);
  }
}
const documented = new Set(ENTRIES.flatMap((e) => e.classes));
const missing = [...classes].filter((c) => !documented.has(c) && c !== "n-sr");
if (missing.length) throw new Error(`카탈로그에 없는 클래스: ${missing.join(", ")} (src/catalog/manifest.tsx 에 항목을 더한다)`);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const html = (node) => renderToStaticMarkup(createElement(Fragment, null, node));
const isColor = (v) => /^(#|rgba?\()/.test(v);

// CATALOG.md
const md = [];
md.push(`# kwon-ui 카탈로그`, ``);
md.push(`버전 ${pkg.version}. 이 파일은 \`npm run build\` 가 \`src/catalog/manifest.tsx\` 에서 만든다. 직접 고치지 않는다.`, ``);
md.push(`화면을 만들기 전에 이 목록에서 고른다. 여기 없는 조각이 필요하면 페이지에서 새로 만들지 않고, kwon-ui 에 추가를 제안한다.`, ``);
md.push(`## 쓰는 법`, ``);
md.push("```tsx", `import "kwon-ui/kwon-ui.css"; // 앱의 레이아웃에서 한 번`, `import { Page, PageHead, Section, SectionHead, Rows, Row, Pill, TextLink } from "kwon-ui";`, "```", ``);
md.push(`- 페이지 맨 바깥에 \`.night\` 가 있어야 한다(\`<Page>\` 가 붙인다).`);
md.push(`- 색, 글자 크기, 모서리, 폭은 토큰(\`var(--n-…)\`)으로만 쓴다. 값을 직접 쓰지 않는다.`);
md.push(`- 링크는 \`as\` 로 프레임워크의 링크 컴포넌트를 넘긴다: \`<Pill as={Link} href="/contact">\`.`);
md.push(`- 조각에는 바깥 여백(margin)이 없다. 조각 사이 간격은 앱에서 준다.`);
md.push(`- 제목은 \`"**진한 낱말** 나머지"\` 꼴의 한 줄로 쓴다. 진한 글자는 핵심 낱말 한두 개에만 준다.`, ``);
md.push(`## 한눈에`, ``, `| 조각 | 컴포넌트 | 클래스 | 언제 |`, `|---|---|---|---|`);
for (const e of ENTRIES) md.push(`| ${e.name} | ${e.component ? e.component.split(", ").map((c) => `\`<${c}>\``).join(" ") : "(클래스만)"} | \`.${e.id}\` | ${e.use} |`);
md.push(``);
for (const g of GROUPS) {
  md.push(`## ${g.name}`, ``, `${g.line.replace(/\*\*/g, "")}. ${g.note}`, ``);
  for (const e of ENTRIES.filter((x) => x.group === g.name)) {
    md.push(`### ${e.name}`, ``);
    md.push(`${e.component ? e.component.split(", ").map((c) => `\`<${c}>\``).join(", ") + " · " : ""}${e.classes.map((c) => `\`.${c}\``).join(" ")}`, ``);
    md.push(e.use + (e.avoid ? ` ${e.avoid}` : ""), ``);
    md.push("```tsx", e.code, "```", ``);
  }
}
md.push(`## 토큰`, ``, `값은 \`src/css/tokens.css\` 에만 있다. \`.night\` 안에서 쓴다.`, ``, `| 이름 | 값 |`, `|---|---|`);
for (const t of tokens) md.push(`| \`${t.name}\` | \`${t.value}\` |`);
md.push(``);
writeFileSync(join(root, "CATALOG.md"), md.join("\n"));

// site/index.html
const entryHtml = (e) => `
        <article class="cat-entry" id="${e.id}">
          <div class="cat-meta">
            <h3 class="n-card-title">${esc(e.name)}</h3>
            <p class="n-small">${e.component ? esc(e.component.split(", ").map((c) => `<${c}>`).join(" ")) : "클래스만"}</p>
          </div>
          <div class="cat-main">
            ${e.render ? `<div class="cat-stage">${html(e.render())}</div>` : ""}
            <p class="n-small">${esc(e.use)}${e.avoid ? " " + esc(e.avoid) : ""}</p>
            <pre class="cat-code"><code>${esc(e.code)}</code></pre>
          </div>
        </article>`;
const groupHtml = (g) => `
    <section class="cat-group" id="${g.name}">
      <div class="n-wrap">
        <div class="n-head ruled">
          <h2 class="n-title">${html(tone(g.line, g.name))}</h2>
          <div><p class="n-body">${esc(g.note)}</p></div>
        </div>${ENTRIES.filter((e) => e.group === g.name).map(entryHtml).join("")}
      </div>
    </section>`;
const tokenRows = tokens
  .map(
    (t) => `
          <div class="n-row">
            <p class="n-row-label cat-mono">${esc(t.name)}</p>
            <p class="n-small cat-mono">${isColor(t.value) ? `<span class="cat-swatch" style="background:${t.value}"></span>` : ""}${esc(t.value)}</p>
          </div>`,
  )
  .join("");
const page = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>kwon-ui 카탈로그</title>
<link rel="stylesheet" href="../node_modules/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css">
<link rel="stylesheet" href="../dist/kwon-ui.css">
<style>
/* 카탈로그 페이지에만 쓰는 스타일. 시스템에는 들어가지 않는다. */
*, *::before, *::after { box-sizing: border-box; }
html { font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
body { margin: 0; }
h1, h2, h3, p, ul, ol, figure, pre { margin: 0; }
ul, ol { padding: 0; list-style: none; }
a { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; }
.cat-group { padding-bottom: 96px; }
.cat-entry { display: grid; gap: 16px 24px; padding: 40px 0; border-bottom: 1px solid var(--n-line); scroll-margin-top: 24px; }
.cat-entry:last-child { border-bottom: 0; }
.cat-meta { display: grid; gap: 6px; align-content: start; }
.cat-main { display: grid; gap: 16px; min-width: 0; }
.cat-stage { border: 1px solid var(--n-line); border-radius: var(--n-radius-md); padding: 32px 24px; display: grid; gap: 12px; min-width: 0; }
.cat-stage .n-wrap { padding-inline: 0; }
.cat-stage .n-page-head { padding-bottom: 0; }
.cat-stage .n-panel { margin: 0; padding: 48px 24px; }
.cat-stage .n-head { margin-bottom: 0; }
.cat-stage .n-cta-band { padding: 32px 0 0; }
.cat-stage .n-media { max-width: 360px; }
/* 머리 메뉴는 화면에 떠 있는 조각이라, 카탈로그에서는 판 안에 붙여 펼친 모양을 보인다 */
.cat-stage .n-nav { position: relative; z-index: 0; height: 320px; overflow: hidden; }
.cat-stage .n-nav-pill, .cat-stage .n-nav-sheet { width: min(100%, 330px); min-width: 0; }
.cat-code { overflow-x: auto; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; line-height: 1.6; color: var(--n-mid); }
.cat-mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.cat-swatch { display: inline-block; width: 14px; height: 14px; margin-right: 10px; border: 1px solid var(--n-line); border-radius: 4px; vertical-align: -2px; }
.cat-foot { padding: 0 0 96px; }
@media (min-width: 768px) {
  .cat-entry { grid-template-columns: 200px minmax(0, 1fr); }
  .cat-stage { padding: 40px; }
}
</style>
</head>
<body class="night n-page">
  <header class="n-wrap n-page-head">
    <div class="n-head">
      <h1 class="n-title">kwon-ui<span class="lo-inline"> 카탈로그</span></h1>
      <p class="n-body">권앤컴퍼니의 세 제품이 같이 쓰는 조각입니다. 화면은 여기 있는 것으로 짭니다.</p>
    </div>
    <div class="n-actions">
      ${GROUPS.map((g) => `<a class="n-link" href="#${g.name}">${g.name}</a>`).join("\n      ")}
      <a class="n-link" href="#토큰">토큰</a>
    </div>
  </header>
  <main>${GROUPS.map(groupHtml).join("")}
    <section class="cat-group" id="토큰">
      <div class="n-wrap">
        <div class="n-head ruled">
          <h2 class="n-title">값은 <span class="lo-inline">토큰 한 곳에만 있습니다</span></h2>
          <div><p class="n-body">앱 코드에는 색, 글자 크기, 모서리 값을 직접 쓰지 않고 아래 변수를 씁니다.</p></div>
        </div>
        <div class="n-rows">${tokenRows}
        </div>
      </div>
    </section>
  </main>
  <footer class="n-wrap cat-foot">
    <p class="n-small">kwon-ui ${pkg.version} · 조각 ${ENTRIES.length}개 · 토큰 ${tokens.length}개</p>
  </footer>
</body>
</html>
`;
writeFileSync(join(root, "site/index.html"), page);

console.log(`kwon-ui ${pkg.version}: 클래스 ${classes.size}개, 토큰 ${tokens.length}개, 카탈로그 항목 ${ENTRIES.length}개`);
