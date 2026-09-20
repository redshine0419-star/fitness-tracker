"use client";

import { useState } from "react";
import { Picture } from "@/components/common/Picture";
import { VisuallyHidden } from "@/components/common/VisuallyHidden";
import { PlayIcon } from "@/components/icons/ds/PlayIcon";
import { Badge01 } from "@/components/ui/Badge01";
import { Button } from "@/components/ui/Button";
import type { ImageAsset } from "@/content/types";
import styles from "./FeaturedVideo.module.css";

interface FeaturedVideoProps {
  videoId: string;
  thumbnail: ImageAsset;
  category: string;
  title: string;
  description: string;
}

// PROJECT_SPEC §7 S8 — YouTube facade: 클릭 전에는 썸네일+재생 버튼만 렌더링하고,
// 클릭 시에만 youtube-nocookie.com iframe으로 교체한다 (페이지 로드 시 YouTube 스크립트 미로드).
export function FeaturedVideo({ videoId, thumbnail, category, title, description }: FeaturedVideoProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <section aria-labelledby="featured-video-heading" className={`container grid ${styles.layout}`}>
      <div className={styles.videoWrap}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            title={title}
            className={styles.iframe}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className={styles.facadeButton}
            onClick={() => setPlaying(true)}
            aria-label={`영상 재생: ${title}`}
            data-track-cat="main_featured"
            data-track-action="play"
            data-track-label={title}
          >
            <Picture image={thumbnail} className={styles.thumbnail} />
            <span className={styles.playCircle}>
              <PlayIcon />
            </span>
          </button>
        )}
      </div>

      <div className={styles.text}>
        <VisuallyHidden as="h2" id="featured-video-heading">
          대표 캠페인 영상
        </VisuallyHidden>
        <Badge01 variant="border">{category}</Badge01>
        <h3 className="t-h3-bold">{title}</h3>
        <p className="t-body1-regular">{description}</p>
        <div className={styles.buttons}>
          <Button
            href="/coming-soon/story/videos"
            styleVariant="border"
            color="secondary"
            shape="square"
            data-track-cat="main_featured"
            data-track-action="cta_more"
            data-track-label={title}
          >
            자세히 보기
          </Button>
          <Button
            href="/coming-soon/donate"
            shape="square"
            data-track-cat="main_featured"
            data-track-action="cta_donate"
            data-track-label={title}
            data-track-extra='{"cta_type":"donate"}'
          >
            후원하기
          </Button>
        </div>
      </div>
    </section>
  );
}
