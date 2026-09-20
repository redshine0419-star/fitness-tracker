import { test, expect } from "@playwright/test";

// PROJECT_SPEC §9 키보드 조작 체크리스트 — 메가메뉴(hover·키보드), 모바일 메뉴(열기·
// 포커스 트랩·Esc). Desktop 프로젝트에서는 메가메뉴를, Mobile/Tablet 프로젝트에서는
// 모바일 메뉴를 검사한다 (뷰포트 폭으로 분기).

test("desktop: keyboard focus opens mega menu and Escape closes it", async ({ page }) => {
  const viewport = page.viewportSize();
  test.skip(!viewport || viewport.width < 1024, "메가메뉴는 >=1024px에서만 렌더링된다");

  await page.goto("/");
  const firstNavLink = page.getByRole("link", { name: "후원하기", exact: true }).first();
  await firstNavLink.focus();
  await expect(firstNavLink).toHaveAttribute("aria-expanded", "true");

  const panel = page.locator('[role="group"][aria-label="후원하기 하위 메뉴"]');
  await expect(panel).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(firstNavLink).toHaveAttribute("aria-expanded", "false");
});

test("mobile: hamburger opens full-screen menu with focus trap and Escape closes it", async ({
  page,
}) => {
  const viewport = page.viewportSize();
  test.skip(!viewport || viewport.width >= 1024, "모바일 메뉴는 <1024px에서만 트리거가 보인다");

  await page.goto("/");
  const trigger = page.getByRole("button", { name: "메뉴 열기" });
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "전체 메뉴" });
  await expect(dialog).toBeVisible();

  const closeButton = page.getByRole("button", { name: "메뉴 닫기" });
  await expect(closeButton).toBeFocused();

  const firstAccordion = dialog.getByRole("button", { name: "후원하기" });
  await firstAccordion.click();
  await expect(firstAccordion).toHaveAttribute("aria-expanded", "true");

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
