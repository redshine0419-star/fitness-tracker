import type { Metadata } from "next";
import localFont from "next/font/local";
import { VisuallyHidden } from "@/components/common/VisuallyHidden";
import { FloatingBar } from "@/components/layout/FloatingBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipNav } from "@/components/layout/SkipNav";
import { siteConfig } from "@/content/site.config";
import "@/styles/globals.css";

// Pretendard Variable, self-hosted (public/fonts/PretendardVariable.woff2).
// PROJECT_SPEC §5.2 — no CDN link. Weights 400/500/600/700 come from the
// variable font's own weight axis via the "400 700" range.
const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "400 700",
  variable: "--font-pretendard",
});

// TODO(Step 6): expand into a full generateMetadata (canonical, OG, robots by env).
export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
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
