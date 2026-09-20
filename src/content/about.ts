// SAMPLE CONTENT — 배포 전 교체
// PROJECT_SPEC §2-1: 원본(굿네이버스)의 문구를 옮기지 않고 일반적인 문구로 새로 작성.
// §2-2: 설립 연도·수치 등 사실 주장은 확정 전까지 '{{TODO}}'.
import type { ImageAsset } from "./types";

export const aboutHero = {
  eyebrow: "ABOUT",
  title: "기관소개",
  description: "우리가 어떤 마음으로, 어떤 방식으로 아동과 지역사회 곁에 서 있는지 소개합니다.",
};

export const missionSection: {
  image: ImageAsset;
  title: string;
  paragraphs: string[];
} = {
  image: { pc: "/illustrations/mission.svg", alt: "", width: 800, height: 600 },
  title: "설립 정신",
  paragraphs: [
    "우리는 아동과 지역사회가 스스로 일어설 수 있는 힘을 기르도록 돕기 위해 시작되었습니다.",
    "한 아이의 변화가 가정을, 가정의 변화가 지역사회를 바꿀 수 있다고 믿습니다.",
    "후원자와 함께 만든 신뢰를 바탕으로, 도움이 필요한 곳에 꾸준히 곁을 지키겠습니다.",
  ],
};

export const valueCards: { title: string; description: string }[] = [
  { title: "투명성", description: "후원금이 쓰이는 과정을 있는 그대로 보고하고, 궁금한 점에는 성실히 답합니다." },
  { title: "전문성", description: "현장의 필요를 정확히 파악하고, 검증된 방식으로 지원을 설계합니다." },
  { title: "지속가능성", description: "일회성 지원이 아니라, 스스로 일어설 힘을 기르는 변화를 함께 만듭니다." },
];

export const orgStats: { label: string; value: string }[] = [
  { label: "설립연도", value: "{{TODO}}" },
  { label: "국내 조직", value: "{{TODO}}" },
  { label: "해외 협력국", value: "{{TODO}}" },
  { label: "결연 아동 수", value: "{{TODO}}" },
];
