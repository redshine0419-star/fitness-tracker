import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import { Picture } from "@/components/common/Picture";
import { VisuallyHidden } from "@/components/common/VisuallyHidden";
import { Button } from "@/components/ui/Button";
import { aboutHero, missionSection, orgStats, valueCards } from "@/content/about";
import { siteConfig } from "@/content/site.config";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: `기관소개 | ${siteConfig.name}`,
  description: aboutHero.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        description={aboutHero.description}
        breadcrumb={[{ label: "홈", href: "/" }, { label: "기관소개" }]}
      />

      <section aria-labelledby="mission-heading" className={`container ${styles.missionSection}`}>
        <div className={`grid ${styles.missionGrid}`}>
          <div className={styles.missionImageWrap}>
            <Picture image={missionSection.image} className={styles.missionImage} />
          </div>
          <div className={styles.missionText}>
            <h2 id="mission-heading" className="t-h2-bold">
              {missionSection.title}
            </h2>
            {missionSection.paragraphs.map((paragraph) => (
              <p key={paragraph} className="t-body1-regular">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="values-heading" className={`container ${styles.valuesSection}`}>
        <h2 id="values-heading" className={`t-h2-bold ${styles.sectionTitle}`}>
          우리가 일하는 방식
        </h2>
        <div className={`grid ${styles.valuesGrid}`}>
          {valueCards.map((value) => (
            <div key={value.title} className={styles.valueCard}>
              <h3 className="t-h4-bold">{value.title}</h3>
              <p className="t-body2-regular">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="stats-heading" className={styles.statsSection}>
        <div className={`container grid ${styles.statsGrid}`}>
          <VisuallyHidden as="h2" id="stats-heading">
            기관 현황
          </VisuallyHidden>
          {orgStats.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <p className={`t-h3-bold ${styles.statValue}`}>{stat.value}</p>
              <p className="t-body2-regular">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="후원 안내" className={`container ${styles.ctaSection}`}>
        <p className="t-h3-bold">우리의 활동에 함께해 주세요</p>
        <Button href="/donate" shape="square" size="lg">
          후원하기
        </Button>
      </section>
    </>
  );
}
