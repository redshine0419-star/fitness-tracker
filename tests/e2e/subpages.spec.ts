import { AxeBuilder } from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

// 핵심 서브페이지(기관소개/사업안내/스토리/소식/후원하기) 스모크 + 접근성 검증.
// PROJECT_SPEC은 Phase 1을 메인 페이지로 한정하지만, 사용자 요청으로 이 5개 페이지를
// 추가했다 — 나머지 링크는 여전히 /coming-soon 스텁으로 남아 있다.

const pages: { path: string; heading: string }[] = [
  { path: "/about", heading: "기관소개" },
  { path: "/programs", heading: "사업안내" },
  { path: "/story", heading: "스토리" },
  { path: "/news", heading: "소식" },
  { path: "/donate", heading: "후원하기" },
];

for (const { path, heading } of pages) {
  test(`${path}: 콘솔 에러 없이 로드되고 제목이 보인다`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto(path, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: heading, level: 2 }).first()).toBeVisible();

    const hasHorizontalScroll = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalScroll).toBe(false);
    expect(errors).toEqual([]);
  });

  test(`${path}: axe 검사 — color-contrast를 제외한 serious/critical 위반이 없다`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page }).analyze();
    const seriousOrCritical = results.violations.filter(
      (v) => (v.impact === "serious" || v.impact === "critical") && v.id !== "color-contrast",
    );
    expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([]);
  });
}

test("헤더 GNB 링크가 실제 서브페이지로 이동한다 (예: 후원하기)", async ({ page }) => {
  const viewport = page.viewportSize();
  test.skip(!viewport || viewport.width < 1024, "데스크톱 GNB는 >=1024px에서만 보인다");

  await page.goto("/");
  await page.locator("#gnb nav").getByRole("link", { name: "후원하기", exact: true }).click();
  await expect(page).toHaveURL(/\/donate$/);
  await expect(page.getByRole("heading", { name: "후원하기", level: 2 }).first()).toBeVisible();
});

test("/story: 탭을 바꾸면 해당 패널의 카드가 보인다", async ({ page }) => {
  await page.goto("/story");
  await page.getByRole("tab", { name: "활동 이야기" }).click();
  const panel = page.locator("#tabpanel-activity");
  await expect(panel).toBeVisible();
  await expect(panel).toContainText("활동 이야기 현장에서");
});
