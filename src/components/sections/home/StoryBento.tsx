"use client";

import { useState } from "react";
import Link from "next/link";
import { Picture } from "@/components/common/Picture";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Tab01 } from "@/components/ui/Tab01";
import type { StoryItem } from "@/content/types";
import styles from "./StoryBento.module.css";

interface StoryTab {
  id: string;
  label: string;
  items: StoryItem[];
}

interface StoryBentoProps {
  tabs: StoryTab[];
}

// PROJECT_SPEC §7 S3 — 탭 3개 + 벤토 그리드(큰 카드 1 + 작은 카드 4). 모든 탭 패널을
// 서버에서 함께 렌더링하고 비활성 패널은 hidden 속성만 적용해 크롤러가 전체를 읽게 한다.
export function StoryBento({ tabs }: StoryBentoProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");

  return (
    <section aria-labelledby="story-heading" className="container">
      <SectionHeader
        id="story-heading"
        eyebrow="STORY"
        title="스토리"
        description="세상을 위한 좋은 변화, 다양한 이야기를 전합니다."
        moreHref="/coming-soon/story/stories"
        moreLabel="스토리 더보기"
      >
        <div className={styles.tabRow}>
          <Tab01
            aria-label="스토리 분류"
            items={tabs.map((t) => ({ id: t.id, label: t.label }))}
            activeId={activeId}
            onChange={setActiveId}
          />
        </div>
      </SectionHeader>

      {tabs.map((tab) => {
        const [big, ...rest] = tab.items;
        const small = rest.slice(0, 4);
        return (
          <div
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={tab.id !== activeId}
            className={`grid ${styles.bento}`}
          >
            {big && (
              <Link href={big.href} className={styles.bigCard}>
                <div className={styles.bigImageWrap}>
                  <Picture image={big.image} className={styles.bigImage} />
                </div>
                <div className={styles.bigBody}>
                  <h3 className="t-h4-bold">{big.title}</h3>
                  <span className={styles.detailLink}>자세히 보기</span>
                </div>
              </Link>
            )}
            {small.map((item) => (
              <div key={item.href + item.title} className={styles.smallCard}>
                <Card href={item.href} variant="compact" image={item.image} title={item.title} />
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
}
