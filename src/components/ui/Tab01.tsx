"use client";

import { useRef } from "react";
import styles from "./Tab01.module.css";

export interface Tab01Item {
  id: string;
  label: string;
}

interface Tab01Props {
  items: Tab01Item[];
  activeId: string;
  onChange: (id: string) => void;
  "aria-label": string;
  className?: string;
  /** PROJECT_SPEC §12 분석 표 — main_story: tab_{id} */
  trackCategory?: string;
}

// edm-design-system.md §8-5 Tab01 (Pill). PC/Mobile 크기는 typography.css와
// 같은 방식으로 min-width:768px 미디어쿼리에서 자동 전환된다 (별도 size prop 없음).
export function Tab01({ items, activeId, onChange, className, trackCategory, ...rest }: Tab01Props) {
  const listRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(event: React.KeyboardEvent) {
    const index = items.findIndex((item) => item.id === activeId);
    if (index === -1) return;

    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % items.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + items.length) % items.length;
    if (nextIndex === null) return;

    event.preventDefault();
    const nextItem = items[nextIndex];
    onChange(nextItem.id);
    const nextButton = listRef.current?.querySelector<HTMLButtonElement>(
      `[data-tab-id="${nextItem.id}"]`,
    );
    nextButton?.focus();
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={rest["aria-label"]}
      className={[styles.tablist, className ?? ""].filter(Boolean).join(" ")}
      onKeyDown={handleKeyDown}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            data-tab-id={item.id}
            aria-selected={isActive}
            aria-controls={`tabpanel-${item.id}`}
            tabIndex={isActive ? 0 : -1}
            className={styles.tab}
            data-active={isActive || undefined}
            onClick={() => onChange(item.id)}
            data-track-cat={trackCategory}
            data-track-action={`tab_${item.id}`}
            data-track-label={item.label}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
