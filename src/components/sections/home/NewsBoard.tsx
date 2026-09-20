import { Picture } from "@/components/common/Picture";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TrackedLink } from "@/components/common/TrackedLink";
import { Badge01 } from "@/components/ui/Badge01";
import type { NewsItem } from "@/content/types";
import styles from "./NewsBoard.module.css";

interface NewsBoardProps {
  news: NewsItem[];
}

// PROJECT_SPEC §7 S7 — 이미지 있는 카드 2개(16:10) + 텍스트 목록 3개.
export function NewsBoard({ news }: NewsBoardProps) {
  const cards = news.filter((n) => n.image).slice(0, 2);
  const list = news.filter((n) => !n.image || !cards.includes(n)).slice(0, 3);

  return (
    <section aria-labelledby="news-heading" className="container">
      <SectionHeader
        id="news-heading"
        eyebrow="NEWS"
        title="소식"
        description="다양한 소식을 전합니다."
        moreHref="/news"
        moreLabel="소식 더보기"
        moreTrackCategory="main_news"
        moreTrackAction="more_click"
      />

      <div className={`grid ${styles.layout}`}>
        {cards.map((item) => (
          <TrackedLink
            key={item.href + item.title}
            href={item.href}
            className={styles.imageCard}
            trackCategory="main_news"
            trackAction="card_click"
            trackLabel={item.title}
          >
            <div className={styles.imageWrap}>
              {item.image && <Picture image={item.image} className={styles.image} />}
            </div>
            <div className={styles.imageCardBody}>
              <Badge01 variant="filled-gray">{item.category}</Badge01>
              <h3 className={styles.imageCardTitle}>{item.title}</h3>
            </div>
          </TrackedLink>
        ))}

        <ul className={styles.list}>
          {list.map((item) => (
            <li key={item.href + item.title} className={styles.listItem}>
              <TrackedLink
                href={item.href}
                className={styles.listLink}
                trackCategory="main_news"
                trackAction="list_click"
                trackLabel={item.title}
              >
                <Badge01 variant="filled-gray">{item.category}</Badge01>
                <h3 className={`t-body1-bold ${styles.listTitle}`}>{item.title}</h3>
                <time className={`t-detail ${styles.listDate}`} dateTime={item.date}>
                  {item.date}
                </time>
              </TrackedLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
