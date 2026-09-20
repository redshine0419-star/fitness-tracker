// SAMPLE CONTENT — 배포 전 교체
// PROJECT_SPEC §7 메인 페이지 섹션용 콘텐츠. 문구는 구조를 보여주기 위한 샘플이며
// 원본(굿네이버스)의 문구·수치·캠페인명을 옮기지 않았다 (§2-1).
import type { Campaign, Credential, HeroSlide, NewsItem, StoryItem } from "./types";

export const heroSlides: HeroSlide[] = [
  {
    image: {
      pc: "/illustrations/child-sponsorship.svg",
      mobile: "/illustrations/child-sponsorship.svg",
      alt: "",
      width: 1600,
      height: 720,
    },
    label: "아동결연",
    title: "한 아이의 하루가 달라집니다",
    description: "정기적인 결연 후원으로 한 아이의 교육과 건강을 함께 지켜주세요.",
    cta: { label: "결연 후원 알아보기", href: "/coming-soon/donate/sponsorship" },
  },
  {
    image: {
      pc: "/illustrations/emergency-relief.svg",
      mobile: "/illustrations/emergency-relief.svg",
      alt: "",
      width: 1600,
      height: 720,
    },
    label: "긴급구호",
    title: "위기의 순간, 곁에 있겠습니다",
    description: "재난과 위기 상황에 놓인 아동과 가족에게 신속한 구호를 전합니다.",
    cta: { label: "긴급구호 소식 보기", href: "/news" },
  },
  {
    image: {
      pc: "/illustrations/monthly-giving.svg",
      mobile: "/illustrations/monthly-giving.svg",
      alt: "",
      width: 1600,
      height: 720,
    },
    label: "정기후원",
    title: "매달 작은 나눔이 큰 변화를 만듭니다",
    description: "정기후원으로 지속가능한 지원을 함께 이어가 주세요.",
    cta: { label: "정기후원 시작하기", href: "/coming-soon/donate/regular-club" },
  },
];

const storyImage = { pc: "/illustrations/story-people.svg", alt: "", width: 640, height: 400 };

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
  image: {
    pc: "/illustrations/promo-banner-pattern.svg",
    mobile: "/illustrations/promo-banner-pattern.svg",
    alt: "",
    width: 1600,
    height: 200,
  },
  href: "/coming-soon/donate/campaign",
  title: "함께 만드는 좋은 변화",
  description: "지금 참여하고 이달의 캠페인 소식을 받아보세요.",
};

// S5-A 소개
export const introSection = {
  image: { pc: "/illustrations/transparency-report.svg", alt: "", width: 800, height: 600 },
  description:
    "우리는 아동과 지역사회가 스스로 일어설 수 있는 힘을 기르도록 돕습니다.\n" +
    "투명하고 성실한 운영으로 후원자와 신뢰를 쌓아가겠습니다.",
  buttons: [
    { label: "연차보고서 보기", href: "/coming-soon/about/finance" },
    { label: "재정 보고 보기", href: "/coming-soon/about/finance" },
    { label: "인증·수상 내역 보기", href: "/coming-soon/about/standards" },
  ],
};

// S5-B 신뢰 지표 밴드 — PROJECT_SPEC §16 결정: 근거 자료 확정 전까지 기본 숨김.
export const trustSection: { enabled: boolean; credentials: Credential[] } = {
  enabled: false,
  credentials: [
    { icon: "globe", text: "{{TODO}}" },
    { icon: "award", text: "{{TODO}}" },
    { icon: "handshake", text: "{{TODO}}" },
  ],
};

function campaignImage(illustration: string) {
  return { pc: `/illustrations/${illustration}.svg`, alt: "", width: 480, height: 300 };
}

export const campaigns: Campaign[] = [
  { image: campaignImage("child-sponsorship"), category: "아동결연", title: "1:1 아동결연 캠페인", description: "한 아이와 결연해 지속적인 성장을 함께 지켜보세요.", href: "/coming-soon/donate/sponsorship" },
  { image: campaignImage("community-center"), category: "국내사업", title: "지역아동센터 학습 지원", description: "국내 취약계층 아동의 학습 격차 해소를 돕습니다.", href: "/programs" },
  { image: campaignImage("clean-water"), category: "해외사업", title: "식수 위생 개선 사업", description: "깨끗한 물이 없는 지역에 우물과 위생 시설을 짓습니다.", href: "/programs" },
  { image: campaignImage("emergency-relief"), category: "긴급구호", title: "재난 긴급구호 캠페인", description: "재난과 분쟁 지역의 아동과 가족에게 구호물품을 전합니다.", href: "/news" },
  { image: campaignImage("gift-box"), category: "캠페인", title: "희망의 선물상자", description: "연말연시, 전 세계 아동에게 희망의 선물을 전합니다.", href: "/coming-soon/donate/campaign" },
  { image: campaignImage("education"), category: "교육사업", title: "청소년 진로 교육 프로그램", description: "청소년이 스스로 미래를 그릴 수 있도록 돕습니다.", href: "/programs" },
];

function newsImage(illustration: string) {
  return { pc: `/illustrations/${illustration}.svg`, alt: "", width: 640, height: 400 };
}

// S8 대표 캠페인(영상) — 실제 캠페인 영상이 아직 없어, youtube-nocookie facade의
// 동작(클릭 전 썸네일만 렌더링 → 클릭 시 iframe 삽입)을 보여주기 위해 기술 데모에
// 널리 쓰이는 공개 영상 ID를 사용했다. 실제 서비스 전 반드시 교체할 것.
export const featuredVideo = {
  videoId: "dQw4w9WgXcQ", // TODO: 실제 캠페인 영상 ID로 교체

  thumbnail: { pc: "/illustrations/celebration.svg", alt: "", width: 960, height: 540 },
  category: "캠페인",
  title: "함께 만든 1년, 영상으로 만나보세요",
  description: "지난 한 해 후원자 여러분과 함께 만든 변화를 짧은 영상으로 전해드립니다.",
};

export const quickLinks: { icon: "book-open" | "mail" | "users" | "store" | "building"; label: string; href: string }[] = [
  { icon: "book-open", label: "후원 안내", href: "/donate" },
  { icon: "mail", label: "참여 프로그램", href: "/coming-soon/story/programs" },
  { icon: "users", label: "정기후원 클럽", href: "/coming-soon/donate/regular-club" },
  { icon: "store", label: "온라인 스토어", href: "/coming-soon" },
  { icon: "building", label: "기업 후원", href: "/coming-soon/donate/corporate" },
];

export const newsItems: NewsItem[] = [
  { image: newsImage("transparency-report"), category: "공지사항", title: "2026년 후원금 사용 내역을 공개합니다", date: "2026-09-01", href: "/coming-soon/story/news" },
  { image: newsImage("clean-water"), category: "보도자료", title: "식수 위생 개선 사업, 지역 300세대에 새 우물 제공", date: "2026-08-20", href: "/coming-soon/story/news" },
  { category: "캠페인 소식", title: "희망의 선물상자, 올해 목표를 초과 달성했습니다", date: "2026-08-10", href: "/coming-soon/story/news" },
  { category: "공지사항", title: "개인정보처리방침 개정 안내", date: "2026-08-01", href: "/coming-soon/story/news" },
  { category: "보도자료", title: "청소년 진로 교육 프로그램 참가자 모집 소식", date: "2026-07-25", href: "/coming-soon/story/news" },
];
