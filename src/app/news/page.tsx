import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge01 } from "@/components/ui/Badge01";
import { newsHero, newsListItems } from "@/content/news";
import { siteConfig } from "@/content/site.config";
import styles from "./news.module.css";

export const metadata: Metadata = {
  title: `소식 | ${siteConfig.name}`,
  description: newsHero.description,
};

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow={newsHero.eyebrow}
        title={newsHero.title}
        description={newsHero.description}
        breadcrumb={[{ label: "홈", href: "/" }, { label: "소식" }]}
      />

      <section aria-label="소식 목록" className={`container ${styles.section}`}>
        <ul className={styles.list}>
          {newsListItems.map((item) => (
            <li key={item.href + item.title} className={styles.item}>
              <Link href={item.href} className={styles.itemLink}>
                <Badge01 variant="filled-gray">{item.category}</Badge01>
                <h3 className={`t-body1-bold ${styles.title}`}>{item.title}</h3>
                <time className={`t-detail ${styles.date}`} dateTime={item.date}>
                  {item.date}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
