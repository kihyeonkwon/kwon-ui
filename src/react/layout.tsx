import type { ElementType, ReactNode } from "react";
import { titleText } from "./tone.js";
import { cx, type PolyProps } from "./util.js";

type BoxProps = { className?: string; children?: ReactNode };

/** 하위 페이지의 맨 바깥. 검은 바탕과 떠 있는 메뉴 자리(위 여백)를 준다. */
export function Page<T extends ElementType = "div">({ as, className, ...rest }: PolyProps<T, BoxProps>) {
  const Tag: ElementType = as ?? "div";
  return <Tag className={cx("night n-page", className)} {...rest} />;
}

/** 페이지 머리: 제목 한 줄, 받쳐 주는 문단 하나, 버튼 줄. */
export function PageHead({
  title,
  label,
  lead,
  actions,
  className,
  children,
}: {
  /** 페이지 제목. "**진한 낱말** 나머지" 꼴이면 두 톤으로 그린다 */
  title: string;
  label?: string;
  lead?: ReactNode;
  /** 버튼 하나와 글자 링크 하나까지 */
  actions?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <header className={cx("n-wrap n-page-head", className)}>
      <div className="n-head">
        <h1 className="n-title">{titleText(title, label)}</h1>
        {lead ? <p className="n-body">{lead}</p> : null}
      </div>
      {actions ? <div className="n-actions">{actions}</div> : null}
      {children}
    </header>
  );
}

/**
 * 구간. 안쪽은 내용 폭(1064px)으로 감싼다. bare 를 주면 감싸지 않는다(화면 끝까지 쓰는 내용).
 * rule 은 앞 구간과의 사이에 가는 선을 긋고, slim 은 문장 하나와 버튼 하나뿐인 짧은 구간의 여백을 준다.
 */
export function Section<T extends ElementType = "section">({
  as,
  bare,
  rule,
  slim,
  className,
  children,
  ...rest
}: PolyProps<T, BoxProps & { bare?: boolean; rule?: boolean; slim?: boolean }>) {
  const Tag: ElementType = as ?? "section";
  return (
    <Tag className={cx("n-sect", slim && "slim", rule && "ruled", className)} {...rest}>
      {bare ? children : <div className="n-wrap">{children}</div>}
    </Tag>
  );
}

/** 구간 머리: 왼쪽에 한 줄 제목, 오른쪽에 본문(children). 본문이 없으면 제목이 한 줄 전체를 쓴다. */
export function SectionHead({
  title,
  label,
  rule,
  as,
  className,
  children,
}: {
  title: string;
  label?: string;
  /** 위에 가는 선을 긋고 그 아래에서 시작한다 */
  rule?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
  children?: ReactNode;
}) {
  const H: ElementType = as ?? "h2";
  return (
    <div className={cx("n-head", rule && "ruled", className)}>
      <H className="n-title">{titleText(title, label)}</H>
      {children ? <div>{typeof children === "string" ? <p className="n-body">{children}</p> : children}</div> : null}
    </div>
  );
}

/** 줄 목록의 바깥. 순서가 있으면 as="ol". */
export function Rows<T extends ElementType = "div">({ as, className, ...rest }: PolyProps<T, BoxProps>) {
  const Tag: ElementType = as ?? "div";
  return <Tag className={cx("n-rows", className)} {...rest} />;
}

/** 한 줄: 왼쪽 작은 라벨, 오른쪽 본문. 글만 넘기면 본문 문단으로 그린다. */
export function Row<T extends ElementType = "div">({
  as,
  label,
  labelAs,
  wide,
  className,
  children,
  ...rest
}: PolyProps<T, BoxProps & { label: ReactNode; labelAs?: "h3" | "h4" | "p" | "dt"; wide?: boolean }>) {
  const Tag: ElementType = as ?? "div";
  const L: ElementType = labelAs ?? "h3";
  return (
    <Tag className={cx("n-row", wide && "wide-label", className)} {...rest}>
      <L className="n-row-label">{label}</L>
      {typeof children === "string" ? <p className="n-body">{children}</p> : children}
    </Tag>
  );
}

/** 검은 판. 화면 양옆에서 한 칸 들어온 둥근 면으로 구간 하나를 감싼다. */
export function Panel<T extends ElementType = "section">({ as, className, children, ...rest }: PolyProps<T, BoxProps>) {
  const Tag: ElementType = as ?? "section";
  return (
    <Tag className={cx("n-panel", className)} {...rest}>
      <div className="n-wrap">{children}</div>
    </Tag>
  );
}

/** 그림과 영상의 틀. 기본 4:3, wide 는 16:9. 안의 img, video 는 틀을 채운다. */
export function Media<T extends ElementType = "div">({ as, wide, className, ...rest }: PolyProps<T, BoxProps & { wide?: boolean }>) {
  const Tag: ElementType = as ?? "div";
  return <Tag className={cx("n-media", wide && "wide", className)} {...rest} />;
}

/**
 * 사진 판. 어둡게 누른 사진 위 왼쪽 아래에 제목과 문단을 둔다. media 에 img 나 video(프레임워크의 이미지 컴포넌트)를 넘긴다.
 * 한 페이지에 하나, 밝은 곳이 필요한 자리에 쓴다.
 */
export function PhotoPanel<T extends ElementType = "div">({
  as,
  media,
  className,
  children,
  ...rest
}: PolyProps<T, BoxProps & { media?: ReactNode }>) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag className={cx("n-photo", className)} {...rest}>
      {media}
      <div className="n-photo-in">{children}</div>
    </Tag>
  );
}

/** 문의 띠: 왼쪽 한 줄 문장(과 짧은 문단), 오른쪽 버튼 줄. 페이지 끝에 하나 둔다. */
export function CtaBand({
  title,
  label,
  body,
  actions,
  className,
}: {
  title: string;
  label?: string;
  body?: ReactNode;
  actions: ReactNode;
  className?: string;
}) {
  const heading = <h2 className="n-title">{titleText(title, label)}</h2>;
  return (
    <div className={cx("n-cta-band", className)}>
      {body ? (
        <div>
          {heading}
          <p className="n-body">{body}</p>
        </div>
      ) : (
        heading
      )}
      <div className="n-actions">{actions}</div>
    </div>
  );
}
