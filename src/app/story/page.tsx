import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import { StoryListTabs } from "@/components/sections/story/StoryListTabs";
import { storyHero, storyListTabs } from "@/content/story";
import { siteConfig } from "@/content/site.config";
import styles from "./story.module.css";

export const metadata: Metadata = {
  title: `스토리 | ${siteConfig.name}`,
  description: storyHero.description,
};

export default function StoryPage() {
  return (
    <>
      <PageHeader
        eyebrow={storyHero.eyebrow}
        title={storyHero.title}
        description={storyHero.description}
        breadcrumb={[{ label: "홈", href: "/" }, { label: "스토리" }]}
      />

      <section aria-label="스토리 목록" className={`container ${styles.section}`}>
        <StoryListTabs tabs={storyListTabs} />
      </section>
    </>
  );
}
