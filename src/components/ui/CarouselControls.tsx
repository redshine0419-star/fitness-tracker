"use client";

import Link from "next/link";
import { CarouselLeftIcon } from "@/components/icons/ds/CarouselLeftIcon";
import { CarouselRightIcon } from "@/components/icons/ds/CarouselRightIcon";
import { PauseIcon } from "@/components/icons/ds/PauseIcon";
import { PlayIcon } from "@/components/icons/ds/PlayIcon";
import { PlusIcon } from "@/components/icons/ds/PlusIcon";
import { IconButton } from "./IconButton";
import styles from "./CarouselControls.module.css";

// edm-design-system.md §8-6 Carousel — Carousel_pc (숫자 카운터 + Pause/Prev/Next)

interface CarouselPcControlsProps {
  current: number;
  total: number;
  playing: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  labelPrefix: string;
  /** PROJECT_SPEC §12 분석 표 — main_hero: control_prev/control_next/control_pause */
  trackCategory?: string;
  trackLabel?: string;
}

export function CarouselPcControls({
  current,
  total,
  playing,
  onPrev,
  onNext,
  onTogglePlay,
  labelPrefix,
  trackCategory,
  trackLabel,
}: CarouselPcControlsProps) {
  return (
    <div className={styles.pcControls}>
      <span className={styles.counter}>
        <strong>{current}</strong>
        <span className={styles.counterTotal}> / {total}</span>
      </span>
      <IconButton
        icon={playing ? <PauseIcon /> : <PlayIcon />}
        aria-label={playing ? `${labelPrefix} 일시정지` : `${labelPrefix} 재생`}
        onClick={onTogglePlay}
        data-track-cat={trackCategory}
        data-track-action="control_pause"
        data-track-label={trackLabel}
      />
      <IconButton
        icon={<CarouselLeftIcon />}
        aria-label={`${labelPrefix} 이전`}
        onClick={onPrev}
        data-track-cat={trackCategory}
        data-track-action="control_prev"
        data-track-label={trackLabel}
      />
      <IconButton
        icon={<CarouselRightIcon />}
        aria-label={`${labelPrefix} 다음`}
        onClick={onNext}
        data-track-cat={trackCategory}
        data-track-action="control_next"
        data-track-label={trackLabel}
      />
    </div>
  );
}

// edm-design-system.md §8-6 Carousel_mobile — 숫자 카운터 pill만 (버튼 없음, 스와이프로 조작)
interface CarouselMobilePillProps {
  current: number;
  total: number;
  className?: string;
}

export function CarouselMobilePill({ current, total, className }: CarouselMobilePillProps) {
  return (
    <div className={[styles.mobilePill, className ?? ""].filter(Boolean).join(" ")}>
      <strong>{current}</strong>
      <span className={styles.counterTotal}> / {total}</span>
    </div>
  );
}

// edm-design-system.md §8-6 인디케이터 pill (PC) — Campaign 캐러셀 헤더용 (PROJECT_SPEC §7 S6)
interface CarouselIndicatorPillProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  labelPrefix: string;
  /** PROJECT_SPEC §12 분석 표 — main_campaign: page_prev/page_next */
  trackCategory?: string;
}

export function CarouselIndicatorPill({
  current,
  total,
  onPrev,
  onNext,
  labelPrefix,
  trackCategory,
}: CarouselIndicatorPillProps) {
  return (
    <div className={styles.indicatorPill}>
      <span className={styles.counter}>
        <strong>{current}</strong>
        <span className={styles.counterTotal}> / {total}</span>
      </span>
      <span className={styles.divider} aria-hidden="true" />
      <button
        type="button"
        className={styles.indicatorArrow}
        aria-label={`${labelPrefix} 이전`}
        onClick={onPrev}
        data-track-cat={trackCategory}
        data-track-action="page_prev"
      >
        <CarouselLeftIcon className={styles.smallArrowIcon} />
      </button>
      <button
        type="button"
        className={styles.indicatorArrow}
        aria-label={`${labelPrefix} 다음`}
        onClick={onNext}
        data-track-cat={trackCategory}
        data-track-action="page_next"
      >
        <CarouselRightIcon className={styles.smallArrowIcon} />
      </button>
    </div>
  );
}

// edm-design-system.md §8-6 Plus 버튼 — 섹션 헤더 "더보기" (PROJECT_SPEC §7.0)
interface PlusButtonProps {
  href: string;
  "aria-label": string;
  trackCategory?: string;
  trackAction?: string;
  trackLabel?: string;
}

export function PlusButton({ href, trackCategory, trackAction, trackLabel, ...rest }: PlusButtonProps) {
  return (
    <Link
      href={href}
      className={styles.plusButton}
      aria-label={rest["aria-label"]}
      data-track-cat={trackCategory}
      data-track-action={trackAction}
      data-track-label={trackLabel}
    >
      <PlusIcon />
    </Link>
  );
}
