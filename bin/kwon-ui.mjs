#!/usr/bin/env node
// kwon-ui 명령.
//   kwon-ui check [파일…] [--report] [--json]   검사한다. 기준선보다 위반이 늘면 종료 코드 1
//   kwon-ui baseline                             지금의 위반 수를 기준선으로 적는다
//   kwon-ui classes                              시스템 조각과 토큰 이름을 찍는다
import { loadSystem, RULES, run, WARNINGS, writeBaseline } from "../check/index.mjs";

const [cmd, ...rest] = process.argv.slice(2);
const flags = new Set(rest.filter((a) => a.startsWith("--")));
const files = rest.filter((a) => !a.startsWith("--"));

function total(counts) {
  const byRule = {};
  for (const rules of Object.values(counts)) for (const [r, n] of Object.entries(rules)) byRule[r] = (byRule[r] ?? 0) + n;
  return byRule;
}

try {
  if (cmd === "check") {
    const r = run({ files });
    if (flags.has("--json")) {
      console.log(JSON.stringify({ over: r.over, counts: r.counts, violations: r.violations }, null, 2));
      process.exit(r.over.length && !flags.has("--report") ? 1 : 0);
    }
    const byRule = total(r.counts);
    const sum = Object.values(byRule).reduce((a, b) => a + b, 0);
    const warn = r.violations.filter((v) => v.rule in WARNINGS).length;
    if (flags.has("--report")) {
      console.log(`kwon-ui ${r.system.version} 검사 보고: 파일 ${r.targets.length}개, 위반 ${sum}건, 경고 ${warn}건`);
      for (const [rule, n] of Object.entries(byRule).sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(5)}  ${rule}`);
      process.exit(0);
    }
    if (!r.over.length) {
      const note = r.baseline ? ` (기준선에 남은 위반 ${sum}건)` : "";
      console.log(`kwon-ui check: 통과${note}`);
      process.exit(0);
    }
    console.error(`kwon-ui check: 디자인 시스템을 벗어난 곳이 ${r.baseline ? "기준선보다 늘었습니다" : "있습니다"}.\n`);
    for (const o of r.over) {
      console.error(`${o.file}  [${o.rule}] ${o.base ? `${o.base}건 → ${o.count}건` : `${o.count}건`}`);
      console.error(`  ${RULES[o.rule]}`);
      for (const v of r.violations.filter((x) => x.file === o.file && x.rule === o.rule).slice(0, 8)) console.error(`  ${String(v.line).padStart(4)}: ${v.text}`);
      console.error("");
    }
    console.error("조각과 토큰 목록은 node_modules/kwon-ui/CATALOG.md 에 있습니다. 필요한 조각이 없으면 페이지에서 만들지 말고 kwon-ui 에 추가를 제안합니다.");
    process.exit(1);
  } else if (cmd === "baseline") {
    const b = writeBaseline();
    console.log(`기준선을 ${b.path} 에 적었습니다: 파일 ${b.files}개, 위반 ${b.total}건. 이 수는 줄어들기만 해야 합니다.`);
  } else if (cmd === "classes") {
    const s = loadSystem();
    console.log(`kwon-ui ${s.version}\n조각: ${[...s.classes].join(", ")}\n변형: ${[...s.modifiers].join(", ")}\n토큰: ${[...s.tokens].join(", ")}`);
  } else {
    console.log("사용: kwon-ui check [파일…] [--report] [--json] | kwon-ui baseline | kwon-ui classes");
    process.exit(cmd ? 2 : 0);
  }
} catch (e) {
  console.error(`kwon-ui: ${e.message}`);
  process.exit(2);
}
