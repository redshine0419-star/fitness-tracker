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
      {moreHref && (
        <div className={styles.moreSlot}>
          <PlusButton href={moreHref} aria-label={moreLabel ?? `${title} 더보기`} />
        </div>
      )}
    </div>
  );
}
