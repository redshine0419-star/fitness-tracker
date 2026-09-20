interface IconProps {
  width?: number;
  height?: number;
  "aria-hidden"?: boolean;
}

// lucide-react 최신 버전에서 브랜드 로고 아이콘(Instagram 등)이 전부 제거되어
// (docs/DEVIATIONS.md 참고) 일반적인 "카메라" 픽토그램으로 대체했다.
// DS §4 아이콘 규칙과 동일하게 24x24 viewBox, stroke 2px, round cap/join.
export function PhotoPlatformIcon({ width = 20, height = 20, ...rest }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={rest["aria-hidden"] ?? true}
    >
      <path
        d="M4 8C4 6.89543 4.89543 6 6 6H8L9.5 4H14.5L16 6H18C19.1046 6 20 6.89543 20 8V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12.5" r="3.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
