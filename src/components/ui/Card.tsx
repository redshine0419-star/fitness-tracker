import type { ReactNode } from "react";
import { Picture } from "@/components/common/Picture";
import { TrackedLink } from "@/components/common/TrackedLink";
import styles from "./Card.module.css";
import type { ImageAsset } from "@/content/types";

interface CardProps {
  href: string;
  image: ImageAsset;
  variant?: "default" | "compact";
  eyebrow?: ReactNode;
  title: string;
  description?: string;
  className?: string;
  /** PROJECT_SPEC §12 분석 표 — 예: main_campaign/card_click, main_story/card_click */
  trackCategory?: string;
  trackAction?: string;
  trackLabel?: string;
}

// edm-design-system.md §8-10 Card. "카드 전체가 링크" 요구를 지키기 위해 <a> 하나가
// 이미지·뱃지·제목·설명을 전부 감싸고, 그 안에 <h3>를 두어 스크린리더가
// "링크, 3단계 제목"으로 함께 읽도록 구성한다 (링크 중첩 없음).
export function Card({
  href,
  image,
  variant = "default",
  eyebrow,
  title,
  description,
  className,
  trackCategory = "",
  trackAction = "",
  trackLabel,
}: CardProps) {
  return (
    <article className={[styles.card, className ?? ""].filter(Boolean).join(" ")}>
      <TrackedLink
        href={href}
        className={styles.link}
        data-variant={variant}
        trackCategory={trackCategory}
        trackAction={trackAction}
        trackLabel={trackLabel}
      >
        <div className={styles.imageWrap} data-variant={variant}>
          <Picture image={image} className={styles.image} />
        </div>
        <div className={styles.body} data-variant={variant}>
          {eyebrow}
          <h3 className={styles.title} data-variant={variant}>
            {title}
          </h3>
          {description && (
            <p className={styles.description} data-variant={variant}>
              {description}
            </p>
          )}
        </div>
      </TrackedLink>
    </article>
  );
}

interface BannerProps {
  href: string;
  image: ImageAsset;
  overlayText?: ReactNode;
  className?: string;
  /** PROJECT_SPEC §12 분석 표 — main_banner: banner_click */
  trackCategory?: string;
  trackAction?: string;
  trackLabel?: string;
}

// edm-design-system.md §6 Shadow 표 기준 Banner (radius 12, shadow-blue-02).
// PROJECT_SPEC §7 S4 — 배너 이미지 안에 글자를 굽지 않고 HTML 텍스트 오버레이를 쓴다.
export function Banner({
  href,
  image,
  overlayText,
  className,
  trackCategory = "",
  trackAction = "",
  trackLabel,
}: BannerProps) {
  return (
    <TrackedLink
      href={href}
      className={[styles.banner, className ?? ""].filter(Boolean).join(" ")}
      trackCategory={trackCategory}
      trackAction={trackAction}
      trackLabel={trackLabel}
    >
      <Picture image={image} className={styles.bannerImage} />
      {overlayText && <div className={styles.bannerOverlay}>{overlayText}</div>}
    </TrackedLink>
  );
}
