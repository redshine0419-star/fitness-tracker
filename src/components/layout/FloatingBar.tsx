"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import styles from "./FloatingBar.module.css";

// PROJECT_SPEC §7 S12 — Top 버튼(스크롤 1 화면 높이 초과 시 표시) + Mobile 하단 CTA 바.
// PC에는 의도적으로 후원 CTA 바를 두지 않는다 (sticky 헤더의 후원하기 버튼으로 대체).
export function FloatingBar() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowTop(window.scrollY > window.innerHeight);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={styles.mobileCtaBar}>
        <Button
          styleVariant="border"
          color="secondary"
          shape="square"
          fullWidth
          href="/coming-soon/donate/one-time"
          data-track-cat="floating"
          data-track-action="mobile_bar_once"
          data-track-extra='{"cta_type":"donate"}'
        >
          일시후원
        </Button>
        <Button
          color="primary"
          shape="square"
          fullWidth
          href="/coming-soon/donate/regular-club"
          data-track-cat="floating"
          data-track-action="mobile_bar_regular"
          data-track-extra='{"cta_type":"donate"}'
        >
          정기후원
        </Button>
      </div>

      {showTop && (
        <div className={styles.topButtonSlot}>
          <IconButton
            icon={<ArrowUp width={20} height={20} aria-hidden="true" />}
            aria-label="맨 위로"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-track-cat="floating"
            data-track-action="top_click"
          />
        </div>
      )}
    </>
  );
}
