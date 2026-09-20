import type { Metadata } from "next";

// page.tsx는 "use client"라 metadata를 직접 export할 수 없어 layout에서 noindex를 건다.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DevComponentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
