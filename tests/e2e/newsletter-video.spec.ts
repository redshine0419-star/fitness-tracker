import { test, expect } from "@playwright/test";

// PROJECT_SPEC §7 S8/S10 — YouTube facade는 클릭 전까지 iframe을 로드하지 않아야
// 하고, 뉴스레터는 4가지 검증 규칙 + 성공 모달을 갖춰야 한다.

test("featured video: facade only loads the iframe after clicking play", async ({ page }) => {
  await page.goto("/");

  expect(await page.locator("iframe[src*='youtube-nocookie']").count()).toBe(0);

  await page.getByRole("button", { name: /^영상 재생:/ }).click();

  const iframe = page.locator("iframe[src*='youtube-nocookie']");
  await expect(iframe).toHaveCount(1);
});

test("newsletter: submitting empty form shows all four errors and focuses the name field", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "신청하기" }).click();

  await expect(page.getByText("이름을 입력해 주세요.")).toBeVisible();
  await expect(page.getByText("이메일 주소를 확인해 주세요. 예: name@example.com")).toBeVisible();
  await expect(page.getByText("관심사를 1개 이상 선택해 주세요.")).toBeVisible();
  await expect(page.getByText("신청하려면 개인정보 수집·이용에 동의해 주세요.")).toBeVisible();
  await expect(page.getByLabel("이름")).toBeFocused();
});

test("newsletter: valid submission shows the success modal with the required disclaimer", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByLabel("이름").fill("홍길동");
  await page.getByLabel("이메일").fill("hong@example.com");
  // 체크박스의 실제 <input>은 커스텀 UI로 대체하기 위해 시각적으로 숨겨져 있어
  // (label 클릭으로 실제 사용자는 정상 동작) force로 액션 가능성 검사를 건너뛴다.
  await page.getByRole("checkbox", { name: "국내 소식" }).check({ force: true });
  await page.getByRole("checkbox", { name: /개인정보 수집·이용에 동의합니다/ }).check({ force: true });
  await page.getByRole("button", { name: "신청하기" }).click();

  const dialog = page.getByRole("dialog", { name: "신청 화면이 정상 동작했습니다" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("테스트 화면입니다. 아직 신청 내용은 저장되지 않습니다.")).toBeVisible();
});

test("newsletter: consent [보기] link opens the collection-info modal", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "[보기]" }).click();
  await expect(page.getByRole("dialog", { name: "개인정보 수집·이용 동의" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "수집항목" })).toBeVisible();
});
