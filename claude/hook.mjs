#!/usr/bin/env node
// Claude Code 훅(PostToolUse, Edit·Write)용. 방금 고친 파일 하나를 kwon-ui 검사기로 본다.
// 표준 입력으로 훅 JSON 을 받는다. 그 파일이 kwon-ui 를 쓰는 앱(kwon-ui.config.json 이 있는 폴더) 안에 있고
// 위반이 기준선보다 늘었으면 내용을 표준 오류로 내고 종료 코드 2로 끝낸다(모델에게 그대로 돌아간다).
// 그 밖의 경우(다른 폴더, 다른 종류의 파일, 검사기 오류)는 조용히 0으로 끝낸다. 훅 때문에 작업이 막히면 안 된다.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { pathToFileURL } from "node:url";

function read() {
  try {
    return JSON.parse(readFileSync(0, "utf8"));
  } catch {
    return {};
  }
}

const input = read();
const file = input?.tool_input?.file_path;
if (!file || !/\.(css|tsx)$/.test(file) || !existsSync(file)) process.exit(0);

// 가장 가까운 kwon-ui.config.json 을 찾는다
let app = dirname(file);
while (!existsSync(join(app, "kwon-ui.config.json"))) {
  const up = dirname(app);
  if (up === app) process.exit(0);
  app = up;
}

try {
  // 앱에 설치된 판의 검사기를 쓴다(앱마다 kwon-ui 버전이 다를 수 있다)
  const installed = join(app, "node_modules", "kwon-ui", "check", "index.mjs");
  const { run, RULES } = await import(pathToFileURL(existsSync(installed) ? installed : new URL("../check/index.mjs", import.meta.url).pathname).href);
  const r = run({ cwd: app, files: [relative(app, file)] });
  if (!r.over.length) process.exit(0);
  const lines = [`kwon-ui: ${relative(app, file)} 이 디자인 시스템을 벗어났습니다.`];
  for (const o of r.over) {
    lines.push(`[${o.rule}] ${RULES[o.rule]}`);
    for (const v of r.violations.filter((x) => x.rule === o.rule).slice(0, 6)) lines.push(`  ${v.line}: ${v.text}`);
  }
  lines.push("조각과 토큰 목록: node_modules/kwon-ui/CATALOG.md. 필요한 조각이 없으면 페이지에서 만들지 말고 kwon-ui 에 추가를 제안합니다.");
  console.error(lines.join("\n"));
  process.exit(2);
} catch {
  process.exit(0);
}
