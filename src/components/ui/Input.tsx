"use client";

import { useId, type InputHTMLAttributes, type Ref } from "react";
import styles from "./Input.module.css";

export type InputSize = "sm" | "md" | "lg";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  size?: InputSize;
  errorMessage?: string;
  helperText?: string;
  containerClassName?: string;
  ref?: Ref<HTMLInputElement>;
}

// edm-design-system.md §8-2 — Default/Completed는 실제 값 유무에 따라 자연히
// 갈리므로(placeholder 색 vs 입력값 색) 별도 state prop 없이 CSS로 처리하고,
// Focused는 :focus, Error는 errorMessage 유무로 표현한다.
// React 19: 함수 컴포넌트가 ref를 forwardRef 없이 일반 prop으로 받는다.
export function Input({
  label,
  size = "md",
  errorMessage,
  helperText,
  containerClassName,
  id,
  required,
  ref,
  "aria-describedby": ariaDescribedBy,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const message = errorMessage ?? helperText;
  const describedBy = [ariaDescribedBy, message ? messageId : undefined].filter(Boolean).join(" ");

  return (
    <div className={[styles.field, containerClassName ?? ""].filter(Boolean).join(" ")}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        data-size={size}
        data-state={errorMessage ? "error" : undefined}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={describedBy || undefined}
        required={required}
        className={styles.input}
        {...rest}
      />
      {message && (
        <p id={messageId} className={errorMessage ? styles.errorMessage : styles.helperMessage}>
          {message}
        </p>
      )}
    </div>
  );
}
