import type { ComponentPropsWithoutRef, ElementType } from "react";

/** 클래스 이름을 이어 붙인다. 거짓 값은 뺀다. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * as 로 태그나 컴포넌트를 바꿀 수 있는 조각의 속성.
 * 예: <Pill as={Link} href="/contact"> 처럼 프레임워크의 링크 컴포넌트를 넘긴다.
 */
export type PolyProps<T extends ElementType, Own = object> = Own & { as?: T } & Omit<
    ComponentPropsWithoutRef<T>,
    keyof Own | "as"
  >;
