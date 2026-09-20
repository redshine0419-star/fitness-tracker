import type { ReactNode } from "react";
import styles from "./Badge01.module.css";

interface Badge01Props {
  variant: "border" | "filled-gray";
  children: ReactNode;
  className?: string;
}

// edm-design-system.md §8-5 Badge01. PROJECT_SPEC §8 체크리스트가 요구하는
// "Border / Filled-Gray, 크기 S"만 구현한다 (Filled(blue)·L·M은 이 페이지에서 쓰이지 않음).
export function Badge01({ variant, children, className }: Badge01Props) {
  return (
    <span
      className={[styles.badge, className ?? ""].filter(Boolean).join(" ")}
      data-variant={variant}
    >
      {children}
    </span>
  );
}
