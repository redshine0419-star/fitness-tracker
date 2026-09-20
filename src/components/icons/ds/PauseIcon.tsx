import type { DsIconProps } from "./types";

// edm-design-system.md §8-6 — verbatim
export function PauseIcon({ className, ...rest }: DsIconProps) {
  return (
    <svg
      width="10"
      height="16"
      viewBox="0 0 10 16"
      fill="none"
      className={className}
      aria-hidden={rest["aria-hidden"] ?? true}
    >
      <rect width="3" height="16" rx="1.5" fill="currentColor" />
      <rect x="7" width="3" height="16" rx="1.5" fill="currentColor" />
    </svg>
  );
}
