// SAMPLE CONTENT — 배포 전 교체
// GNB 구조 — PROJECT_SPEC §6. 그룹/링크 명칭은 구조를 보여주기 위한 샘플이며
// 실제 서비스 시작 전에 단체 성격에 맞게 이 파일만 수정하면 된다.
import type { NavItem } from "./types";

const promoImage = { pc: "/placeholder/gray.svg", alt: "", width: 400, height: 250 };

export const navItems: NavItem[] = [
  {
    label: "후원하기",
    href: "/coming-soon/donate",
    groups: [
      {
        title: "캠페인 후원",
        links: [
          { label: "캠페인 후원", href: "/coming-soon/donate/campaign" },
          { label: "결연 후원", href: "/coming-soon/donate/sponsorship" },
          { label: "기념일 후원", href: "/coming-soon/donate/anniversary" },
        ],
      },
      {
        title: "사업 후원",
        links: [
          { label: "사업 후원", href: "/coming-soon/donate/program" },
          { label: "일시 후원", href: "/coming-soon/donate/one-time" },
          { label: "기업 후원", href: "/coming-soon/donate/corporate" },
        ],
      },
      {
        title: "후원 클럽",
        links: [
          { label: "정기후원 클럽", href: "/coming-soon/donate/regular-club" },
          { label: "고액후원 클럽", href: "/coming-soon/donate/major-club" },
          { label: "유산기부", href: "/coming-soon/donate/legacy" },
        ],
      },
    ],
    promo: [
      { image: promoImage, title: "정기후원 안내 살펴보기", href: "/coming-soon/donate/regular-club" },
      { image: promoImage, title: "아동결연 후원 소개", href: "/coming-soon/donate/sponsorship" },
    ],
  },
  {
    label: "스토리",
    href: "/coming-soon/story",
    groups: [
      {
        title: "이야기",
        links: [
          { label: "스토리", href: "/coming-soon/story/stories" },
          { label: "결과보고", href: "/coming-soon/story/reports" },
          { label: "영상", href: "/coming-soon/story/videos" },
        ],
      },
      {
        title: "소식",
        links: [
          { label: "공지·뉴스", href: "/coming-soon/story/news" },
          { label: "소식지", href: "/coming-soon/story/newsletter-archive" },
          { label: "뉴스레터", href: "/coming-soon/story/newsletter" },
          { label: "자료실", href: "/coming-soon/story/resources" },
        ],
      },
      {
        title: "참여",
        links: [{ label: "참여 프로그램", href: "/coming-soon/story/programs" }],
      },
    ],
    promo: [
      { image: promoImage, title: "최근 활동 이야기 보기", href: "/coming-soon/story/stories" },
      { image: promoImage, title: "참여 프로그램 살펴보기", href: "/coming-soon/story/programs" },
    ],
  },
  {
    label: "기관소개",
    href: "/coming-soon/about",
    groups: [
      {
        title: "소개",
        links: [
          { label: "소개", href: "/coming-soon/about/intro" },
          { label: "설립 정신", href: "/coming-soon/about/mission" },
          { label: "CI", href: "/coming-soon/about/ci" },
          { label: "연혁", href: "/coming-soon/about/history" },
        ],
      },
      {
        title: "투명경영",
        links: [
          { label: "재정보고", href: "/coming-soon/about/finance" },
          { label: "운영 기준", href: "/coming-soon/about/standards" },
          { label: "조직 운영", href: "/coming-soon/about/governance" },
        ],
      },
      {
        title: "조직 현황",
        links: [
          { label: "국내 조직", href: "/coming-soon/about/domestic" },
          { label: "해외 조직", href: "/coming-soon/about/global" },
        ],
      },
    ],
    promo: [
      { image: promoImage, title: "설립 정신 알아보기", href: "/coming-soon/about/mission" },
      { image: promoImage, title: "투명경영 보고서 보기", href: "/coming-soon/about/finance" },
    ],
  },
  {
    label: "사업안내",
    href: "/coming-soon/programs",
    groups: [
      {
        title: "국제협력사업",
        links: [{ label: "국제협력사업", href: "/coming-soon/programs/international" }],
      },
      {
        title: "국내복지사업",
        links: [{ label: "국내복지사업", href: "/coming-soon/programs/domestic" }],
      },
      {
        title: "교육·연구",
        links: [
          { label: "교육사업", href: "/coming-soon/programs/education" },
          { label: "연구소", href: "/coming-soon/programs/institute" },
        ],
      },
    ],
    promo: [
      { image: promoImage, title: "국제협력사업 살펴보기", href: "/coming-soon/programs/international" },
      { image: promoImage, title: "국내복지사업 살펴보기", href: "/coming-soon/programs/domestic" },
    ],
  },
  {
    label: "나의후원",
    href: "/coming-soon/mypage",
    groups: [
      {
        title: "나의후원",
        links: [
          { label: "후원 정보", href: "/coming-soon/mypage/donations" },
          { label: "결연 아동", href: "/coming-soon/mypage/sponsored-child" },
          { label: "기부금 영수증", href: "/coming-soon/mypage/receipts" },
          { label: "문의", href: "/coming-soon/mypage/inquiry" },
        ],
      },
    ],
    promo: [],
  },
];
