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

// 버그 회귀 테스트 — MegaMenu의 .panel을 .header(position:sticky) 기준 전체 폭으로
// 펼쳐지도록 고치면서, .navItem 자체의 작은 hover 영역과 패널 사이에 빈 공간이
// 생겨 그 사이를 지나가는 순간 메뉴가 먼저 닫혀버리는 회귀가 있었다.
// mouseleave를 .header로 옮겨 패널과 완전히 맞닿게 해 고쳤다.
test("desktop: 마우스를 링크에서 패널로 이동해도(경유 지점 포함) 메뉴가 유지된다", async ({ page }) => {
  const viewport = page.viewportSize();
  test.skip(!viewport || viewport.width < 1024, "메가메뉴는 >=1024px에서만 렌더링된다");

  await page.goto("/");
  const nav = page.locator("#gnb nav").getByRole("link", { name: "후원하기", exact: true });
  const box = await nav.boundingBox();
  if (!box) throw new Error("nav link has no bounding box");

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(200);
  const panel = page.locator('[id^="megamenu-"]');
  await expect(panel).toHaveCount(1);
  const panelBox = await panel.boundingBox();
  if (!panelBox) throw new Error("panel has no bounding box");

  // 링크 중심에서 패널 중심까지 여러 지점을 거쳐 이동한다(실제 사용자의 대각선 이동 재현).
  const steps = 15;
  const startX = box.x + box.width / 2;
  const startY = box.y + box.height / 2;
  const endX = panelBox.x + panelBox.width / 2;
  const endY = panelBox.y + panelBox.height / 2;
  for (let i = 1; i <= steps; i++) {
    await page.mouse.move(startX + ((endX - startX) * i) / steps, startY + ((endY - startY) * i) / steps);
    await page.waitForTimeout(15);
  }
  await expect(panel).toHaveCount(1);
});

test("desktop: 헤더·패널을 완전히 벗어나면 메뉴가 닫힌다", async ({ page }) => {
  const viewport = page.viewportSize();
  test.skip(!viewport || viewport.width < 1024, "메가메뉴는 >=1024px에서만 렌더링된다");

  await page.goto("/");
  const nav = page.locator("#gnb nav").getByRole("link", { name: "후원하기", exact: true });
  const box = await nav.boundingBox();
  if (!box) throw new Error("nav link has no bounding box");

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(200);
  const panel = page.locator('[id^="megamenu-"]');
  await expect(panel).toHaveCount(1);

  await page.mouse.move(box.x + box.width / 2, 800, { steps: 10 });
  await expect(panel).toHaveCount(0);
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
