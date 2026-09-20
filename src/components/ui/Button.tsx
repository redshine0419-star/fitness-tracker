"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonStyleProp = "filled" | "border";
export type ButtonColor = "primary" | "secondary" | "gray" | "white";
export type ButtonSize = "2xs" | "xs" | "sm" | "md" | "lg";
export type ButtonShape = "square" | "round";

interface CommonProps {
  styleVariant?: ButtonStyleProp;
  color?: ButtonColor;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

// edm-design-system.md §8-1 — DS 컴포넌트 스펙 기반 Button.
// Borderless는 PROJECT_SPEC §8 체크리스트에서 "쓰지 않음"으로 명시되어 미구현.
export function Button({
  styleVariant = "filled",
  color = "primary",
  size = "md",
  shape = "round",
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, fullWidth ? styles.fullWidth : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    return (
      <Link
        href={href}
        className={classes}
        data-style={styleVariant}
        data-color={color}
        data-size={size}
        data-shape={shape}
        {...anchorRest}
      >
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as ButtonAsButton;
  return (
    <button
      type={type}
      className={classes}
      data-style={styleVariant}
      data-color={color}
      data-size={size}
      data-shape={shape}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
