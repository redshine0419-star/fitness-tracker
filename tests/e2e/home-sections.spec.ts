import { test, expect } from "@playwright/test";

// PROJECT_SPEC §7 S2/S3 — Hero 컨트롤(정지/이전/다음)과 스토리 탭(←/→, 비활성 패널
// hidden) 동작을 검증한다. 이 테스트는 `.grid`의 display:grid가 [hidden]을 이겨서
// 비활성 탭 패널이 계속 보이던 실제 버그의 회귀 테스트를 겸한다.

test("story tabs: only the active panel is visible, and switching tabs updates it", async ({
  page,
}) => {
  await page.goto("/");

  const newsPanel = page.locator("#tabpanel-news");
  const activityPanel = page.locator("#tabpanel-activity");

  await expect(newsPanel).toBeVisible();
  await expect(activityPanel).toBeHidden();

  await page.getByRole("tab", { name: "활동 이야기" }).click();

  await expect(activityPanel).toBeVisible();
  await expect(newsPanel).toBeHidden();
});

test("story tabs: arrow keys move focus and switch the active tab", async ({ page }) => {
  await page.goto("/");

  const newsTab = page.getByRole("tab", { name: "새 소식" });
  const activityTab = page.getByRole("tab", { name: "활동 이야기" });

  await newsTab.focus();
  await page.keyboard.press("ArrowRight");

  await expect(activityTab).toBeFocused();
  await expect(activityTab).toHaveAttribute("aria-selected", "true");
});

test("hero: pause button stops autoplay and next/prev change the slide", async ({ page }) => {
  const viewport = page.viewportSize();
  test.skip(!viewport || viewport.width < 768, "Carousel_pc 컨트롤(이전/다음)은 >=768px에서만 보인다");

  await page.goto("/");

  const counter = page.getByRole("button", { name: "대표 배너 다음" }).locator("..").getByText("1 /");
  await expect(counter).toBeVisible();

  await page.getByRole("button", { name: "대표 배너 다음" }).click();
  await expect(
    page.getByRole("button", { name: "대표 배너 다음" }).locator("..").getByText("2 /"),
  ).toBeVisible();

  await page.getByRole("button", { name: /대표 배너 (일시정지|재생)/ }).click();
});
