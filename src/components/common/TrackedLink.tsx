import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

interface TrackedLinkProps
  extends LinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  children: ReactNode;
  trackCategory: string;
  trackAction: string;
  trackLabel?: string;
  trackExtra?: Record<string, string>;
}

// PROJECT_SPEC §12 — data-track-cat/-action/-label(-extra) 속성을 붙이는 공용 링크.
// 실제 dataLayer push는 이 컴포넌트가 아니라 문서 전역 click 위임 한 곳
// (lib/analytics.ts의 initAnalyticsClickDelegation)에서 처리한다.
export function TrackedLink({
  trackCategory,
  trackAction,
  trackLabel,
  trackExtra,
  children,
  ...rest
}: TrackedLinkProps) {
  return (
    <Link
      {...rest}
      data-track-cat={trackCategory}
      data-track-action={trackAction}
      data-track-label={trackLabel}
      data-track-extra={trackExtra ? JSON.stringify(trackExtra) : undefined}
    >
      {children}
    </Link>
  );
}
