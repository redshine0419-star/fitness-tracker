import { Picture } from "@/components/common/Picture";
import { TrackedLink } from "@/components/common/TrackedLink";
import type { ImageAsset } from "@/content/types";
import styles from "./PromoBanner.module.css";

interface PromoBannerProps {
  href: string;
  image: ImageAsset;
  eyebrow: string;
  title: string;
  description: string;
}

// PROJECT_SPEC §7 S4 — 왼쪽 칩+제목+설명(연한 초록 배경), 오른쪽 고정폭 이미지로
// 구성된 카드형 배너. §16 결정: 확정된 디자인 목업(메인 PC 1920)을 그대로 따른다.
export function PromoBanner({ href, image, eyebrow, title, description }: PromoBannerProps) {
  return (
    <section aria-label="프로모션 배너" className="container">
      <TrackedLink
        href={href}
        className={styles.card}
        trackCategory="main_banner"
        trackAction="banner_click"
        trackLabel={title}
      >
        <div className={styles.text}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <p className={`t-h3-bold ${styles.title}`}>{title}</p>
          <p className={`t-body1-regular ${styles.description}`}>{description}</p>
        </div>
        <div className={styles.imageWrap}>
          <Picture image={image} className={styles.image} />
        </div>
      </TrackedLink>
    </section>
  );
}
