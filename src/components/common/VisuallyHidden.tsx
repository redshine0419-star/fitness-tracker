import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import styles from "./VisuallyHidden.module.css";

interface VisuallyHiddenProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

// PROJECT_SPEC §4 common/VisuallyHidden — 시각적으로만 숨기고 스크린리더에는 노출.
// (h1 tagline, SkipNav 텍스트, 섹션 제목 없는 곳의 접근성용 h2 등에서 재사용)
export function VisuallyHidden({
  as: Tag = "span",
  children,
  className,
  ...rest
}: VisuallyHiddenProps & Omit<ComponentPropsWithoutRef<"span">, "className" | "children">) {
  return (
    <Tag className={[styles.hidden, className ?? ""].filter(Boolean).join(" ")} {...rest}>
      {children}
    </Tag>
  );
}
