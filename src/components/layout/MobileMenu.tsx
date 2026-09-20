"use client";

import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { NavItem } from "@/content/types";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

// PROJECT_SPEC §7 S1 Mobile/Tablet 메뉴 — 우측에서 열리는 전체화면 패널, 아코디언(한 번에
// 하나), 포커스 트랩 + Esc 닫기, 열린 동안 body 스크롤 잠금.
export function MobileMenu({ open, onClose, items }: MobileMenuProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    (focusables?.[0] ?? panel)?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusItems = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusItems.length === 0) return;
      const first = focusItems[0];
      const last = focusItems[focusItems.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="전체 메뉴"
        className={styles.panel}
        tabIndex={-1}
      >
        <div className={styles.topBar}>
          <button type="button" className={styles.closeButton} aria-label="메뉴 닫기" onClick={onClose}>
            <X width={24} height={24} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="주요 메뉴" className={styles.accordionNav}>
          {items.map((item, index) => {
            const expanded = openIndex === index;
            const panelId = `mobile-menu-panel-${index}`;
            return (
              <div key={item.label} className={styles.accordionItem}>
                <button
                  type="button"
                  className={styles.accordionTrigger}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(expanded ? null : index)}
                >
                  {item.label}
                  <ChevronDown
                    width={20}
                    height={20}
                    aria-hidden="true"
                    className={styles.chevron}
                    data-open={expanded || undefined}
                  />
                </button>
                {expanded && (
                  <div id={panelId} className={styles.accordionPanel}>
                    {item.groups.map((group) => (
                      <div key={group.title} className={styles.mobileGroup}>
                        <p className={styles.mobileGroupTitle}>{group.title}</p>
                        <ul className={styles.mobileGroupLinks}>
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={onClose}
                                className={styles.mobileGroupLink}
                                data-track-cat="header"
                                data-track-action="gnb_click"
                                data-track-label={link.label}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className={styles.bottomLinks}>
          <Link href="/coming-soon/login" onClick={onClose}>
            로그인
          </Link>
          <Link href="/coming-soon/signup" onClick={onClose}>
            회원가입
          </Link>
          <Link href="/coming-soon/mypage/receipts" onClick={onClose}>
            기부금 영수증
          </Link>
        </div>

        <Button
          href="/donate"
          shape="square"
          size="lg"
          fullWidth
          onClick={onClose}
          data-track-cat="header"
          data-track-action="donate_click"
          data-track-label="후원하기"
          data-track-extra='{"cta_type":"donate"}'
        >
          후원하기
        </Button>
      </div>
    </div>
  );
}
