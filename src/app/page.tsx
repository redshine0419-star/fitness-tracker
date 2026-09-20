import { CampaignCarousel } from "@/components/sections/home/CampaignCarousel";
import { HeroSlider } from "@/components/sections/home/HeroSlider";
import { NewsBoard } from "@/components/sections/home/NewsBoard";
import { PromoBanner } from "@/components/sections/home/PromoBanner";
import { StoryBento } from "@/components/sections/home/StoryBento";
import { TrustSection } from "@/components/sections/home/TrustSection";
import {
  campaigns,
  heroSlides,
  introSection,
  newsItems,
  promoBanner,
  storyTabs,
  trustSection,
} from "@/content/home";
import styles from "./page.module.css";

// TODO(Step 5): S8~S10 섹션 추가.
export default function HomePage() {
  return (
    <>
      <HeroSlider slides={heroSlides} />
      <div className={styles.storySection}>
        <StoryBento tabs={storyTabs} />
      </div>
      <div className={styles.bannerSection}>
        <PromoBanner
          href={promoBanner.href}
          image={promoBanner.image}
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
    </>
  );
}
