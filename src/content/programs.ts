// SAMPLE CONTENT — 배포 전 교체
import type { ImageAsset } from "./types";

export const programsHero = {
  eyebrow: "PROGRAMS",
  title: "사업안내",
  description: "국내외 현장에서 진행하는 사업을 소개합니다.",
};

export const programCategories: {
  image: ImageAsset;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    image: {
      pc: "/photos/community-outreach.jpg",
      alt: "해외 지역 아동들이 커뮤니티 공간에 모여 함께 즐거워하고 있다.",
      width: 960,
      height: 720,
    },
    title: "국제협력사업",
    description: "식수·위생, 보건, 교육 등 해외 취약 지역의 아동과 지역사회를 지원합니다.",
    href: "/coming-soon/programs/international",
  },
  {
    image: { pc: "/illustrations/community-center.svg", alt: "", width: 480, height: 320 },
    title: "국내복지사업",
    description: "지역아동센터와 함께 국내 취약계층 아동의 학습·정서 지원을 돕습니다.",
    href: "/coming-soon/programs/domestic",
  },
  {
    image: { pc: "/illustrations/education.svg", alt: "", width: 480, height: 320 },
    title: "교육·연구",
    description: "청소년 진로 교육 프로그램을 운영하고, 지원 방식의 효과를 연구합니다.",
    href: "/coming-soon/programs/education",
  },
];
