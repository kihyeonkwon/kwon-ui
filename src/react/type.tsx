import type { ElementType, ReactNode } from "react";
import { hi, titleText } from "./tone.js";
import { cx, type PolyProps } from "./util.js";

type LineProps = {
  /** "**진한 낱말** 나머지" 꼴의 한 줄. children 대신 쓴다 */
  line?: string;
  /** 화면 낭독기만 읽는 구간 이름 */
  label?: string;
  className?: string;
  children?: ReactNode;
};

/** 첫 화면 제목. 한 페이지에 한 번만 쓴다. */
export function Display<T extends ElementType = "h1">({ as, line, label, className, children, ...rest }: PolyProps<T, LineProps>) {
  const Tag: ElementType = as ?? "h1";
  return (
    <Tag className={cx("n-display", className)} {...rest}>
      {children ?? (line ? titleText(line, label) : null)}
    </Tag>
  );
}

/** 구간 제목. 한 문장 한 줄로 쓰고 진한 글자는 핵심 낱말 한두 개에만 준다. */
export function Title<T extends ElementType = "h2">({ as, line, label, className, children, ...rest }: PolyProps<T, LineProps>) {
  const Tag: ElementType = as ?? "h2";
  return (
    <Tag className={cx("n-title", className)} {...rest}>
      {children ?? (line ? titleText(line, label) : null)}
    </Tag>
  );
}

type TextProps = { className?: string; children?: ReactNode };

/** 본문. line 을 주면 "**진한 낱말** 나머지" 꼴에서 ** 로 감싼 곳만 진하게 그린다. */
export function Body<T extends ElementType = "p">({ as, line, className, children, ...rest }: PolyProps<T, TextProps & { line?: string }>) {
  const Tag: ElementType = as ?? "p";
  return (
    <Tag className={cx("n-body", className)} {...rest}>
      {children ?? (line ? hi(line) : null)}
    </Tag>
  );
}

/** 목록이나 카드 안의 작은 제목. 본문과 같은 크기이고 진한 글자다. */
export function CardTitle<T extends ElementType = "h3">({ as, className, ...rest }: PolyProps<T, TextProps>) {
  const Tag: ElementType = as ?? "h3";
  return <Tag className={cx("n-card-title", className)} {...rest} />;
}

/** 작은 글: 캡션, 기준, 라벨. num 을 주면 숫자 폭을 맞춘다. */
export function Small<T extends ElementType = "p">({ as, num, className, ...rest }: PolyProps<T, TextProps & { num?: boolean }>) {
  const Tag: ElementType = as ?? "p";
  return <Tag className={cx("n-small", num && "n-num", className)} {...rest} />;
}
