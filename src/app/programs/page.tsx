import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/Card";
import { programCategories, programsHero } from "@/content/programs";
import { siteConfig } from "@/content/site.config";
import styles from "./programs.module.css";

export const metadata: Metadata = {
  title: `사업안내 | ${siteConfig.name}`,
  description: programsHero.description,
};

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow={programsHero.eyebrow}
        title={programsHero.title}
        description={programsHero.description}
        breadcrumb={[{ label: "홈", href: "/" }, { label: "사업안내" }]}
      />

      <section aria-label="사업 분야" className={`container ${styles.section}`}>
        <div className={`grid ${styles.grid}`}>
          {programCategories.map((category) => (
            <div key={category.title} className={styles.cardSlot}>
              <Card
                href={category.href}
                image={category.image}
                title={category.title}
                description={category.description}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
