import type { DsIconProps } from "./types";

// edm-design-system.md §8-6 "Left" — verbatim
export function CarouselLeftIcon({ className, ...rest }: DsIconProps) {
  return (
    <svg
      width="11"
      height="19"
      viewBox="0 0 11 19"
      fill="none"
      className={className}
      aria-hidden={rest["aria-hidden"] ?? true}
    >
      <path
        d="M9.5 17.5L1.5 9.5L9.5 1.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
