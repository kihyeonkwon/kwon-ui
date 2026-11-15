import type { ElementType, ReactNode } from "react";
import { cx, type PolyProps } from "./util.js";

type ControlProps = { className?: string; children?: ReactNode };

/**
 * 알약 버튼. 한 화면의 주 행동 하나에 쓴다. ghost 는 어두운 면(둘째 행동).
 * 링크면 as 로 프레임워크의 링크 컴포넌트를, 단추면 as="button" 을 넘긴다.
 */
export function Pill<T extends ElementType = "a">({ as, ghost, className, ...rest }: PolyProps<T, ControlProps & { ghost?: boolean }>) {
  const Tag: ElementType = as ?? "a";
  return <Tag className={cx("n-pill", ghost && "ghost", className)} {...rest} />;
}

/** 글자 링크. 버튼 옆의 둘째 행동이나 본문 아래의 '더 보기'. arrow 를 주면 끝에 화살표가 붙는다. */
export function TextLink<T extends ElementType = "a">({
  as,
  arrow,
  className,
  children,
  ...rest
}: PolyProps<T, ControlProps & { arrow?: boolean }>) {
  const Tag: ElementType = as ?? "a";
  return (
    <Tag className={cx("n-link", className)} {...rest}>
      {children}
      {arrow ? <span aria-hidden="true">→</span> : null}
    </Tag>
  );
}

/** 버튼과 글자 링크를 나란히 놓는 줄. 버튼 하나와 링크 하나까지만 둔다. */
export function Actions({ className, children }: ControlProps) {
  return <div className={cx("n-actions", className)}>{children}</div>;
}
