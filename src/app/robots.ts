import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site.config";

const isProduction = process.env.NODE_ENV === "production";

// PROJECT_SPEC §11 — 프로덕션 외 환경은 전체 비색인. 프로덕션에서도 noindex stub
// (/coming-soon)과 컴포넌트 카탈로그(/dev)는 크롤 대상에서 제외한다.
export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/coming-soon", "/dev"] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
