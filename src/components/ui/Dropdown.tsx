"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./Dropdown.module.css";

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  placeholder: string;
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  /** Footer 등 고정폭이 필요한 곳에서만 사용 (DS §8-3 예외: PC 260px / Mobile 152px) */
  fixedWidth?: boolean;
}

// edm-design-system.md §8-3 Dropdown — Phase 1은 Medium 1종만 구현 (Search/Double 제외).
export function Dropdown({
  label,
  placeholder,
  options,
  value,
  onChange,
  className,
  fixedWidth = false,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleOptionKeyDown(event: React.KeyboardEvent, index: number) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = document.getElementById(`${listId}-opt-${index + 1}`);
      next?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev = document.getElementById(`${listId}-opt-${index - 1}`);
      prev?.focus();
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onChange(options[index].value);
      setOpen(false);
    }
  }

  return (
    <div
      ref={rootRef}
      className={[styles.root, fixedWidth ? styles.fixedWidth : "", className ?? ""]
        .filter(Boolean)
        .join(" ")}
    >
      {label && <span className={styles.label}>{label}</span>}
      <button
        type="button"
        className={styles.trigger}
        data-state={open ? "active" : selected ? "selected" : "default"}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={styles.arrow}
          data-open={open || undefined}
          aria-hidden="true"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <ul id={listId} role="listbox" className={styles.list}>
          {options.map((option, index) => (
            <li key={option.value} role="none">
              <button
                type="button"
                id={`${listId}-opt-${index}`}
                role="option"
                aria-selected={option.value === value}
                className={styles.option}
                data-selected={option.value === value || undefined}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
