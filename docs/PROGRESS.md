# PROGRESS

세션이 끊겨도 이 파일을 읽고 이어갈 수 있도록, Step별 완료 내용과 검증 결과를 누적 기록합니다.

---

## Step 0 — 기반 (완료)

**변경한 파일**
- `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs` — Next.js 16(App Router) + TypeScript strict 스캐폴드
- `.prettierrc.json`, `.prettierignore`
- `src/styles/tokens.css` — DS §1/§4/§5/§6/§9 1:1 이식 + PROJECT_SPEC §5.4 확장 토큰
- `src/styles/typography.css` — 16개 타이포 스타일, mobile-first (기본 Mobile, `min-width:768px`에서 PC로 교체)
- `src/styles/grid.css` — Mobile/Tablet/Desktop-S/Desktop 4단 그리드, `.container`/`.grid`
- `src/styles/globals.css` — reset, 폰트 적용, focus ring, reduced-motion, 모바일 하단 CTA 여백
- `src/app/layout.tsx` — Pretendard Variable 셀프호스팅(`next/font/local`), 기본 메타데이터 (SkipNav/Header/Footer/GTM은 Step 2/6에서 채움)
- `src/app/page.tsx` — 임시 플레이스홀더 (Step 3~5에서 실제 섹션으로 교체)
- `src/content/types.ts`, `src/content/site.config.ts` — 콘텐츠 타입 + 단체 정보 골격(전부 `{{TODO}}` 또는 샘플 문구)
- `scripts/check-tokens.mjs`, `scripts/check-todo.mjs`, `scripts/ds-exceptions.json`
- `public/fonts/PretendardVariable.woff2` (npm `pretendard` 패키지에서 추출한 변수 폰트 원본, self-host)
- `docs/PROJECT_SPEC.md`, `docs/edm-design-system.md`, `docs/reference/main-capture.webp` 배치
- 기존 GlobalHope(Vite+Express) 소스 전체 삭제 (`src/`, `server/`, `index.html`, `vite.config.js`, 관련 `package.json` 등)

**tokens.css ↔ DS 값 비교표**

| 분류 | DS 표기 | 값 | tokens.css 변수 | 값 일치 |
|---|---|---|---|---|
| Color | green/500 | #1EC95B | `--green-500` | ✅ |
| Color | green/600 | #18A149 | `--green-600` | ✅ |
| Color | green/700 | #127937 | `--green-700` | ✅ |
| Color | red/500 | #FC1D01 | `--red-500` | ✅ |
| Color | blue/600 | #006BC8 | `--blue-600` | ✅ |
| Color | neutral/50 | #F5F5F7 | `--neutral-50` | ✅ |
| Color | neutral/100 | #E2E2E5 | `--neutral-100` | ✅ |
| Color | color/border/light | #E4E8F1 | `--color-border-light` | ✅ |
| Color | text/01~04 | #000/#333/#666/#999 | `--text-01`~`--text-04` | ✅ |
| Spacing | space/1~30 | 4~120px | `--space-1`~`--space-30` | ✅ (13개 전부) |
| Radius | radius/4,8,12,24,full | 4/8/12/24/9999px | `--radius-4/-8/-12/-24/-full` | ✅ |
| Shadow | shadow-neutral-01~03 | rgba(0,0,0,.04/.06/.08) | `--shadow-neutral-01~03` | ✅ |
| Shadow | shadow-blue-01~03 | #EBEFF4 | `--shadow-blue-01~03` | ✅ |
| Z-index | z-header 등 6종 | 0/100/200/300/400/500 | `--z-content`~`--z-modal` | ✅ |
| 확장 | overlay-hero | PROJECT_SPEC §5.4 | `--overlay-hero` | ✅ |
| 확장 | btn-primary-text | #FFFFFF (DS 원안) | `--btn-primary-text` | ✅ |
| 확장 | text-accent | var(--green-500) (DS 원안) | `--text-accent` | ✅ |
| 확장 | hover-on-dark | rgba(255,255,255,.15) | `--hover-on-dark` | ✅ |
| 확장 | section-gap-sm/md/lg | PC 60/80/140, Mobile 40/60/100 | `--section-gap-*` (media query로 교체) | ✅ |
| 확장(신규, DEVIATIONS 기록) | color-bg-white | #FFFFFF | `--color-bg-white` | DS에 명명 토큰 없어 신규 추가 |
| 확장(신규, DEVIATIONS 기록) | overlay-modal | rgba(0,0,0,.5) | `--overlay-modal` | DS §8-8 값을 토큰화 |

**검증 결과**
```
$ node scripts/check-tokens.mjs
check-tokens: 통과 (3개 CSS 파일 검사, tokens.css 제외)

$ node scripts/check-todo.mjs
check-todo: '{{TODO' 발견 7건 (site.config.ts 6, types.ts 1 — 타입 리터럴 포함이라 정상)

$ npx tsc --noEmit         → 통과 (출력 없음)
$ npx eslint .             → 통과 (출력 없음)
$ npx next build           → 성공, `/` 정적 생성됨
```
`npm run verify`는 Step 1에서 Playwright 설정을 넣은 뒤부터 전체 실행이 의미가 있어 Step 0에서는 개별 명령으로 검증했습니다 (`test:e2e` 대상이 아직 없음).

**스크린샷**: `docs/screenshots/step-0/{1920,768,360}.png` (현재는 플레이스홀더 H1만 있는 화면 — 폰트/타이포 토큰이 정상 적용되는지 확인 목적)

**DS와 다르게 한 점 / 결정 사항**
- `--color-bg-white`, `--overlay-modal` 두 토큰을 새로 추가 (DS §5.4 확장 토큰 표에 없던 항목). 사유는 DEVIATIONS.md 참조.
- Next.js 버전이 16.3.5로, `next dev`가 `AGENTS.md`/`CLAUDE.md`에 "이 버전은 학습 데이터와 다를 수 있다"는 경고를 자동 생성함. `node_modules/next/dist/docs/`에서 관련 가이드(폰트 API 등)를 확인하며 진행 중이며, Step 2(메타데이터 규칙 확인)·Step 6(SEO/사이트맵) 진입 시 해당 문서를 다시 확인할 예정.

**질문**: 없음 (모두 §16 기본값 또는 보수적 결정으로 진행)

---
