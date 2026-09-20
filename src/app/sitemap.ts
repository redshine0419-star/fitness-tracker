import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site.config";

// PROJECT_SPEC §11 — Phase 1은 홈 1페이지만 색인 대상이다. 나머지 경로는 전부
// /coming-soon noindex stub이라 사이트맵에 넣지 않는다.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
