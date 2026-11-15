# 앱에 넣는 순서

앱 하나에 kwon-ui를 넣을 때 따르는 순서입니다. 한 번에 한 앱씩, 넣기 전과 후의 화면을 같은 크기로 찍어 대조합니다.

## 1. 설치

```bash
npm install kwon-ui@0.1.0 --save-exact
```

정확한 버전을 고정합니다. 올릴 때는 `CHANGELOG.md`를 읽고 한 앱씩 올립니다.

## 2. CSS 불러오기

레이아웃에서 앱의 CSS보다 먼저 불러옵니다.

```tsx
import "kwon-ui/kwon-ui.css";
import "./globals.css";
```

- 앱의 CSS가 `@layer`로 묶여 있고 kwon-ui도 같은 층에 넣어야 하면 CSS에서 `@import "kwon-ui/kwon-ui.css" layer(components);`로 부릅니다.
- 층 없이 부르면 kwon-ui의 규칙이 Tailwind 유틸리티보다 우선합니다. 그래서 조각에는 margin과 폭이 없습니다.
- 페이지 맨 바깥에 `.night`가 있어야 합니다.
- 첫 앱에 넣을 때 그 앱의 Next.js 문서(`node_modules/next/dist/docs/`)에서 패키지의 전역 CSS를 불러오는 방법을 확인합니다.

## 3. 앱에 있던 같은 정의 지우기

```bash
npx kwon-ui check --report
```

`system-redefine`과 `token-redefine`으로 나오는 규칙이 앱에 남아 있는 같은 이름의 정의입니다. 지우고 화면을 대조합니다. 앱의 값이 kwon-ui와 달랐다면 그 차이가 화면에 나타납니다. 의도한 변형이었는지 보고, 필요하면 kwon-ui에 변형을 제안합니다.

`reserved-prefix`로 나오는 것은 앱에만 있는 `n-` 이름입니다. 한 번에 바꾸지 않아도 됩니다. 기준선에 두고, 그 파일을 고칠 때 앱 접두어로 바꿉니다.

## 4. 설정과 기준선

앱 루트에 `kwon-ui.config.json`을 둡니다.

```json
{
  "roots": ["src"],
  "exclude": [],
  "tokenFiles": ["src/app/tokens.css"]
}
```

- `roots`: 검사할 폴더. 화면과 상관없는 폴더는 `exclude`에 넣습니다.
- `tokenFiles`: 앱 고유의 색(강조색 등)을 변수로 정의하는 파일. 색 값을 직접 쓸 수 있는 곳은 여기뿐입니다.

```bash
npx kwon-ui baseline
```

지금의 위반 수가 `kwon-ui.baseline.json`에 적힙니다. 커밋합니다. 이 수는 줄어들기만 해야 합니다. 위반을 고쳤으면 다시 `baseline`을 돌려 수를 낮춥니다.

## 5. 빌드에 걸기

```json
{
  "scripts": {
    "check:design": "kwon-ui check",
    "prebuild": "npm run check:design"
  }
}
```

위반이 기준선보다 늘면 빌드가 실패합니다. 어떤 도구로 작업해도 똑같이 걸립니다.

## 6. Claude Code 훅

파일을 저장할 때마다 그 파일만 검사해서, 위반이 늘었으면 내용을 모델에게 바로 돌려줍니다. 작업 공간의 Claude Code 설정(`.claude/settings.json`)에 한 번 겁니다. 형식은 연결할 때 Claude Code 문서로 확인합니다. 출발점은 이렇습니다.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "node /경로/kwon-ui/claude/hook.mjs" }]
      }
    ]
  }
}
```

훅은 `kwon-ui.config.json`이 있는 앱 안의 `.css`, `.tsx` 파일만 봅니다. 그 밖의 파일과 오류는 조용히 지나갑니다.

## 7. 앱의 CLAUDE.md

[APP-CLAUDE.md](APP-CLAUDE.md)의 문구를 앱의 CLAUDE.md에 넣습니다.

## 넣을 때 알아 둘 차이

0.1.0의 값은 kwonandcompany.com과 같습니다(계산된 스타일 대조). 다른 두 제품은 손으로 옮기면서 생긴 작은 차이가 있어, 넣으면 그만큼 바뀝니다.

- Projects 랜딩: 제목 줄 간격 1.25 → 1.2, 본문 1.55 → 1.5, 알약 버튼 글자 사이 0.01em과 간격 10px, 글자 링크 간격 8px, 구간 머리의 세로 정렬(위 → 가운데).
- Campus: 변수 이름이 다릅니다(`--hi`, `--mid`, `--line` 등 → `--n-hi`, `--n-mid`, `--n-line`). 작은 글 줄 간격 1.5 → 1.45.
