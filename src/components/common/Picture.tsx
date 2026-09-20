import type { ImageAsset } from "@/content/types";

interface PictureProps {
  image: ImageAsset;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

// PROJECT_SPEC §4 common/Picture — PC/Mobile 이미지를 따로 받아 <picture>로 전환한다.
// 이미지가 전부 public/placeholder/의 정적 SVG(§13.1)라 next/image 최적화 파이프라인을
// 거칠 필요가 없어(래스터 리사이즈 이득이 없고, SVG는 dangerouslyAllowSVG 설정이 추가로
// 필요해짐) 순수 <picture>/<img>로 구현한다. width/height 고정으로 CLS를 방지하고,
// priority(첫 Hero 슬라이드)에서만 fetchpriority="high" + eager loading을 쓴다 (§7 S2).
export function Picture({ image, className, priority = false }: PictureProps) {
  return (
    <picture>
      {image.mobile && <source media="(max-width: 767px)" srcSet={image.mobile} />}
      <img
        src={image.pc}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
      />
    </picture>
  );
}
