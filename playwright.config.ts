import { defineConfig, devices } from "@playwright/test";

// PROJECT_SPEC §14.2 — 1920×1080 / 768×1024 / 360×800 3구간 검증.
// 이 샌드박스는 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers에 Chromium이 미리
// 설치되어 있다. 다른 환경에서는 `npx playwright install chromium`이 필요하다 (README 참고).
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    // 이 샌드박스에 미리 설치된 전체 Chromium 바이너리를 명시한다. 지정하지 않으면
    // Playwright가 headless 모드에서 별도의 "chromium_headless_shell" 빌드를 찾는데,
    // 이 환경에는 그 리비전이 없어 실행이 실패한다. 다른 환경에서는 이 env var가
    // 없으면 Playwright 기본 브라우저를 사용한다.
    launchOptions: process.env.PW_CHROMIUM_PATH
      ? { executablePath: process.env.PW_CHROMIUM_PATH }
      : undefined,
  },
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "Desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1920, height: 1080 } },
    },
    {
      name: "Tablet",
      use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 } },
    },
    {
      name: "Mobile",
      use: { ...devices["Desktop Chrome"], viewport: { width: 360, height: 800 } },
    },
  ],
});
