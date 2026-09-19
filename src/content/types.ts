// Content model types — PROJECT_SPEC §13.1, copied 1:1.

export type Todo = "{{TODO}}";

export interface ImageAsset {
  pc: string;
  mobile?: string;
  alt: string;
  width: number;
  height: number;
}

export interface SiteConfig {
  name: string | Todo; // 단체명
  tagline: string; // h1(시각적으로만 숨김) + 메타 title
  description: string; // 메타 description, 120자 내외
  url: string; // NEXT_PUBLIC_SITE_URL
  logo: { src?: string; wordmark: string }; // src가 없으면 텍스트 워드마크
  contact: { phone: string | Todo; email?: string | Todo; hours: string | Todo };
  sns: { youtube?: string; blog?: string; instagram?: string };
}

export interface HeroSlide {
  image: ImageAsset;
  label: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
}

export interface StoryItem {
  image: ImageAsset;
  title: string;
  href: string;
  category?: string;
}

export interface Campaign {
  image: ImageAsset;
  category: string;
  title: string;
  description: string;
  href: string;
}

export interface NewsItem {
  image?: ImageAsset;
  category: string;
  title: string;
  date: string;
  href: string;
}

export interface Credential {
  icon: "globe" | "award" | "handshake";
  text: string | Todo;
}

export interface QuickLink {
  icon: string;
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  groups: { title: string; links: { label: string; href: string }[] }[];
  promo: { image: ImageAsset; title: string; href: string }[];
}

export interface FooterEntity {
  name: string | Todo;
  representative: string | Todo;
  bizNo: string | Todo;
  address: string | Todo;
}
