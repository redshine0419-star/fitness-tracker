"use client";

import { useEffect } from "react";
import { initAnalyticsClickDelegation } from "@/lib/analytics";

// layout.tsx에 한 번만 마운트해 문서 전역 click 위임을 설치한다 (PROJECT_SPEC §12).
export function AnalyticsInit() {
  useEffect(() => {
    initAnalyticsClickDelegation();
  }, []);
  return null;
}
