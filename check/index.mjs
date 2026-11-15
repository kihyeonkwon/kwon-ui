// kwon-ui 검사기. 앱 코드가 디자인 시스템을 벗어난 곳을 찾는다.
// - CSS: 색·글자 크기·굵기·모서리 값을 직접 쓴 곳, 시스템 조각과 토큰을 앱에서 다시 정의한 곳
// - TSX: style 과 Tailwind 유틸리티로 색·글자를 직접 정한 곳
// 이미 있는 위반은 기준선(baseline)에 적어 두고, 파일별로 그 수가 늘어날 때만 실패한다.
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const here = dirname(fileURLToPath(import.meta.url));

export const RULES = {
  "raw-color": "색 값을 직접 썼습니다. var(--n-…) 토큰을 쓰거나, 앱 고유의 색이면 앱 토큰 파일에서 변수로 정의합니다.",
  "raw-font-size": "글자 크기를 직접 썼습니다. var(--n-fs-title), var(--n-fs-body), var(--n-fs-small) 가운데 하나를 씁니다.",
  "font-weight": "굵기는 400과 500 두 가지입니다.",
  "raw-radius": "모서리 값을 직접 썼습니다. var(--n-radius), var(--n-radius-md), var(--n-radius-pill) 가운데 하나를 씁니다.",
  "system-redefine": "kwon-ui 의 조각을 앱에서 다시 정의했습니다. 고칠 것이 있으면 kwon-ui 에 제안합니다.",
  "reserved-prefix": "n- 으로 시작하는 이름은 kwon-ui 에서만 만듭니다. 앱의 조각은 앱 접두어로 짓습니다.",
  "token-redefine": "--n- 토큰은 kwon-ui 에서만 정합니다.",
  "inline-style": "style 에 색·글자 값을 직접 썼습니다. kwon-ui 조각과 토큰을 씁니다.",
  "tw-arbitrary": "Tailwind 임의 값으로 색·글자·모서리를 정했습니다. kwon-ui 조각과 토큰을 씁니다.",
  "tw-type": "Tailwind 글자 크기·굵기 유틸리티 대신 Title, Body, Small 을 씁니다.",
  "tw-color": "Tailwind 색 유틸리티 대신 kwon-ui 조각과 토큰을 씁니다.",
};
// 실패로 치지 않고 수만 알려 주는 것
export const WARNINGS = {
  "system-override": "kwon-ui 조각을 페이지 문맥에서 덮어썼습니다. 자주 되풀이되면 kwon-ui 에 변형을 제안합니다.",
};

export const DEFAULT_CONFIG = {
  roots: ["src"],
  extensions: [".css", ".tsx"],
  exclude: [],
  tokenFiles: [],
  scopes: ["night", "paper"],
  baseline: "kwon-ui.baseline.json",
};

export function loadSystem() {
  const p = join(here, "..", "dist", "classes.json");
  if (!existsSync(p)) throw new Error("dist/classes.json 이 없습니다. kwon-ui 를 먼저 빌드합니다(npm run build).");
  const j = JSON.parse(readFileSync(p, "utf8"));
  return { version: j.version, classes: new Set(j.classes), modifiers: new Set(j.modifiers), tokens: new Set(j.tokens) };
}

export function loadConfig(cwd) {
  const p = join(cwd, "kwon-ui.config.json");
  const user = existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : {};
  return { ...DEFAULT_CONFIG, ...user, found: existsSync(p) };
}

const posix = (p) => p.split(sep).join("/");
const strip = (v) => v.replace(/url\([^)]*\)/gi, "").replace(/(["'])(?:\\.|(?!\1).)*\1/g, "");
const COLOR = /#[0-9a-fA-F]{3,8}(?![\w-])|(?<![\w-])(?:rgba?|hsla?|oklch|oklab|lab|lch|hwb)\(|(?<![\w-])(?:white|black)(?![\w-])/i;
const RADIUS_OK = /^(?:0|50%|100%|999px|9999px|inherit|initial|unset|var\(--[\w-]+(?:,[^)]*)?\))$/;
const WEIGHT_OK = /^(?:400|500|normal|inherit|initial|unset|var\(--[\w-]+(?:,[^)]*)?\))$/;
const SIZE_KEYWORD = /^(?:inherit|initial|unset|1em|100%|0)$/;

/** CSS 한 파일을 검사한다. */
export function checkCss(source, { file = "", system, config = DEFAULT_CONFIG } = {}) {
  const out = [];
  const add = (rule, node, text) => out.push({ rule, line: node.source?.start?.line ?? 0, text: text.replace(/\s+/g, " ").slice(0, 120) });
  const isTokenFile = config.tokenFiles.map(posix).includes(posix(file));
  const scopes = new Set(config.scopes);
  let root;
  try {
    root = postcss.parse(source, { from: file || undefined });
  } catch (e) {
    return [{ rule: "parse-error", line: e.line ?? 0, text: String(e.reason ?? e.message) }];
  }
  const inTheme = (node) => {
    for (let p = node.parent; p; p = p.parent) if (p.type === "atrule" && p.name === "theme") return true;
    return false;
  };

  root.walkDecls((d) => {
    const prop = d.prop.toLowerCase();
    const value = strip(d.value);
    const shown = `${d.prop}: ${d.value}`;
    if (prop.startsWith("--")) {
      if (prop.startsWith("--n-")) add("token-redefine", d, shown);
      // 변수 정의는 앱 토큰 파일과 @theme 안에서만 값을 직접 쓸 수 있다
      if (!isTokenFile && !inTheme(d) && COLOR.test(value)) add("raw-color", d, shown);
      return;
    }
    if (COLOR.test(value) && prop !== "content" && prop !== "font-family") add("raw-color", d, shown);
    if (prop === "font-size" || prop === "font") {
      const rest = value.replace(/var\((?:[^()]|\([^()]*\))*\)/g, "");
      const literal = /\d/.test(rest) && !SIZE_KEYWORD.test(value.trim());
      if (prop === "font" || literal || (!/var\(--/.test(value) && !SIZE_KEYWORD.test(value.trim()))) add("raw-font-size", d, shown);
    }
    if (prop === "font-weight" && !WEIGHT_OK.test(value.trim())) add("font-weight", d, shown);
    if (/^border(?:-(?:top|bottom|start|end)-(?:left|right|start|end))?-radius$/.test(prop)) {
      const parts = value.replace(/var\((?:[^()]|\([^()]*\))*\)/g, "var(--x)").split(/[\s/]+/).filter(Boolean);
      if (parts.some((p) => !RADIUS_OK.test(p))) add("raw-radius", d, shown);
    }
  });

  if (system) {
    root.walkRules((rule) => {
      if (rule.parent?.type === "atrule" && /keyframes$/i.test(rule.parent.name)) return;
      for (const sel of rule.selectors ?? []) {
        const classes = (sel.match(/\.(-?[a-zA-Z_][\w-]*)/g) ?? []).map((c) => c.slice(1));
        const reserved = classes.filter((c) => c.startsWith("n-"));
        if (!reserved.length) continue;
        if (reserved.some((c) => !system.classes.has(c))) {
          add("reserved-prefix", rule, sel);
        } else if (classes.every((c) => c.startsWith("n-") || scopes.has(c) || system.modifiers.has(c))) {
          add("system-redefine", rule, sel);
        } else {
          add("system-override", rule, sel);
        }
      }
    });
  }
  return out;
}

const TW_VARIANT = String.raw`(?<![\w-])(?:[a-z0-9-]+:)*`;
const TW_TYPE = new RegExp(TW_VARIANT + String.raw`(?:text-(?:xs|sm|base|lg|xl|[2-9]xl)|font-(?:thin|extralight|light|semibold|bold|extrabold|black))(?![\w-])`);
const TW_COLOR = new RegExp(
  TW_VARIANT +
    String.raw`(?:text|bg|border|ring|fill|stroke|from|to|via|decoration|divide|outline|placeholder|caret|accent)-(?:white|black|(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3})(?:\/\d{1,3})?(?![\w-])`,
);
const TW_ARBITRARY = new RegExp(TW_VARIANT + String.raw`(text|bg|border|ring|fill|stroke|from|to|via|shadow|outline|decoration|divide|rounded(?:-[a-z]{1,2})?|leading|tracking|font)-\[([^\]]+)\]`, "g");
const STYLE_KEYS = /(?<![\w-])(color|background|backgroundColor|borderColor|fontSize|fontWeight|borderRadius|letterSpacing|lineHeight|fontFamily)\s*:\s*([^,}\n]+)/g;

/** TSX 한 파일을 검사한다(문자열과 style 속성을 정규식으로 훑는다). */
export function checkTsx(source) {
  const out = [];
  const lines = source.split("\n");
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/(["'`])((?:\\.|(?!\1).)*)\1/g)) {
      const s = m[2];
      if (!s || s.length > 600) continue;
      const type = s.match(TW_TYPE);
      if (type) out.push({ rule: "tw-type", line: i + 1, text: type[0] });
      const color = s.match(TW_COLOR);
      if (color) out.push({ rule: "tw-color", line: i + 1, text: color[0] });
      for (const a of s.matchAll(TW_ARBITRARY)) {
        const [whole, prop, val] = a;
        if (/var\(--/.test(val)) continue; // 토큰을 가리키는 임의 값은 허용
        const colorish = COLOR.test(val);
        const sizeish = /^\d*\.?\d+(?:px|rem|em|%)$/.test(val);
        const isTypeProp = /^(?:rounded|leading|tracking|font)/.test(prop);
        if (isTypeProp || colorish || (prop === "text" && sizeish)) out.push({ rule: "tw-arbitrary", line: i + 1, text: whole });
      }
    }
  });
  for (const m of source.matchAll(/style=\{\{([\s\S]*?)\}\}/g)) {
    const base = source.slice(0, m.index).split("\n").length;
    for (const k of m[1].matchAll(STYLE_KEYS)) {
      const v = k[2].trim();
      const literal = /^["'`\d]/.test(v) && !/var\(--/.test(v);
      if (literal) out.push({ rule: "inline-style", line: base + m[1].slice(0, k.index).split("\n").length - 1, text: `${k[1]}: ${v}`.slice(0, 120) });
    }
  }
  return out;
}

export function checkFile(abs, { cwd, system, config }) {
  const rel = posix(relative(cwd, abs));
  const source = readFileSync(abs, "utf8");
  const found = abs.endsWith(".css") ? checkCss(source, { file: rel, system, config }) : checkTsx(source);
  return found.map((v) => ({ ...v, file: rel }));
}

/** 설정의 roots 아래에서 검사할 파일을 모은다. */
export function collect(cwd, config) {
  const files = [];
  const skip = config.exclude.map(posix);
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (name === "node_modules" || name.startsWith(".")) continue;
      const abs = join(dir, name);
      const rel = posix(relative(cwd, abs));
      if (skip.some((x) => rel === x || rel.startsWith(x.endsWith("/") ? x : x + "/"))) continue;
      if (statSync(abs).isDirectory()) walk(abs);
      else if (config.extensions.some((e) => name.endsWith(e))) files.push(abs);
    }
  };
  for (const r of config.roots) if (existsSync(join(cwd, r))) walk(join(cwd, r));
  return files.sort();
}

/** 위반을 파일과 규칙별 수로 줄인다(경고와 파싱 오류는 빼고 센다). */
export function summarize(violations) {
  const files = {};
  for (const v of violations) {
    if (!(v.rule in RULES)) continue;
    files[v.file] ??= {};
    files[v.file][v.rule] = (files[v.file][v.rule] ?? 0) + 1;
  }
  return files;
}

/** 기준선보다 늘어난 (파일, 규칙)만 고른다. */
export function overBaseline(counts, baseline) {
  const over = [];
  for (const [file, rules] of Object.entries(counts)) {
    for (const [rule, n] of Object.entries(rules)) {
      const base = baseline?.files?.[file]?.[rule] ?? 0;
      if (n > base) over.push({ file, rule, count: n, base });
    }
  }
  return over;
}

/**
 * 검사를 돌린다. files 를 주면 그 파일만, 없으면 설정의 roots 전체를 본다.
 * 돌려주는 값: violations(전부), over(기준선보다 늘어난 것), counts, baseline
 */
export function run({ cwd = process.cwd(), files, useBaseline = true } = {}) {
  cwd = resolve(cwd);
  const config = loadConfig(cwd);
  const system = loadSystem();
  const targets = (files?.length ? files.map((f) => resolve(cwd, f)) : collect(cwd, config)).filter(
    (f) => existsSync(f) && config.extensions.some((e) => f.endsWith(e)),
  );
  const violations = targets.flatMap((f) => checkFile(f, { cwd, system, config }));
  const counts = summarize(violations);
  const basePath = join(cwd, config.baseline);
  const baseline = useBaseline && existsSync(basePath) ? JSON.parse(readFileSync(basePath, "utf8")) : null;
  return { config, system, targets, violations, counts, baseline, over: overBaseline(counts, baseline) };
}

export function writeBaseline(cwd = process.cwd()) {
  cwd = resolve(cwd);
  const r = run({ cwd, useBaseline: false });
  const body = { kwonUi: r.system.version, files: Object.fromEntries(Object.entries(r.counts).sort(([a], [b]) => a.localeCompare(b))) };
  writeFileSync(join(cwd, r.config.baseline), JSON.stringify(body, null, 2) + "\n");
  return { path: r.config.baseline, total: Object.values(r.counts).reduce((s, x) => s + Object.values(x).reduce((a, b) => a + b, 0), 0), files: Object.keys(r.counts).length };
}
