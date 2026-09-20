# DEVIATIONS

스펙에 없거나 모호하거나 문서끼리 충돌하는 경우, 더 보수적인(제한적인) 쪽으로 결정하고 여기에 기록합니다.
형식: **무엇을 / 왜 / 대안**

---

### 1. `--white`, `--overlay-modal` 확장 토큰 추가 (Step 0)

- **무엇을**: PROJECT_SPEC §5.4가 정의한 확장 토큰 표에 없는 두 토큰을 tokens.css에 추가함.
  - `--white: #ffffff`
  - `--overlay-modal: rgba(0, 0, 0, 0.5)`
- **왜**: `check-tokens.mjs` 규칙 5("hex 색상 리터럴이 tokens.css 밖에 있음")를 지키려면 `globals.css`의 `body { background: ... }`가 하드코딩 hex가 아닌 변수를 참조해야 합니다. DS §0은 "캔버스: 항상 흰 배경"이라고 서술만 하고 별도 색상 토큰명을 주지 않습니다. Modal도 DS §8-8에 `overlay: rgba(0,0,0,0.5)`가 명시돼 있지만 시맨틱 토큰명이 없습니다. §2-3(토큰 외 값 금지)을 지키는 쪽이 §5.4 표를 그대로 두는 것보다 더 제한적인 규칙이라 판단해 토큰을 추가하는 쪽을 선택했습니다.
- **대안**: 두 값을 각각 사용처 CSS에 `ds-exceptions.json`으로 등록해 예외 처리할 수도 있었지만, 여러 컴포넌트(Modal 오버레이는 Step 1, body 배경은 Step 0)에서 반복 사용될 값이라 토큰화가 유지보수에 더 안전하다고 판단했습니다.

### 2. 단체명 기본값 표기 — `{{ORG_NAME}}` 대신 `'{{TODO}}'` 사용 (Step 0)

- **무엇을**: PROJECT_SPEC §16 표의 "기본값" 열에는 `{{ORG_NAME}}`이라고 적혀 있지만, 실제 `site.config.ts` 구현에는 §13.1의 `Todo = '{{TODO}}'` 타입 값을 그대로 사용함.
- **왜**: §2-2(사실 주장은 `'{{TODO}}'`로 둔다)와 §13.1의 타입 정의가 코드 레벨의 구체적 규칙이고, `check-todo.mjs`도 `{{TODO` 문자열만 탐지하도록 스펙에 정의되어 있습니다(§14.1). §16의 `{{ORG_NAME}}`은 사람이 읽는 설명적 표기로 해석해, 우선순위상 더 구체적이고 자동 검증과 맞물리는 §2/§13.1 쪽을 따랐습니다.
- **대안**: 두 표기를 병기하는 방법도 있었으나 자동 검사 스크립트와의 일관성을 위해 하나만 선택했습니다.

### 3. `/dev/components` — "빌드에서 제외" 대신 "런타임 404 + noindex"로 구현 (Step 1)

- **무엇을**: PROJECT_SPEC §4가 `/dev/components`를 "noindex, 프로덕션 빌드에서 제외"라고 명시했지만, 실제로는 라우트 자체는 빌드 산출물에 포함시키고 `NODE_ENV === 'production'`일 때 컴포넌트 최상단에서 `notFound()`를 호출해 404로 응답하도록 구현했습니다. 별도로 `layout.tsx`에서 `robots: { index: false, follow: false }`를 지정해 noindex도 보장합니다.
- **왜**: Next.js 16(App Router)에는 "특정 라우트 하나만 프로덕션 빌드에서 물리적으로 제외"하는 표준 옵션이 없습니다. `next.config.ts`에서 커스텀 웹팩/번들 설정으로 라우트를 지우는 방법은 PROJECT_SPEC §3이 정한 기술 스택(§3은 커스텀 번들러 개입을 언급하지 않음) 밖의 접근이라 판단해 배제했습니다. `notFound()` + `noindex`는 실사용자·크롤러 입장에서는 완전히 동일한 결과(접근 불가, 색인되지 않음)를 만들면서도 스펙이 정한 도구 범위 안에서 구현 가능한 가장 보수적인 방법입니다.
- **대안**: `middleware.ts`로 `/dev/components` 요청을 프로덕션에서 차단하는 방법도 있었으나, 미들웨어 도입 자체가 §3에 없는 새 구성 요소를 추가하는 것이라 더 큰 변경으로 보고 채택하지 않았습니다.

### 4. Checkbox의 시각적 숨김(sr-only) 패턴에서 `margin: -1px` 대신 `clip-path: inset(50%)` 사용 (Step 1)

- **무엇을**: 네이티브 `<input type="checkbox">`를 시각적으로 숨기고 커스텀 원형 UI로 대체하는 표준 접근성 패턴(sr-only)을 구현하면서, 흔히 쓰이는 `clip: rect(0,0,0,0); margin:-1px;` 대신 `clip-path: inset(50%)`만 사용했습니다 (margin 없음).
- **왜**: `-1px`는 `check-tokens.mjs`가 강제하는 허용 spacing 값 목록에 없고, 이 값은 DS 원문에 근거한 값이 아니라 범용 접근성 관용구라서 `ds-exceptions.json`(§2-7: "DS 원문에 근거가 있는 값만 등록")에 올릴 수도 없습니다. `clip-path: inset(50%)`는 음수 margin 없이 동일한 시각적 숨김 효과를 내는 최신 대안이라 규칙을 우회하지 않고 해결했습니다. 같은 패턴을 `common/VisuallyHidden` 컴포넌트로도 만들어 재사용합니다.
- **대안**: 규칙을 어기지 않는 선에서 다른 대안은 없다고 판단했습니다 (예외 등록은 규정상 불가능).

### 3. Next.js 16.3.5 — 학습 데이터와의 버전 차이 대응 방식 (Step 0)

- **무엇을**: `next dev` 최초 실행 시 자동 생성된 `AGENTS.md`/`CLAUDE.md`가 "이 버전은 학습 데이터와 다를 수 있으니 `node_modules/next/dist/docs/`를 먼저 읽으라"고 안내함. 매 Step마다 전체 문서를 정독하는 대신, 그 Step에서 실제로 사용하는 API(예: `next/font/local`, `generateMetadata`, `sitemap.ts`/`robots.ts` 파일 컨벤션)에 해당하는 문서만 그때그때 확인하는 방식으로 진행하기로 함.
- **왜**: 스펙 진행 속도와 정확성의 균형. Step 0에서 `next/font/local` 문서를 확인해 현재 구현(변수 폰트 + `weight` range + `variable`)이 최신 API와 일치함을 확인했습니다.
- **대안**: 전체 문서를 한 번에 정독하는 방법도 가능하나, 매우 방대해 실제로 쓰지 않는 API까지 검토하는 비효율이 있다고 판단했습니다. Step 2(메타데이터), Step 6(사이트맵/robots/JSON-LD) 진입 시 관련 문서를 다시 확인할 예정입니다.

---
