// SAMPLE CONTENT — 배포 전 교체
// 단체명·연락처 등 사실 정보는 확정 전까지 '{{TODO}}'로 둔다 (PROJECT_SPEC §2-2).
import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "{{TODO}}",
  tagline: "아동과 지역사회를 위한 나눔에 함께해 주세요",
  description: "아동결연과 국내외 사업, 긴급구호를 통해 아동과 지역사회의 좋은 변화를 만드는 후원 단체입니다.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.org",
  logo: { wordmark: "{{TODO}}" },
  contact: {
    phone: "{{TODO}}",
    email: "{{TODO}}",
    hours: "{{TODO}}",
  },
  sns: {
    // 실제 SNS 계정이 확정되기 전까지는 준비중 stub으로 연결한다.
    youtube: "/coming-soon",
    blog: "/coming-soon",
    instagram: "/coming-soon",
  },
};
