import { test, expect } from "@playwright/test";

// PROJECT_SPEC §7 S5/S6 — 신뢰 지표 밴드는 기본 숨김(§16), 캠페인 캐러셀은 인디케이터
// pill의 다음 버튼으로 페이지가 넘어가야 한다.

test("trust band is hidden by default (home.trust.enabled = false)", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("region", { name: "신뢰 지표" })).toHaveCount(0);
});

test("campaign carousel: indicator pill next button advances the page", async ({ page }) => {
  const viewport = page.viewportSize();
  test.skip(!viewport || viewport.width < 768, "인디케이터 pill은 >=768px 헤더에만 보인다");

  await page.goto("/");
  const nextButton = page.getByRole("button", { name: "캠페인 다음" });
  await expect(nextButton).toBeVisible();
  // scroll snap 전환 후 다음 카드 그룹이 보이는지는 embla 내부 상태라 카운터로 확인한다.
  // (Hero 배너의 "N / 3" 카운터와 혼동되지 않도록 인디케이터 pill 컨테이너로 범위를 좁힌다)
  // embla는 마운트 직후 한 박자 뒤에 정확한 페이지 수로 스스로 보정하므로(레이아웃/폰트
  // 교체 타이밍), 그 보정이 끝나 총 페이지 수(N)가 1보다 커진 뒤에 클릭해야 경쟁 상태를
  // 피한다. 뷰포트별로 한 화면에 보이는 카드 수가 달라 총 페이지 수 자체는 고정값으로
  // 단정하지 않는다 (Desktop 4장/Desktop-S 3장/Tablet 2장 보기).
  const counter = nextButton.locator("..").locator("[class*='counter']").first();
  await expect(counter).not.toHaveText("1 / 1");
  await expect(counter).toHaveText(/^1 \/ [2-9]$/);
  await nextButton.click();
  await expect(counter).toHaveText(/^2 \/ [2-9]$/);
});
