import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site.config";

// PROJECT_SPEC §11 — 실제 콘텐츠가 있는 페이지만 사이트맵에 넣는다. 나머지 경로는
// 전부 /coming-soon noindex stub이라 사이트맵에서 제외한다.
const SUBPAGES = ["/about", "/programs", "/story", "/news", "/donate"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteConfig.url, lastModified, changeFrequency: "weekly", priority: 1 },
    ...SUBPAGES.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
