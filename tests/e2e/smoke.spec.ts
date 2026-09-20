import { test, expect } from "@playwright/test";

// PROJECT_SPEC §14.2 — 가로 스크롤 없음, 콘솔 에러 0.
// Step별로 이 파일에 시나리오를 추가해 나간다 (Step 2: 메가메뉴/모바일메뉴,
// Step 3: 탭/캐러셀, Step 5: 폼 검증, Step 7: axe 전체 스캔).

test("home page has no console errors and no horizontal scroll", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();

  const hasHorizontalScroll = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalScroll).toBe(false);
  expect(errors).toEqual([]);
});
