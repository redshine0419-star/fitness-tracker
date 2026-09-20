import type { Metadata } from "next";
import { siteConfig } from "@/content/site.config";

const isProduction = process.env.NODE_ENV === "production";

// PROJECT_SPEC §11 — 프로덕션에서만 index,follow. stub 페이지·비프로덕션은 noindex
// (stub 페이지는 각자 metadata에서 개별적으로 robots:{index:false}를 지정해 이 기본값을
// 덮어쓴다 — coming-soon, /dev/components).
export function buildRootMetadata(): Metadata {
  const title = `${siteConfig.name} | ${siteConfig.tagline}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description: siteConfig.description,
    alternates: { canonical: "/" },
    robots: isProduction
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: "/",
      siteName: siteConfig.name,
      title,
      description: siteConfig.description,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: siteConfig.description,
      images: ["/og-image.png"],
    },
  };
}
