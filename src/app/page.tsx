import { HeroSlider } from "@/components/sections/home/HeroSlider";
import { PromoBanner } from "@/components/sections/home/PromoBanner";
import { StoryBento } from "@/components/sections/home/StoryBento";
import { heroSlides, promoBanner, storyTabs } from "@/content/home";
import styles from "./page.module.css";

// TODO(Step 4-5): S5~S10 섹션 추가.
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
    </>
  );
}
