import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import { Picture } from "@/components/common/Picture";
import { Button } from "@/components/ui/Button";
import { donateHero, donateWays } from "@/content/donate";
import { siteConfig } from "@/content/site.config";
import styles from "./donate.module.css";

export const metadata: Metadata = {
  title: `후원하기 | ${siteConfig.name}`,
  description: donateHero.description,
};

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow={donateHero.eyebrow}
        title={donateHero.title}
        description={donateHero.description}
        breadcrumb={[{ label: "홈", href: "/" }, { label: "후원하기" }]}
      />

      <section aria-label="후원 방법" className={`container ${styles.section}`}>
        <div className={`grid ${styles.grid}`}>
          {donateWays.map((way) => (
            <article key={way.title} className={styles.card}>
              <div className={styles.imageWrap}>
                <Picture image={way.image} className={styles.image} />
              </div>
              <div className={styles.body}>
                <h3 className="t-h4-bold">{way.title}</h3>
                <p className={`t-body2-regular ${styles.description}`}>{way.description}</p>
                <Button href={way.href} shape="square" fullWidth>
                  {way.buttonLabel}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
