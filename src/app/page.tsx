import { CampaignCarousel } from "@/components/sections/home/CampaignCarousel";
import { FeaturedVideo } from "@/components/sections/home/FeaturedVideo";
import { HeroSlider } from "@/components/sections/home/HeroSlider";
import { NewsBoard } from "@/components/sections/home/NewsBoard";
import { Newsletter } from "@/components/sections/home/Newsletter";
import { PromoBanner } from "@/components/sections/home/PromoBanner";
import { QuickLinks } from "@/components/sections/home/QuickLinks";
import { StoryBento } from "@/components/sections/home/StoryBento";
import { TrustSection } from "@/components/sections/home/TrustSection";
import { JsonLd } from "@/components/common/JsonLd";
import {
  campaigns,
  featuredVideo,
  heroSlides,
  introSection,
  newsItems,
  promoBanner,
  quickLinks,
  storyTabs,
  trustSection,
} from "@/content/home";
import { siteConfig } from "@/content/site.config";
import { webPageJsonLd } from "@/lib/jsonld";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      {/* WebPage.name은 siteConfig.tagline만 쓴다 — {name} | {tagline} 형태의 <title>은
          siteConfig.name이 '{{TODO}}'일 때 그 문자열을 그대로 포함해, 정확히 '{{TODO}}'와
          일치하는 필드만 제외하는 omitTodo()로는 걸러지지 않는다 (docs/DEVIATIONS.md 참고). */}
      <JsonLd
        data={webPageJsonLd({
          url: siteConfig.url,
          title: siteConfig.tagline,
          description: siteConfig.description,
        })}
      />
      <HeroSlider slides={heroSlides} />
      <div className={styles.storySection}>
        <StoryBento tabs={storyTabs} />
      </div>
      <div className={styles.bannerSection}>
        <PromoBanner
          href={promoBanner.href}
          image={promoBanner.image}
          eyebrow={promoBanner.eyebrow}
          title={promoBanner.title}
          description={promoBanner.description}
        />
      </div>
      <TrustSection intro={introSection} trust={trustSection} />
      <div className={styles.campaignSection}>
        <CampaignCarousel campaigns={campaigns} />
      </div>
      <div className={styles.newsSection}>
        <NewsBoard news={newsItems} />
      </div>
      <div className={styles.featuredSection}>
        <FeaturedVideo
          videoId={featuredVideo.videoId}
          thumbnail={featuredVideo.thumbnail}
          category={featuredVideo.category}
          title={featuredVideo.title}
          description={featuredVideo.description}
        />
      </div>
      <div className={styles.quickLinksSection}>
        <QuickLinks links={quickLinks} />
      </div>
      <div className={styles.newsletterSection}>
        <Newsletter />
      </div>
    </>
  );
}
