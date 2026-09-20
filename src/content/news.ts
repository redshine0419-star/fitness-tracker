// SAMPLE CONTENT — 배포 전 교체
import type { NewsItem } from "./types";

export const newsHero = {
  eyebrow: "NEWS",
  title: "소식",
  description: "공지사항과 보도자료, 캠페인 소식을 전합니다.",
};

export const newsListItems: NewsItem[] = [
  { category: "공지사항", title: "2026년 후원금 사용 내역을 공개합니다", date: "2026-09-01", href: "/coming-soon/story/news" },
  { category: "보도자료", title: "식수 위생 개선 사업, 지역 300세대에 새 우물 제공", date: "2026-08-20", href: "/coming-soon/story/news" },
  { category: "캠페인 소식", title: "희망의 선물상자, 올해 목표를 초과 달성했습니다", date: "2026-08-10", href: "/coming-soon/story/news" },
  { category: "공지사항", title: "개인정보처리방침 개정 안내", date: "2026-08-01", href: "/coming-soon/story/news" },
  { category: "보도자료", title: "청소년 진로 교육 프로그램 참가자 모집 소식", date: "2026-07-25", href: "/coming-soon/story/news" },
  { category: "공지사항", title: "추석 연휴 고객센터 운영 안내", date: "2026-07-10", href: "/coming-soon/story/news" },
  { category: "캠페인 소식", title: "1:1 아동결연 캠페인, 새로운 아동 프로필을 공개합니다", date: "2026-06-28", href: "/coming-soon/story/news" },
  { category: "보도자료", title: "재난 긴급구호 캠페인 현장 보고", date: "2026-06-15", href: "/coming-soon/story/news" },
  { category: "공지사항", title: "정기후원 결제수단 변경 안내", date: "2026-06-01", href: "/coming-soon/story/news" },
];
