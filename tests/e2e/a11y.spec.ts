import { AxeBuilder } from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

// PROJECT_SPEC §14.2 — axe로 /와 /coming-soon 검사. serious·critical 위반 0
// (§5.5 color-contrast는 known issue로 개수만 보고한다 — §16 결정: DS 원안 유지이며
// 값을 한 줄로 분리 교체할 수 있게 토큰을 유지했다).

test("home: axe 검사 — color-contrast를 제외한 serious/critical 위반이 없다", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();

  const seriousOrCritical = results.violations.filter(
    (v) => (v.impact === "serious" || v.impact === "critical") && v.id !== "color-contrast",
  );
  expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([]);

  const contrastViolation = results.violations.find((v) => v.id === "color-contrast");
  console.log(
    `[known issue, §5.5] color-contrast 위반 노드 수: ${contrastViolation?.nodes.length ?? 0}`,
  );
});

test("coming-soon: axe 검사 — color-contrast를 제외한 serious/critical 위반이 없다", async ({ page }) => {
  await page.goto("/coming-soon");
  const results = await new AxeBuilder({ page }).analyze();

  // color-contrast는 Header/Footer/Button 공용 컴포넌트가 그대로 쓰이는 모든 페이지에서
  // 나타나는 동일한 §5.5 known issue라 home과 같은 기준으로 제외한다.
  const seriousOrCritical = results.violations.filter(
    (v) => (v.impact === "serious" || v.impact === "critical") && v.id !== "color-contrast",
  );
  expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([]);
});
