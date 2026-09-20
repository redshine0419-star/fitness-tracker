import type { ElementType, ReactNode } from "react";
import styles from "./VisuallyHidden.module.css";

interface VisuallyHiddenProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

// PROJECT_SPEC §4 common/VisuallyHidden — 시각적으로만 숨기고 스크린리더에는 노출.
// (h1 tagline, SkipNav 텍스트 등에서 재사용)
export function VisuallyHidden({ as: Tag = "span", children, className }: VisuallyHiddenProps) {
  return <Tag className={[styles.hidden, className ?? ""].filter(Boolean).join(" ")}>{children}</Tag>;
}
