// SAMPLE CONTENT — 배포 전 교체
import type { ImageAsset } from "./types";

export const donateHero = {
  eyebrow: "DONATE",
  title: "후원하기",
  description: "나눔의 방식은 다양합니다. 상황에 맞는 방법으로 함께해 주세요.",
};

export const donateWays: {
  image: ImageAsset;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
}[] = [
  {
    image: { pc: "/illustrations/monthly-giving.svg", alt: "", width: 480, height: 320 },
    title: "정기후원",
    description: "매달 일정 금액을 약정해 지속적인 지원을 함께 이어갑니다.",
    buttonLabel: "정기후원 시작하기",
    href: "/coming-soon/donate/regular-club",
  },
  {
    image: { pc: "/illustrations/gift-box.svg", alt: "", width: 480, height: 320 },
    title: "일시후원",
    description: "한 번의 후원으로 지금 필요한 곳에 힘을 보탤 수 있습니다.",
    buttonLabel: "일시후원 하기",
    href: "/coming-soon/donate/one-time",
  },
  {
    image: { pc: "/illustrations/child-sponsorship.svg", alt: "", width: 480, height: 320 },
    title: "아동결연",
    description: "한 아이와 결연해 교육과 건강, 성장 과정을 함께 지켜봅니다.",
    buttonLabel: "결연 후원 알아보기",
    href: "/coming-soon/donate/sponsorship",
  },
  {
    image: { pc: "/illustrations/global-cooperation.svg", alt: "", width: 480, height: 320 },
    title: "기업후원",
    description: "기업의 사회공헌 활동으로 아동과 지역사회에 함께할 수 있습니다.",
    buttonLabel: "기업 후원 문의",
    href: "/coming-soon/donate/corporate",
  },
];
