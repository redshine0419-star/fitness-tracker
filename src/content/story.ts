// SAMPLE CONTENT — 배포 전 교체
import type { StoryItem } from "./types";

export const storyHero = {
  eyebrow: "STORY",
  title: "스토리",
  description: "세상을 위한 좋은 변화, 다양한 이야기를 전합니다.",
};

const storyListImage = { pc: "/illustrations/story-people.svg", alt: "", width: 640, height: 400 };

function buildStoryListItems(prefix: string, count: number): StoryItem[] {
  return Array.from({ length: count }, (_, i) => ({
    image: storyListImage,
    title:
      i === 0
        ? `${prefix} 현장에서 전하는 이번 달 이야기`
        : `${prefix} 소식 ${i + 1}: 함께 만든 작은 변화`,
    href: "/coming-soon/story/stories",
  }));
}

export const storyListTabs: { id: string; label: string; items: StoryItem[] }[] = [
  { id: "news", label: "새 소식", items: buildStoryListItems("새 소식", 9) },
  { id: "activity", label: "활동 이야기", items: buildStoryListItems("활동 이야기", 9) },
  { id: "sponsor", label: "후원자 이야기", items: buildStoryListItems("후원자 이야기", 9) },
];
