// SAMPLE CONTENT — 배포 전 교체
// PROJECT_SPEC §7 메인 페이지 섹션용 콘텐츠. 문구는 구조를 보여주기 위한 샘플이며
// 원본(굿네이버스)의 문구·수치·캠페인명을 옮기지 않았다 (§2-1).
import type { HeroSlide, StoryItem } from "./types";

export const heroSlides: HeroSlide[] = [
  {
    image: { pc: "/placeholder/gray.svg", mobile: "/placeholder/gray.svg", alt: "", width: 1600, height: 720 },
    label: "아동결연",
    title: "한 아이의 하루가 달라집니다",
    description: "정기적인 결연 후원으로 한 아이의 교육과 건강을 함께 지켜주세요.",
    cta: { label: "결연 후원 알아보기", href: "/coming-soon/donate/sponsorship" },
  },
  {
    image: { pc: "/placeholder/gray.svg", mobile: "/placeholder/gray.svg", alt: "", width: 1600, height: 720 },
    label: "긴급구호",
    title: "위기의 순간, 곁에 있겠습니다",
    description: "재난과 위기 상황에 놓인 아동과 가족에게 신속한 구호를 전합니다.",
    cta: { label: "긴급구호 소식 보기", href: "/coming-soon/story/news" },
  },
  {
    image: { pc: "/placeholder/gray.svg", mobile: "/placeholder/gray.svg", alt: "", width: 1600, height: 720 },
    label: "정기후원",
    title: "매달 작은 나눔이 큰 변화를 만듭니다",
    description: "정기후원으로 지속가능한 지원을 함께 이어가 주세요.",
    cta: { label: "정기후원 시작하기", href: "/coming-soon/donate/regular-club" },
  },
];

const storyImage = { pc: "/placeholder/gray.svg", alt: "", width: 640, height: 400 };

function buildStoryItems(prefix: string): StoryItem[] {
  return Array.from({ length: 5 }, (_, i) => ({
    image: storyImage,
    title:
      i === 0
        ? `${prefix} 현장에서 전하는 이번 달 이야기`
        : `${prefix} 소식 ${i + 1}: 함께 만든 작은 변화`,
    href: "/coming-soon/story/stories",
  }));
}

export const storyTabs: { id: string; label: string; items: StoryItem[] }[] = [
  { id: "news", label: "새 소식", items: buildStoryItems("새 소식") },
  { id: "activity", label: "활동 이야기", items: buildStoryItems("활동 이야기") },
  { id: "sponsor", label: "후원자 이야기", items: buildStoryItems("후원자 이야기") },
];

export const promoBanner = {
  image: { pc: "/placeholder/gray.svg", mobile: "/placeholder/gray.svg", alt: "", width: 1600, height: 200 },
  href: "/coming-soon/donate/campaign",
  title: "함께 만드는 좋은 변화",
  description: "지금 참여하고 이달의 캠페인 소식을 받아보세요.",
};
