import type { DsIconProps } from "./types";

// edm-design-system.md §8-6 "Play" — verbatim
export function PlayIcon({ className, ...rest }: DsIconProps) {
  return (
    <svg
      width="13"
      height="16"
      viewBox="0 0 13 16"
      fill="none"
      className={className}
      aria-hidden={rest["aria-hidden"] ?? true}
    >
      <path
        d="M11.5318 7.05542C12.7464 7.7323 12.7509 8.58379 11.5318 9.34905L2.11224 15.7018C0.928691 16.3334 0.124853 15.9605 0.0404727 14.5938L0.000502874 1.29762C-0.0261437 0.0387069 1.01085 -0.316979 1.99899 0.286609L11.5318 7.05542Z"
        fill="currentColor"
      />
    </svg>
  );
}
