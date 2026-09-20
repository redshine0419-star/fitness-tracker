"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Picture } from "@/components/common/Picture";
import { Button } from "@/components/ui/Button";
import { CarouselMobilePill, CarouselPcControls } from "@/components/ui/CarouselControls";
import type { HeroSlide } from "@/content/types";
import styles from "./HeroSlider.module.css";

const AUTOPLAY_MS = 5000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

interface HeroSliderProps {
  slides: HeroSlide[];
}

// PROJECT_SPEC §7 S2 — 자동 재생 5초, 전환 600ms 페이드. Pause·hover·focus-within 시 정지.
// prefers-reduced-motion이면 자동 재생을 켜지 않는다. embla 없이 opacity 크로스페이드로
// 구현한다 (S2는 스와이프 요구가 없고, 페이드 전환은 embla 기본 스크롤 방식과 달라
// 별도 fade 플러그인 의존성을 추가하는 대신 직접 구현하는 쪽을 선택 — docs/DEVIATIONS.md 참고).
export function HeroSlider({ slides }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const playing = !userPaused && !hovering && !reducedMotion;

  useEffect(() => {
    if (!playing || slides.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [playing, slides.length]);

  function goTo(next: number) {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }

  return (
    <section
      className={styles.hero}
      aria-roledescription="carousel"
      aria-label="대표 배너"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovering(false);
      }}
    >
      <div className={styles.track} aria-live={playing ? "off" : "polite"}>
        {slides.map((slide, i) => (
          <div
            key={slide.title}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${slides.length}`}
            className={styles.slide}
            data-active={i === index || undefined}
            aria-hidden={i === index ? undefined : true}
          >
            <Picture image={slide.image} className={styles.image} priority={i === 0} />
            <div className={styles.overlay} />
            <div className={styles.content}>
              <div className="container">
                <div className="grid">
                  <div className={styles.textBlock}>
                    <p className={`t-body2-semibold ${styles.label}`}>{slide.label}</p>
                    <h2 className={`t-display ${styles.title}`}>{slide.title}</h2>
                    <p className={`t-body1-regular ${styles.description}`}>{slide.description}</p>
                    <Button
                      href={slide.cta.href}
                      styleVariant="border"
                      color="white"
                      shape="square"
                      size="md"
                      data-track-cat="main_hero"
                      data-track-action="cta_click"
                      data-track-label={slide.title}
                    >
                      {slide.cta.label}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.pcControlsSlot}>
        <div className="container">
          <CarouselPcControls
            current={index + 1}
            total={slides.length}
            playing={playing}
            onPrev={() => goTo(index - 1)}
            onNext={() => goTo(index + 1)}
            onTogglePlay={() => setUserPaused((v) => !v)}
            labelPrefix="대표 배너"
            trackCategory="main_hero"
            trackLabel={slides[index]?.title}
          />
        </div>
      </div>
      <div className={styles.mobileControlsSlot}>
        <CarouselMobilePill current={index + 1} total={slides.length} />
      </div>
    </section>
  );
}
