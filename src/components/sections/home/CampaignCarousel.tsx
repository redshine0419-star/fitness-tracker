"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge01 } from "@/components/ui/Badge01";
import { Card } from "@/components/ui/Card";
import { CarouselIndicatorPill, CarouselMobilePill } from "@/components/ui/CarouselControls";
import type { Campaign } from "@/content/types";
import styles from "./CampaignCarousel.module.css";

interface CampaignCarouselProps {
  campaigns: Campaign[];
}

// PROJECT_SPEC §7 S6 — embla-carousel-react, slidesToScroll:'auto'(페이지 단위), PC는
// 헤더 우측 인디케이터 pill, Mobile은 화살표 없이 스와이프 + 하단 우측 pill.
export function CampaignCarousel({ campaigns }: CampaignCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", slidesToScroll: "auto" });
  const [selectedPage, setSelectedPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelectedPage(api.selectedScrollSnap());
    setPageCount(api.scrollSnapList().length);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    // embla-carousel-react's own docs call the select handler once here to sync
    // initial state from the freshly created instance, then subscribe for changes —
    // there is no pre-mount snapshot to read, so this synchronous call is necessary.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section aria-labelledby="campaign-heading" className="container">
      <SectionHeader
        id="campaign-heading"
        eyebrow="CAMPAIGN"
        title="진행중인 사업 · 캠페인"
        description="지금 함께할 수 있는 사업과 캠페인을 소개합니다."
        actionSlot={
          <div className={styles.desktopIndicator}>
            <CarouselIndicatorPill
              current={selectedPage + 1}
              total={pageCount}
              onPrev={() => emblaApi?.scrollPrev()}
              onNext={() => emblaApi?.scrollNext()}
              labelPrefix="캠페인"
            />
          </div>
        }
      />

      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {campaigns.map((campaign) => (
            <div key={campaign.href + campaign.title} className={styles.slide}>
              <Card
                href={campaign.href}
                image={campaign.image}
                title={campaign.title}
                description={campaign.description}
                eyebrow={<Badge01 variant="border">{campaign.category}</Badge01>}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.mobileIndicator}>
        <CarouselMobilePill current={selectedPage + 1} total={pageCount} />
      </div>
    </section>
  );
}
