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
| 확장(신규, DEVIATIONS 기록) | white | #FFFFFF | `--white` | DS에 명명 토큰 없어 신규 추가 |
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
- `--white`, `--overlay-modal` 두 토큰을 새로 추가 (DS §5.4 확장 토큰 표에 없던 항목). 사유는 DEVIATIONS.md 참조.
- Next.js 버전이 16.3.5로, `next dev`가 `AGENTS.md`/`CLAUDE.md`에 "이 버전은 학습 데이터와 다를 수 있다"는 경고를 자동 생성함. `node_modules/next/dist/docs/`에서 관련 가이드(폰트 API 등)를 확인하며 진행 중이며, Step 2(메타데이터 규칙 확인)·Step 6(SEO/사이트맵) 진입 시 해당 문서를 다시 확인할 예정.

**질문**: 없음 (모두 §16 기본값 또는 보수적 결정으로 진행)

---

## Step 1 — UI 컴포넌트 라이브러리 + `/dev/components` 카탈로그 (완료)

**변경한 파일**
- `src/components/icons/ds/*` — DS §7/§8-6/§8-11 SVG를 원문 그대로 컴포넌트화 (Pause, Left, Right, Play, Plus, Search)
- `src/components/common/Picture.tsx` — PC/Mobile 이미지 `<picture>` 전환 (SVG 플레이스홀더라 next/image 대신 순수 img 사용, 이유는 코드 주석 참고)
- `src/components/common/VisuallyHidden.tsx` — 시각적 숨김 공통 컴포넌트
- `src/components/ui/Button.tsx` (+module.css) — Filled/Border × Primary/Secondary/Gray/White × 5 사이즈 × Square/Round
- `src/components/ui/Input.tsx` — Small/Medium/Large × Default/Completed/Disabled/Error(+Focused는 :focus)
- `src/components/ui/Dropdown.tsx` — Medium, Default/Selected/Active, 키보드(↑↓/Enter/Esc), 푸터 고정폭 옵션
- `src/components/ui/Checkbox.tsx` — PC24/Mobile20, 원형
- `src/components/ui/Tab01.tsx` — Pill, role="tablist", ←/→ 키 이동
- `src/components/ui/Badge01.tsx` — Border/Filled-Gray, 크기 S (Phase1 체크리스트 범위만)
- `src/components/ui/Card.tsx` — default/compact 변형 + `Banner` (전체가 링크 하나, 안에 h3)
- `src/components/ui/CarouselControls.tsx` — Carousel_pc(카운터+Pause/Prev/Next), Carousel_mobile pill, 인디케이터 pill, Plus 버튼
- `src/components/ui/IconButton.tsx` — 44/48px 컨트롤러 원형 버튼
- `src/components/ui/Modal.tsx` — 포커스 트랩, Esc, 스크롤 잠금, 트리거로 포커스 복귀
- `src/components/ui/Table.tsx` — PC/Mobile 셀
- `src/app/dev/components/page.tsx` (+layout.tsx, catalog.module.css) — 전체 카탈로그, 프로덕션에서는 404
- `public/placeholder/gray.svg` — 재사용 가능한 단색 회색 SVG 1장(뷰박스 0~1, `preserveAspectRatio="none"`로 어떤 크기에도 늘어남)
- `src/styles/tokens.css` — Carousel/§8-6 관련 무명 DS 색상 3개 토큰화 (`--carousel-control-hover`, `--carousel-icon-hover`, `--indicator-pill-bg`, `--carousel-counter-total`), `--color-bg-white`를 `--white`로 이름 정리
- `scripts/ds-exceptions.json` — Button(2X-small/Small), Input(Small), Tab01(Mobile), Carousel_mobile pill의 DS 지정 padding 등록
- `playwright.config.ts`, `tests/e2e/smoke.spec.ts` — E2E 뼈대 (Desktop/Tablet/Mobile 3프로젝트), Step별로 시나리오 누적 예정

**검증 결과**
```
$ npm run verify
✔ lint (eslint) — 통과
✔ typecheck (tsc --noEmit) — 통과
✔ check:tokens — 통과 (16개 CSS 파일 검사)
✔ build (next build) — 성공, /, /dev/components 모두 정적 생성
✔ test:e2e (playwright, Desktop/Tablet/Mobile) — 3/3 통과
```
(참고: 이 샌드박스에서 Playwright headless 실행에는 `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`와
`PW_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome` 환경변수가 필요했습니다 —
사전 설치된 Chromium 리비전과 npm 패키지가 기대하는 headless-shell 리비전이 달라서입니다.
다른 환경에서는 `npx playwright install chromium` 한 번으로 충분합니다.)

**스크린샷**: `docs/screenshots/step-1/{1920,768,360}.png` — `/dev/components` 카탈로그 전체 페이지. 모든 컴포넌트의 변형(스타일×색상×사이즈×모양 등)과 상태(Default/Hover 대상은 코드로 확인, Disabled/Error/Selected/Active는 화면에 표시)가 한 페이지에 보입니다.

**DS와 다르게 한 점 / 질문**
- DEVIATIONS.md #3 (`/dev/components` 런타임 404), #4 (Checkbox sr-only `clip-path`) 참고.
- Badge01은 PROJECT_SPEC §8 체크리스트가 요구한 "Border / Filled-Gray, 크기 S"만 구현했습니다 (Filled(파랑)·L·M은 이 프로젝트 어디에서도 쓰이지 않아 범위에서 제외).
- Card의 "article > h3 > a" 문구와 "카드 전체가 링크(하나)" 요구가 문자 그대로는 함께 만족시키기 애매해, `<a>`가 이미지·뱃지·제목·설명을 전부 감싸고 그 안에 `<h3>`를 두는 방식으로 구현했습니다 (스크린리더가 "링크, 3단계 제목"으로 읽음, 링크 중첩 없음). 질문이라기보다 구현 판단이라 별도 DEVIATIONS 항목은 만들지 않았습니다.

**질문**: 없음

---

## Step 2 — 레이아웃 (Header/MegaMenu/MobileMenu/Footer/FloatingBar) (완료)

**변경한 파일**
- `src/content/nav.ts` — GNB 5개(후원하기/스토리/기관소개/사업안내/나의후원) × 그룹 3열 × 프로모션 2개, 전부 `/coming-soon/...`로 연결
- `src/content/footer.ts` — 푸터 링크 8개, 관련 사이트 드롭다운 옵션, `FooterEntity`(전부 `{{TODO}}`)
- `src/components/layout/SkipNav.tsx` — 메뉴/본문/푸터 3개, 포커스 시에만 노출
- `src/components/layout/Header.tsx` — sticky, 로고↔GNB 96px(예외 등록), hover(100ms 지연)+focus로 메가메뉴, Esc 닫기, bold 전환 시 폭 안 흔들리는 `::after` 트릭
- `src/components/layout/MegaMenu.tsx` — 12컬럼 중 좌 span8(그룹 3열)/우 span4(프로모션 2장)
- `src/components/layout/MobileMenu.tsx` — 전체화면 패널, 아코디언(한 번에 하나), 포커스 트랩, Esc, body 스크롤 잠금
- `src/components/layout/Footer.tsx` — 상단 링크+SNS+관련사이트 드롭다운, 하단 법인정보+고객센터
- `src/components/layout/FloatingBar.tsx` — Top 버튼(스크롤 1화면 초과 시) + Mobile/Tablet 하단 CTA 바(일시후원/정기후원)
- `src/app/coming-soon/[[...slug]]/page.tsx` — noindex stub, catch-all
- `src/app/layout.tsx` — SkipNav, 시각적으로 숨긴 `h1`(tagline), Header/Footer/FloatingBar 조립
- `src/components/icons/VideoPlatformIcon.tsx`, `PhotoPlatformIcon.tsx` — DEVIATIONS #7 참고
- `tests/e2e/header.spec.ts` — 메가메뉴 키보드 열기/Esc(Desktop), 모바일 메뉴 열기/포커스 트랩/아코디언/Esc(Mobile·Tablet)
- `scripts/ds-exceptions.json`에 Header 로고↔GNB `gap:96px` 등록

**검증 결과**
```
$ npm run verify
✔ lint / typecheck / check:tokens(23개 파일) / build(/, /coming-soon/[[...slug]], /dev/components) 통과
✔ test:e2e — 9 tests, 6 passed, 3 skipped(뷰포트 조건부 스킵) — 0 failed
```
§9 키보드 체크리스트 중 이 Step 범위(메가메뉴, 모바일 메뉴)는 자동화 테스트로 확인. 탭(←/→)·캐러셀·드롭다운·모달 키보드 동작은 Step 3~5에서 실제 사용처가 생기는 대로 테스트를 추가한다.

**스크린샷**: `docs/screenshots/step-2/{1920,768,360}.png`

**DS와 다르게 한 점**
- DEVIATIONS.md #5(Footer 순서 통일), #6(플로팅 CTA 바 <1024로 확장), #7(SNS 아이콘 대체) 참고.
- §5.5 지시대로 Footer 개인정보 안내 문구를 `--text-04`(#999, 대비 미달) 대신 `--text-03`(#666)로 올림 — 이건 스펙이 직접 요구한 조정이라 DEVIATIONS.md가 아닌 여기에만 기록.

**질문**: 없음

---

## Step 3 — S2~S4 (Hero / 스토리 / 프로모션 배너) (완료)

**변경한 파일**
- `src/content/home.ts` — heroSlides(3), storyTabs(3×5), promoBanner 샘플 콘텐츠
- `src/components/common/SectionHeader.tsx` — 공통 섹션 헤더(중앙 정렬 + Plus 더보기)
- `src/components/sections/home/HeroSlider.tsx` — embla 없이 opacity 크로스페이드로 직접 구현 (DEVIATIONS #8), 자동재생 5초/600ms 전환, hover·focus·Esc 없이도 pause 버튼으로 정지, `prefers-reduced-motion`은 `useSyncExternalStore`로 반응형 감지, 첫 슬라이드만 priority
- `src/components/sections/home/StoryBento.tsx` — 탭 3개(전부 서버 렌더링) + 벤토 그리드(큰 카드 span6/row2 + 작은 카드 2×2, 브레이크포인트별 컬럼 스팬)
- `src/components/sections/home/PromoBanner.tsx` — Banner + HTML 텍스트 오버레이
- `src/app/page.tsx`, `page.module.css` — 섹션 조립 + §7.0 padding 표 적용
- `src/styles/globals.css` — **버그 수정**: `[hidden]`이 `.grid`의 `display:grid`에 밀리던 문제 (DEVIATIONS #9)
- `src/components/ui/Card.module.css` — Banner 오버레이에 `--overlay-hero` 스크림 추가(플레이스홀더 이미지 위 흰 글자 대비 확보)
- `tests/e2e/home-sections.spec.ts` — 탭 전환/키보드, Hero 컨트롤 회귀 테스트

**검증 결과**
```
$ npm run verify
✔ lint / typecheck / check:tokens(28개 파일) / build 통과
✔ test:e2e — 18 tests, 14 passed, 4 skipped(뷰포트 조건부) — 0 failed
```

**스크린샷**: `docs/screenshots/step-3/{1920,768,360}.png`
- 참고: 360.png(전체 페이지 캡처)에서 하단 고정 CTA 바가 스토리 섹션 중간에 겹쳐 보이는 것은 Playwright의 `fullPage` 스크린샷이 `position:fixed` 요소를 이어붙이는 과정에서 생기는 촬영 도구의 알려진 한계이며, 실제 브라우저 스크롤에서는 정상적으로 화면 하단에 고정됩니다(별도로 뷰포트 단위 스크린샷으로 확인함).

**DS와 다르게 한 점**
- DEVIATIONS.md #8(embla 미사용), #9(`[hidden]` 버그 수정) 참고.
- Card의 Banner 오버레이에 DS/스펙이 명시하지 않은 스크림(`--overlay-hero`)을 추가했습니다 — 실제 사진이 아닌 회색 placeholder 위에서도 흰 텍스트 대비를 보장하기 위함이며, 기존 확장 토큰을 재사용해 새 토큰을 만들지는 않았습니다.

**질문**: 없음

---

## Step 4 — S5~S7 (소개 / 신뢰지표 / 캠페인 캐러셀 / 소식) (완료)

**변경한 파일**
- `src/content/home.ts` — introSection, trustSection(`enabled: false`), campaigns(6), newsItems(5, 이미지 2+텍스트 3)
- `src/components/common/SectionHeader.tsx` — `actionSlot` prop 추가(Plus 버튼 대신 인디케이터 pill 등 커스텀 요소를 우측에 배치할 수 있도록 일반화)
- `src/components/common/VisuallyHidden.tsx` — `id` 등 임의 속성을 전달할 수 있도록 `rest` prop 스프레드 추가
- `src/components/sections/home/TrustSection.tsx` — S5-A(소개, 항상 노출) + S5-B(신뢰 지표 밴드, `trust.enabled=false`면 DOM에서 완전히 빠짐) 한 파일에서 처리 (§4 디렉터리 구조가 이 섹션을 컴포넌트 하나로만 명명)
- `src/components/sections/home/CampaignCarousel.tsx` — `embla-carousel-react`(`slidesToScroll:'auto'`), PC 헤더 인디케이터 pill / Mobile 스와이프+하단 pill
- `src/components/sections/home/NewsBoard.tsx` — 이미지 카드 2개(16:10) + 텍스트 목록 3개
- `src/app/page.tsx`, `page.module.css` — 섹션 조립 + §7.0 padding 표 적용
- `tests/e2e/campaign-news.spec.ts` — 신뢰 밴드 기본 숨김, 캐러셀 페이지 이동 검증

**검증 결과**
```
$ npm run verify
✔ lint / typecheck / check:tokens(31개 파일) / build 통과
✔ test:e2e — 24 tests, 19 passed, 5 skipped(뷰포트 조건부) — 0 failed
```

**스크린샷**: `docs/screenshots/step-4/{1920,768,360}.png` — 신뢰 지표 밴드가 기본 설정대로 화면에 보이지 않는 것을 확인.

**DS와 다르게 한 점**
- 특별히 없음(§16 결정대로 신뢰 밴드 기본 숨김 적용). Card 재사용 시 eyebrow/뱃지 슬롯을 그대로 활용해 캠페인 카드를 만들었습니다.

**질문**: 없음

---
