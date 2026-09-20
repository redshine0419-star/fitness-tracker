import { test, expect } from "@playwright/test";

// PROJECT_SPEC §14.2 — 네트워크 요청 도메인 허용 목록: 자기 자신, GTM(설정 시),
// (영상 재생 클릭 후) youtube-nocookie.com. 그 밖의 도메인 요청이 있으면 실패한다
// (트래커가 다시 들어오는 것을 막는 장치).
const ALLOWED_HOSTS = new Set(["localhost", "www.googletagmanager.com", "www.youtube-nocookie.com"]);

test("홈 로드시 허용된 도메인으로만 요청한다", async ({ page }) => {
  const hosts = new Set<string>();
  page.on("request", (req) => {
    hosts.add(new URL(req.url()).hostname);
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  for (const host of hosts) {
    expect(ALLOWED_HOSTS.has(host), `허용되지 않은 도메인으로 요청함: ${host}`).toBe(true);
  }
  // youtube-nocookie는 영상 재생 클릭 전에는 절대 로드되면 안 된다.
  expect(hosts.has("www.youtube-nocookie.com")).toBe(false);
});

test("영상 재생 클릭 후에만 youtube-nocookie.com iframe이 생긴다", async ({ page }) => {
  await page.goto("/");
  const playButton = page.getByRole("button", { name: /영상 재생/ });
  await playButton.click();

  const iframe = page.locator('iframe[src*="youtube-nocookie.com"]');
  await expect(iframe).toBeVisible();

  const src = await iframe.getAttribute("src");
  expect(new URL(src ?? "").hostname).toBe("www.youtube-nocookie.com");
});
