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
  await nextButton.click();
  await page.waitForTimeout(400);
  // scroll snap 전환 후 다음 카드 그룹이 보이는지는 embla 내부 상태라 카운터로 확인한다.
  await expect(page.getByText("2 /").first()).toBeVisible();
});
