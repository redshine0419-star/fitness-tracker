"use client";

import { useId, type InputHTMLAttributes, type ReactNode, type Ref } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label: ReactNode;
  size?: "pc" | "mobile";
  ref?: Ref<HTMLInputElement>;
}

// edm-design-system.md §8-4 — 원형 체크박스. PC 24px / Mobile 20px.
// React 19: 함수 컴포넌트가 ref를 forwardRef 없이 일반 prop으로 받는다.
export function Checkbox({ label, size = "pc", id, className, ref, ...rest }: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <label
      htmlFor={checkboxId}
      className={[styles.wrapper, className ?? ""].filter(Boolean).join(" ")}
    >
      <input
        ref={ref}
        id={checkboxId}
        type="checkbox"
        data-size={size}
        className={styles.input}
        {...rest}
      />
      <span className={styles.box} data-size={size} aria-hidden="true">
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" className={styles.check}>
          <path
            d="M1 5L4.5 8.5L11 1.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}
