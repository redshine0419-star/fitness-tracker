// PROJECT_SPEC §12 — track()가 dataLayer.push()를 담당하고, 마크업의
// data-track-cat/data-track-action/data-track-label(-extra) 속성은 문서 전역
// click 위임 한 곳(initAnalyticsClickDelegation)에서만 읽는다. 개별 컴포넌트는
// onClick 안에서 직접 dataLayer를 건드리지 않는다 (Newsletter의 submit_success/
// submit_error처럼 클릭 이벤트가 아닌 경우만 예외로 track()을 직접 호출한다).

export interface TrackEventParams {
  category: string;
  action: string;
  label?: string;
  extra?: Record<string, string | number | boolean>;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track({ category, action, label, extra }: TrackEventParams): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: "custom_event",
    event_name: action,
    event_category: category,
    event_action: action,
    event_label: label,
    ...extra,
  });
}

const DELEGATION_INSTALLED_FLAG = "__analyticsClickDelegationInstalled";

// data-track-cat이 있는 가장 가까운 조상 요소를 찾아 한 번만 push한다.
export function initAnalyticsClickDelegation(): void {
  if (typeof document === "undefined") return;
  const flagged = window as unknown as Record<string, boolean | undefined>;
  if (flagged[DELEGATION_INSTALLED_FLAG]) return;
  flagged[DELEGATION_INSTALLED_FLAG] = true;

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const trigger = event.target.closest<HTMLElement>("[data-track-cat]");
    if (!trigger) return;

    const category = trigger.dataset.trackCat;
    const action = trigger.dataset.trackAction;
    if (!category || !action) return;

    let extra: Record<string, string> | undefined;
    if (trigger.dataset.trackExtra) {
      try {
        extra = JSON.parse(trigger.dataset.trackExtra) as Record<string, string>;
      } catch {
        extra = undefined;
      }
    }

    track({ category, action, label: trigger.dataset.trackLabel, extra });
  });
}
