import { Banner } from "@/components/ui/Card";
import type { ImageAsset } from "@/content/types";
import styles from "./PromoBanner.module.css";

interface PromoBannerProps {
  href: string;
  image: ImageAsset;
  title: string;
  description: string;
}

// PROJECT_SPEC §7 S4 — 배너 이미지 안에 글자를 넣지 않고 HTML 텍스트 오버레이를 쓴다.
export function PromoBanner({ href, image, title, description }: PromoBannerProps) {
  return (
    <section aria-label="프로모션 배너" className="container">
      <Banner
        href={href}
        image={image}
        overlayText={
          <div className={styles.overlayText}>
            <p className="t-h4-bold">{title}</p>
            <p className="t-body2-regular">{description}</p>
          </div>
        }
      />
    </section>
  );
}
