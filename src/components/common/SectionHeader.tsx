import type { ReactNode } from "react";
import { PlusButton } from "@/components/ui/CarouselControls";
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  moreHref?: string;
  moreLabel?: string;
  /** Plus 버튼 대신 우측 상단에 넣을 커스텀 요소 (예: S6 캠페인의 인디케이터 pill) */
  actionSlot?: ReactNode;
  children?: ReactNode;
}

// PROJECT_SPEC §7.0 공통 SectionHeader — 중앙 정렬, H2 Bold + Body2 Regular(--text-03).
export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  moreHref,
  moreLabel,
  actionSlot,
  children,
}: SectionHeaderProps) {
  return (
    <div className={styles.wrap}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 id={id} className={`t-h2-bold ${styles.title}`}>
        {title}
      </h2>
      {description && <p className={`t-body2-regular ${styles.description}`}>{description}</p>}
      {children}
      {actionSlot ? (
        <div className={styles.moreSlot}>{actionSlot}</div>
      ) : (
        moreHref && (
          <div className={styles.moreSlot}>
            <PlusButton href={moreHref} aria-label={moreLabel ?? `${title} 더보기`} />
          </div>
        )
      )}
    </div>
  );
}
