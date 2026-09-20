import type { DsIconProps } from "./types";

// edm-design-system.md §8-6 "Plus" — verbatim (fill is hardcoded white in the
// DS source itself: the Plus button's icon is always white regardless of the
// black/hover-gray circle behind it).
export function PlusIcon({ className, ...rest }: DsIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden={rest["aria-hidden"] ?? true}
    >
      <rect x="11" width="3" height="24" rx="1.5" fill="white" />
      <rect
        x="24"
        y="10"
        width="3"
        height="24"
        rx="1.5"
        transform="rotate(90 24 10)"
        fill="white"
      />
    </svg>
  );
}
