import { Fragment, type ReactNode } from "react";

/**
 * 한 줄 두 톤 제목. 글은 "**진한 낱말** 나머지" 꼴로 쓴다.
 * ** 로 감싼 곳만 진한 글자(제목 기본색)이고, 나머지는 같은 줄의 회색(.lo-inline)이다.
 * 진한 글자는 문장의 핵심 낱말 한두 개에만 준다. 숫자는 숫자가 요점일 때만 진하게 둔다.
 * label 을 주면 화면 낭독기만 읽는 구간 이름을 앞에 붙인다(보이는 문장에 구간 이름이 없을 때).
 */
export function tone(line: string, label?: string): ReactNode {
  const parts = line.split(/(\*\*[^*]+\*\*)/).filter(Boolean);
  return (
    <>
      {label ? <span className="n-sr">{label}. </span> : null}
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <Fragment key={i}>{p.slice(2, -2)}</Fragment>
        ) : (
          <span key={i} className="lo-inline">
            {p}
          </span>
        ),
      )}
    </>
  );
}

/**
 * 제목 글. ** 표시가 있으면 두 톤으로, 없으면 전부 진한 글자로 그린다.
 * (tone 은 표시가 없는 글을 전부 회색으로 그리므로, 표시 없는 제목은 이 함수를 거친다.)
 */
export function titleText(line: string, label?: string): ReactNode {
  if (line.includes("**")) return tone(line, label);
  return (
    <>
      {label ? <span className="n-sr">{label}. </span> : null}
      {line}
    </>
  );
}
