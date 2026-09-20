import { test, expect } from "@playwright/test";

// PROJECT_SPEC §15 Step 6 완료 기준 — "dataLayer push 확인, JSON-LD에 {{TODO}} 미노출".

test("JSON-LD에 '{{TODO}}' 플레이스홀더가 노출되지 않는다", async ({ page }) => {
  await page.goto("/");
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(scripts.length).toBeGreaterThan(0);
  for (const json of scripts) {
    expect(json).not.toContain("{{TODO}}");
    expect(() => JSON.parse(json)).not.toThrow();
  }
});

test("뉴스레터 검증 실패 시 dataLayer에 main_newsletter/submit_error가 push된다", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
  });
  await page.getByRole("button", { name: "신청하기" }).click();

  const events = await page.evaluate(
    () => (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer,
  );
  expect(events.at(-1)).toMatchObject({
    event: "custom_event",
    event_category: "main_newsletter",
    event_action: "submit_error",
    // §12 — label은 오류 필드명만(값 금지). 첫 검증 실패는 항상 "name".
    event_label: "name",
  });
});

test("캠페인 캐러셀 다음 버튼 클릭 시 dataLayer에 main_campaign/page_next가 push된다 (문서 전역 click 위임 확인)", async ({
  page,
}) => {
  const viewport = page.viewportSize();
  test.skip(!viewport || viewport.width < 768, "인디케이터 pill은 >=768px 헤더에만 보인다");

  await page.goto("/");
  const nextButton = page.getByRole("button", { name: "캠페인 다음" });
  const counter = nextButton.locator("..").locator("[class*='counter']").first();
  // CampaignCarousel의 embla 초기 측정 레이스가 끝날 때까지 기다린다 (DEVIATIONS #10).
  await expect(counter).toHaveText(/^1 \/ [2-9]$/);

  await page.evaluate(() => {
    (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
  });
  await nextButton.click();

  const events = await page.evaluate(
    () => (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer,
  );
  expect(events.at(-1)).toMatchObject({
    event: "custom_event",
    event_category: "main_campaign",
    event_action: "page_next",
  });
});
