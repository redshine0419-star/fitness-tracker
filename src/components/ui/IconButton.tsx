"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: ReactNode;
  "aria-label": string;
  size?: 44 | 48;
  className?: string;
}

// edm-design-system.md §8-6 컨트롤러 버튼 — Top 버튼, SNS 버튼 등에서 재사용.
// Footer SNS는 48px, Carousel/Top 버튼은 44px (PROJECT_SPEC §11, §12).
export function IconButton({ icon, size = 44, className, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      className={[styles.iconButton, className ?? ""].filter(Boolean).join(" ")}
      style={{ ["--icon-btn-size" as string]: `${size}px` }}
      {...rest}
    >
      {icon}
    </button>
  );
}
