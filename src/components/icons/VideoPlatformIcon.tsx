interface IconProps {
  width?: number;
  height?: number;
  "aria-hidden"?: boolean;
}

// lucide-react 최신 버전에서 브랜드 로고 아이콘(Youtube 등)이 전부 제거되어
// (docs/DEVIATIONS.md 참고) 일반적인 "영상 재생" 픽토그램으로 대체했다.
// DS §4 아이콘 규칙과 동일하게 24x24 viewBox, stroke 2px, round cap/join.
export function VideoPlatformIcon({ width = 20, height = 20, ...rest }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={rest["aria-hidden"] ?? true}
    >
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 9.5L15 12L10.5 14.5V9.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
