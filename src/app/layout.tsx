import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { AnalyticsInit } from "@/components/common/AnalyticsInit";
import { JsonLd } from "@/components/common/JsonLd";
import { VisuallyHidden } from "@/components/common/VisuallyHidden";
import { FloatingBar } from "@/components/layout/FloatingBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipNav } from "@/components/layout/SkipNav";
import { siteConfig } from "@/content/site.config";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { buildRootMetadata } from "@/lib/seo";
import "@/styles/globals.css";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

// Pretendard Variable, self-hosted (public/fonts/PretendardVariable.woff2).
// PROJECT_SPEC §5.2 — no CDN link. Weights 400/500/600/700 come from the
// variable font's own weight axis via the "400 700" range.
const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "400 700",
  variable: "--font-pretendard",
});

export function generateMetadata(): Metadata {
  return buildRootMetadata();
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        {/* PROJECT_SPEC §12 — Consent Mode 기본값(전부 denied)을 GTM 로드 전에 설정한다.
            Phase 2 동의 배너 전까지 이 기본값을 유지한다 (README에 명시). */}
        {gtmId && (
          <Script id="consent-mode-default" strategy="beforeInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});`}
          </Script>
        )}
        {gtmId && (
          <>
            <Script id="gtm-loader" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        )}

        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <AnalyticsInit />

        <SkipNav />
        {/* PROJECT_SPEC §9 — 페이지에 h1은 이 1개뿐(시각적으로만 숨김). 섹션 제목은 h2. */}
        <VisuallyHidden as="h1">{siteConfig.tagline}</VisuallyHidden>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingBar />
      </body>
    </html>
  );
}
