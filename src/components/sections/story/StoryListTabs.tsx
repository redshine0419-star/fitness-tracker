"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Tab01 } from "@/components/ui/Tab01";
import type { StoryItem } from "@/content/types";
import styles from "./StoryListTabs.module.css";

interface StoryListTabsProps {
  tabs: { id: string; label: string; items: StoryItem[] }[];
}

// /story 목록 페이지 — 홈의 StoryBento(벤토 레이아웃)와 달리 균일한 그리드로
// 더 많은 항목을 보여준다. 탭 패널은 전부 서버 렌더링하고 비활성 패널만 hidden
// 속성으로 감춘다 (§11 초기 HTML에 모든 탭 패널 텍스트가 있어야 한다는 원칙을
// 홈 이외 페이지에도 동일하게 적용).
export function StoryListTabs({ tabs }: StoryListTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");

  return (
    <div>
      <div className={styles.tabRow}>
        <Tab01
          aria-label="스토리 분류"
          items={tabs.map((t) => ({ id: t.id, label: t.label }))}
          activeId={activeId}
          onChange={setActiveId}
        />
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`tabpanel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== activeId}
          className={`grid ${styles.grid}`}
        >
          {tab.items.map((item) => (
            <div key={item.href + item.title} className={styles.cardSlot}>
              <Card href={item.href} variant="compact" image={item.image} title={item.title} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
