import type { DsIconProps } from "./types";

// edm-design-system.md §8-11 "search.svg" — verbatim
export function SearchIcon({ className, ...rest }: DsIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden={rest["aria-hidden"] ?? true}
    >
      <path
        d="M11.3705 19.0741C15.6252 19.0741 19.0743 15.625 19.0743 11.3703C19.0743 7.1156 15.6252 3.6665 11.3705 3.6665C7.11585 3.6665 3.66675 7.1156 3.66675 11.3703C3.66675 15.625 7.11585 19.0741 11.3705 19.0741Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.0002 21L16.8113 16.811"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
