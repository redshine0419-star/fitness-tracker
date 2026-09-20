// SAMPLE CONTENT — 배포 전 교체
// PROJECT_SPEC §7 S11, §13.1 FooterEntity — 법인 정보는 확정 전까지 전부 '{{TODO}}'.
import type { FooterEntity } from "./types";

export const footerLinks: { label: string; href: string; accent?: boolean }[] = [
  { label: "이용약관", href: "/coming-soon/terms" },
  { label: "개인정보처리방침", href: "/coming-soon/privacy", accent: true },
  { label: "이메일무단수집거부", href: "/coming-soon/email-policy" },
  { label: "인재채용", href: "/coming-soon/careers" },
  { label: "후원문의", href: "/coming-soon/support" },
  { label: "FAQ", href: "/coming-soon/faq" },
  { label: "사이트맵", href: "/coming-soon/sitemap" },
  { label: "아동 보호 정책", href: "/coming-soon/child-safeguarding" },
];

export const relatedSites: { label: string; value: string; href: string }[] = [
  { label: "블로그", value: "blog", href: "/coming-soon" },
  { label: "온라인 스토어", value: "store", href: "/coming-soon" },
  { label: "채용 사이트", value: "career", href: "/coming-soon/careers" },
];

export const footerEntities: FooterEntity[] = [
  {
    name: "{{TODO}}",
    representative: "{{TODO}}",
    bizNo: "{{TODO}}",
    address: "{{TODO}}",
  },
];
