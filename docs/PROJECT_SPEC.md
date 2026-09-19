# 프로젝트 스펙 — 후원 단체 홈페이지 (Phase 1: 메인 페이지)

> Claude Code가 읽고 구현하기 위한 개발·디자인 통합 문서입니다.
> 함께 넣어야 하는 파일: `docs/edm-design-system.md` (edm 유학센터 Design System 원문. 수정 금지)
> 충돌 시 우선순위: **§2 절대 규칙 > `edm-design-system.md` > 이 문서의 나머지 > 원본 사이트의 화면**

---

## 킥오프 프롬프트 (사용자가 Claude Code에 그대로 붙여넣기)

```
docs/PROJECT_SPEC.md 와 docs/edm-design-system.md 를 끝까지 읽어줘.
1) 이해한 범위를 5줄 이내로 요약하고,
2) §16에서 "질문 필요"로 표시된 항목만 나에게 물어봐. 나머지는 기본값으로 진행해.
내 답을 받으면 §15 순서대로 Step 0부터 진행해줘.
각 Step이 끝날 때마다 검증 결과(빌드/린트/토큰 체크/스크린샷 3장)를 보고하고,
내가 확인하기 전에는 다음 Step으로 넘어가지 마.
```

---

## 1. 프로젝트 개요

### 1.1 목적
후원 단체(비영리, 아동·지역사회 지원 성격)의 공식 홈페이지 메인 페이지를 만든다.
**정보 구조·섹션 순서·기능 패턴은 굿네이버스 메인 페이지를 참고**하고, **시각 디자인은 edm 유학센터 Design System을 그대로 따른다.**

### 1.2 참고 관계 (중요)
| 원본에서 가져오는 것 | 가져오지 않는 것 |
|---|---|
| 섹션 순서, 정보 구조(IA), GNB 구성 방식, 기능 패턴(탭, 캐러셀, 메가메뉴, 뉴스레터 폼, 플로팅 CTA) | 문구, 이미지, 로고, 캠페인명, 수치, 수상·인증·제휴 주장, 법인 정보, HTML/CSS/JS 코드, 서드파티 스크립트 |

### 1.3 단체 정보는 아직 미정
단체명·로고·슬로건·연락처·법인 정보는 전부 `src/content/site.config.ts` 한 곳에서만 관리한다. 컴포넌트 안에 하드코딩 금지.

### 1.4 범위
| Phase | 내용 | 이번 작업 |
|---|---|---|
| **1** | 메인 페이지 1장 (Desktop 1920 / Tablet 768 / Mobile 360), 공통 레이아웃(헤더·푸터·플로팅), UI 컴포넌트 라이브러리, SEO·분석 기반 | **여기까지** |
| 2 | 서브 페이지 템플릿 3종(목록형 / 상세형 / 후원 폼 UI), 준비중 페이지 | 하지 않음 |
| 3 | 결제(PG), 회원·로그인, CMS, 뉴스레터 실제 발송 | 하지 않음 |

Phase 1에서 GNB·푸터의 하위 링크는 전부 `/coming-soon` 계열 stub 페이지로 연결한다 (noindex).

---

## 2. 절대 규칙

1. **원본 콘텐츠 복제 금지.** 원본(굿네이버스)의 문구·이미지·로고·캠페인명·수치·수상/인증/제휴 주장·법인 정보·코드를 쓰지 않는다. 샘플 콘텐츠는 일반적인 문구로 새로 작성한다.
2. **사실 주장은 `'{{TODO}}'`로 둔다.** 수치, 수상, 인증, 제휴, 법인명, 사업자번호, 대표자, 주소, 전화번호는 임의로 채우지 않는다. 프로덕션 빌드에서 `{{TODO`가 남아 있으면 경고한다 (§14).
3. **디자인 시스템 토큰 외의 값 금지.** spacing / radius / shadow / z-index / color 모두 해당. 임의 값(15px, 22px, z-index 999 등)이 필요하면 §5.4 확장 토큰에 이유와 함께 추가한다.
4. **이모지·일러스트 금지.** 아이콘은 24×24 viewBox, stroke 2px, round cap/join의 아웃라인만 사용한다. 원본 스토리 제목의 이모지는 제거한다.
5. **edm 브랜드 자산 사용 금지.** `apps.edmedu.com/_resource/*` 로고를 이 사이트에 쓰지 않는다. (이 사이트는 별도 단체 브랜드다. edm 계열 사이트로 확정되면 별도 지시한다.)
6. **서드파티 트래커 이식 금지.** 원본에 있는 TikTok, Twitter, Taboola, Criteo, Teads, Widerplanet, Bing UET, Dable, Facebook Pixel, Kakao Pixel, Hotjar, Beusable, Naver WCS, Google Ads 태그는 넣지 않는다. 허용은 **GTM 컨테이너 1개**(`NEXT_PUBLIC_GTM_ID`)뿐이다.
7. **레거시 금지.** jQuery, slick, AOS, `<meta viewport width=1100>` 같은 PC 고정폭 처리, `m.` 별도 모바일 도메인 방식은 쓰지 않는다. 단일 반응형 사이트로 만든다.
8. **개인정보 저장 금지.** Phase 1의 뉴스레터는 UI·검증·mock 응답까지만 만든다. 이름·이메일을 저장하거나 외부로 전송하지 않는다.
9. **범위 밖 기능 구현 금지.** 결제, 로그인, CMS는 만들지 않는다. 필요해 보이면 구현하지 말고 질문한다.
10. **모호하면 멈추고 묻는다.** DS에 없거나 이 문서와 DS가 충돌하면 임의로 정하지 말고 §16에 항목을 추가해 질문한다.

---

## 3. 기술 스택 (기본값)

| 영역 | 선택 | 비고 |
|---|---|---|
| 프레임워크 | Next.js (App Router, 최신 안정 버전) + TypeScript `strict` | 정적 생성(SSG) 우선. 모든 콘텐츠(탭 패널 포함)는 서버 렌더링 — SEO·GEO 때문 |
| 스타일 | CSS Modules + CSS custom properties (`tokens.css`) | Tailwind 미사용. 토큰 외 값 강제가 어렵기 때문 |
| 폰트 | Pretendard Variable, `next/font/local`로 셀프 호스팅 | 400/500/600/700 사용. CDN 링크 금지 |
| 아이콘 | DS에 정의된 SVG는 그대로, 신규는 `lucide-react` | lucide 기본값(stroke 2, round)이 DS 규칙과 같다. `strokeWidth` 변경 금지 |
| 캐러셀 | `embla-carousel-react` | 헤드리스. 컨트롤 UI는 DS §8-6 스펙대로 직접 그린다 |
| 폼 | 직접 구현 (라이브러리 없음) | 검증 규칙은 §7 S10 |
| 테스트 | Playwright + `@axe-core/playwright` | §14 |
| 품질 | ESLint, Prettier, `tsc --noEmit`, 커스텀 스크립트 2종 | §14 |
| Node | LTS | |

배포 대상은 미정. `next build`가 통과하고 정적 산출이 가능하면 된다.

---

## 4. 디렉터리 구조

```
docs/
  PROJECT_SPEC.md
  edm-design-system.md            # 원문 그대로
src/
  app/
    layout.tsx                    # 폰트, GTM, 메타, SkipNav, Header/Footer/FloatingCta
    page.tsx                      # 메인 (섹션 조립만)
    coming-soon/[[...slug]]/page.tsx   # noindex stub
    dev/components/page.tsx       # 컴포넌트 카탈로그 (noindex, 프로덕션 빌드에서 제외)
    api/newsletter/route.ts       # mock: 검증만 하고 200 반환, 저장 없음
    sitemap.ts  robots.ts
  styles/
    tokens.css                    # DS 토큰 1:1 (§5.1) + 확장 토큰 (§5.4)
    typography.css               # .t-display ... .t-detail
    grid.css                      # .grid 유틸 (§5.3)
    globals.css
  components/
    ui/        Button Input Textarea Checkbox Radio Chip Tab Badge Card
               CarouselControls Modal Table Pagination Dropdown IconButton
    layout/    SkipNav Header MegaMenu MobileMenu Footer FloatingCta
    sections/home/
               HeroSlider StoryBento PromoBanner TrustSection
               CampaignCarousel NewsBoard FeaturedVideo QuickLinks Newsletter
    common/    SectionHeader Picture TrackedLink VisuallyHidden
  content/
    site.config.ts  nav.ts  home.ts  footer.ts       # 전부 샘플/플레이스홀더
  lib/
    analytics.ts  jsonld.ts  seo.ts
public/
  fonts/  placeholder/           # 회색 단색 SVG만 (일러스트 금지)
scripts/
  check-tokens.mjs  check-todo.mjs
tests/e2e/
```

---

## 5. 디자인 시스템 적용 규칙

### 5.1 토큰 구현
`src/styles/tokens.css`의 `:root`에 DS의 §1(컬러), §4(Spacing), §5(Radius), §6(Shadow), §9(Z-index)를 **이름 그대로, 값 1:1**로 옮긴다.

| DS 표기 | CSS 변수 |
|---|---|
| green/500, neutral/50 | `--green-500`, `--neutral-50` |
| color/brand/primary, color/bg/default | `--color-brand-primary`, `--color-bg-default` |
| color/border/light | `--color-border-light` |
| text/01 ~ 04 | `--text-01` ~ `--text-04` |
| space/6, radius/12 | `--space-6`, `--radius-12` |
| shadow (DS 코드블록 이름) | `--shadow-neutral-01`, `--shadow-blue-01` … |
| z-header 등 | `--z-header`, `--z-dropdown`, `--z-floating`, `--z-overlay`, `--z-modal` |

그라디언트(`--gradient-red/green`)는 정의만 하고 이 페이지에서는 쓰지 않는다.

### 5.2 타이포그래피
- `typography.css`에 DS §2의 16개 스타일을 클래스로 만든다: `.t-display`, `.t-h1-bold`, `.t-h2-bold`, `.t-h2-semibold`, `.t-h2-regular`, `.t-h3-bold`, `.t-h3-semibold`, `.t-h4-bold`, `.t-h4-regular`, `.t-h5-bold`, `.t-h5-regular`, `.t-body1-bold`, `.t-body1-regular`, `.t-body2-semibold`, `.t-body2-regular`, `.t-detail`.
- **767px 이하는 Mobile 값, 768px 이상은 PC 값**을 쓴다 (DS가 Tablet 별도 값을 정의하지 않음).
- letter-spacing은 DS 표의 스타일별 값을 PC/Mobile 공통 적용한다 (본문 주석과 표가 다르면 표를 따른다).
- 기본 설정: `font-family: Pretendard, -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;` / `word-break: keep-all; overflow-wrap: break-word;` (한글 단어 중간 줄바꿈 방지 — 반드시 적용).
- 본문 line-length: 한글 기준 한 줄 40자 안팎을 넘기지 않도록 텍스트 블록에 `max-width` 지정.

### 5.3 브레이크포인트 · 그리드
DS §3의 `repeat(N, 1fr)` Grid 방식을 그대로 쓴다 (Flexbox로 컬럼 구성 금지).

| 구간 | 폭 | Columns | Gutter | 좌우 Margin | 비고 |
|---|---|---|---|---|---|
| Mobile | ≤ 767 | 6 | `--space-2` | `--space-4` | |
| Tablet | 768–1023 | 8 | `--space-4` | `--space-10` | |
| Desktop-S | 1024–1439 | 12 | `--space-6` | `--space-10` | **보완 규칙** (DS에 없는 중간 구간) |
| Desktop | ≥ 1440 | 12 | `--space-6` | `--space-30` | 컨텐츠 최대 1680 (메인) |

- `.container { max-width: 1680px; margin-inline: auto; padding-inline: var(--page-margin); }` — `--page-margin`을 구간별로 교체.
- 배경색은 섹션 래퍼(전체 폭)에, 내용은 `.container > .grid` 안에 둔다.
- 서브 페이지용 Desktop Sub(컨텐츠 1248px)는 Phase 2에서 추가한다.

### 5.4 확장 토큰 (DS에 없는 것 — 최소한만)
| 토큰 | 값 | 이유 |
|---|---|---|
| `--overlay-hero` | `linear-gradient(90deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 70%)` | Hero 사진 위 흰 텍스트 가독성. DS Modal overlay와 같은 색 계열 |
| `--btn-primary-text` | `#FFFFFF` | 대비 이슈 대응용 분리 변수 (§5.5) |
| `--text-accent` | `var(--green-500)` | 연두색 텍스트·링크 분리 변수 (§5.5) |
| `--hover-on-dark` | `rgba(255,255,255,.15)` | Border/White 버튼 hover 배경 (어두운 사진 위) |
| `--section-gap-sm / -md / -lg` | PC 60 / 80 / 140, Mobile 40 / 60 / 100 | DS §4 "섹션 간 간격" 표를 토큰화 (모두 기존 토큰 값) |

새 토큰을 더 만들어야 하면 이 표에 행을 추가하고 이유를 적는다.

### 5.5 명도 대비 이슈 — 사용자 결정 필요
- 흰 글자 on `#1EC95B` = 약 **2.2 : 1**. WCAG AA 기준(텍스트 4.5:1, UI 3:1)에 미달한다. 후원 버튼이 핵심 CTA라서 영향이 크다.
- `#1EC95B` 텍스트 on 흰 배경도 같은 수치다. green-600(`#18A149`)은 약 3.4:1(큰 글씨만 통과), green-700(`#127937`)은 약 5.5:1(통과).
- **기본값은 DS 원안 유지** (`--btn-primary-text: #FFFFFF`, `--text-accent: var(--green-500)`).
- 결정이 나면 변수 두 개만 바꾼다. 예: `--btn-primary-text: #000`(약 9.6:1), `--text-accent: var(--green-700)`.
- **Primary 버튼 글자색과 연두색 텍스트를 컴포넌트 CSS에 하드코딩하지 말고 위 변수를 쓴다.**
- **`--text-04`(`#999`)는 흰 배경에서 약 2.9:1**이다. placeholder · disabled 전용으로만 쓰고, 날짜·안내 문구 같은 정보 텍스트는 `--text-03`(`#666`, 약 5.7:1) 이상을 쓴다. 이 때문에 DS §8-12 푸터의 개인정보 안내 문구(`#999`)도 `--text-03`으로 올리고 "DS와 다르게 한 점"으로 보고한다.
- axe `color-contrast` 위반은 결정 전까지 "known issue"로 개수를 보고하고, 규칙을 끄지 않는다.

### 5.6 아이콘
- DS에 정의된 SVG(search, user-profile4, external-link, carousel 5종, pagination 4종)는 원문 그대로 컴포넌트화한다.
- 신규 아이콘은 `lucide-react`: `Menu` `X` `ChevronDown` `ArrowUp` `Youtube` `Instagram` `PenLine`(블로그) `BookOpen` `Mail` `Users` `Store` `Building2` `Award` `Globe` `Handshake`.
- DS §7 공통 규칙 적용: `display:block; flex-shrink:0; pointer-events:none`, 크기는 `width`/`height` 속성으로 명시, 색은 `currentColor`.

---

## 6. 정보 구조 (IA) — `src/content/nav.ts`

GNB 5개. 이름은 구조용 샘플이며 단체 성격에 맞게 `nav.ts`에서만 바꿀 수 있어야 한다.

| 상위 | 그룹 1 | 그룹 2 | 그룹 3 |
|---|---|---|---|
| 후원하기 | 캠페인 후원 · 결연 후원 · 기념일 후원 | 사업 후원 · 일시 후원 · 기업 후원 | 정기후원 클럽 · 고액후원 클럽 · 유산기부 |
| 스토리 | 스토리 · 결과보고 · 영상 | 공지·뉴스 · 소식지 · 뉴스레터 · 자료실 | 참여 프로그램 |
| 기관소개 | 소개 · 설립 정신 · CI · 연혁 | 투명경영(재정보고 · 운영 기준 · 조직 운영) | 조직 현황(국내 · 해외) |
| 사업안내 | 국제협력사업 | 국내복지사업 | 교육사업 · 연구소 |
| 나의후원 | 후원 정보 | 결연 아동 | 기부금 영수증 · 문의 |

- 각 상위 메뉴는 메가메뉴에 **프로모션 카드 2개**(이미지·제목·링크)를 가진다. (`promo: [{image, title, href}, …]`)
- "나의후원"은 로그인이 필요한 영역이므로 Phase 1에서는 링크만 두고 `/coming-soon`으로 보낸다.
- 헤더 우측 유틸리티: 검색 아이콘 / 로그인 / **후원하기** 버튼. (기부금 영수증·회원가입은 푸터와 모바일 메뉴에 둔다.)

---

## 7. 메인 페이지 섹션 명세

### 7.0 전체 구성 (위→아래 순서 고정)

| # | 섹션 | 배경 | padding-top | padding-bottom |
|---|---|---|---|---|
| S1 | Header (sticky) | white | — | — |
| S2 | Hero 슬라이더 | 이미지 | 0 (헤더 바로 아래) | 0 |
| S3 | 스토리 | white | `--section-gap-lg` | 0 |
| S4 | 프로모션 배너 | white | `--section-gap-md` | 0 |
| S5-A | 소개 (투명경영) | white | `--section-gap-lg` | `--section-gap-md` |
| S5-B | 신뢰 지표 밴드 | `--color-bg-green` | `--section-gap-md` | `--section-gap-md` |
| S6 | 캠페인 캐러셀 | white | `--section-gap-md` | `--section-gap-md` |
| S7 | 소식 | `--color-bg-default` | `--section-gap-md` | `--section-gap-md` |
| S8 | 대표 캠페인(영상) | white | `--section-gap-md` | `--section-gap-md` |
| S9 | 퀵링크 | `--color-bg-default` | `--section-gap-sm` | `--section-gap-sm` |
| S10 | 뉴스레터 | white | `--section-gap-md` | `--section-gap-md` |
| S11 | Footer | `--color-bg-default` | DS §8-12 | DS §8-12 |
| S12 | 플로팅 (Top / 모바일 CTA 바) | — | — | — |

- 섹션 간 간격은 위 표의 padding으로만 만든다 (margin 겹침 방지). 표에 없는 임의 간격 금지.
- **섹션 헤더 공통 (`SectionHeader`)**: 중앙 정렬, H2 Bold + 아래 Body2 Regular `--text-03`, 둘 사이 `--space-3`, 헤더↔콘텐츠 `--space-10`. 우측 끝에 "더보기"가 있는 섹션은 Plus 버튼(DS §8-6, 40×40 검정 원형)을 절대 배치, `aria-label="{섹션명} 더보기"`.
- 섹션 진입 fade-up 같은 스크롤 애니메이션은 넣지 않는다 (§10).

---

### S1. Header
**구성 (PC, 높이 107)**: `[로고] —96— [GNB 5개]` … `[검색 아이콘 32] [로그인] [후원하기 버튼]` (우측 gap `--space-5`)
- 기본은 DS §8-11(edm유학센터 헤더) 구조. 다른 점: 검색바(Tab02 pill), 유저 아이콘, 메뉴 아이콘은 없고 위 우측 구성으로 대체.
- 로고↔GNB 간격 96px은 토큰이 아니지만 **DS §8-11이 명시한 값이므로 예외로 허용**한다. GNB 항목 간 간격은 `--space-10`.
- GNB 글자: Pretendard Medium 20px, `--text-01`. Hover/Focus: `--text-accent` + Bold. **Bold 전환으로 폭이 흔들리지 않게** 숨은 `::after`(같은 텍스트, `font-weight:700`, `height:0`, `visibility:hidden`)로 폭을 미리 확보한다.
- 후원하기 버튼: Filled / Primary / Round / Small.
- `position: sticky; top: 0; z-index: var(--z-header); background: #fff;` 스크롤이 0을 넘으면 하단에 `1px solid var(--color-border-light)`.

**메가메뉴 (PC ≥ 1024)**
- 상위 메뉴에 hover(진입 지연 100ms) 또는 `:focus-within` 시 헤더 아래로 전체 폭 패널이 열린다. `z-index: var(--z-dropdown)`, 배경 white, 상단 `1px solid var(--color-border-light)`, `--shadow-neutral-02`.
- 패널 내부 12컬럼: 왼쪽 span 8 = 그룹 3열(그룹 제목 Body1 Bold + 링크 목록 Body2 Regular `--text-03`, hover `--text-01`), 오른쪽 span 4 = 프로모션 카드 2개(이미지 16:10, radius 12, 제목 Body2 SemiBold).
- Esc로 닫힘. 패널 안 링크는 Tab으로 순회. 상위 메뉴는 `<a>`이고 별도 토글 버튼을 만들지 않는다.

**Mobile / Tablet (≤ 1023, 높이 76)**: `[로고 높이 22]` … `[검색 24] [메뉴 24]`
- 메뉴 버튼 → `MobileMenu`: 우측에서 열리는 전체 화면 패널. 오버레이 `--z-overlay`, 패널 `--z-modal`. 상위 메뉴는 아코디언(한 번에 하나), 하단에 로그인 · 회원가입 · 기부금 영수증 링크, 최하단에 후원하기 버튼(Filled / Primary / Square / Large, 전체 폭).
- 포커스 트랩, Esc 닫기, 열린 동안 body 스크롤 잠금.
- 검색 버튼은 Phase 1에서 `/search`(준비중 stub)로 이동한다.

---

### S2. Hero 슬라이더
**콘텐츠 모델**: `slides: HeroSlide[]` (3–8개). 각 슬라이드 = 이미지(PC/Mobile 별도) + 분류 라벨 + 제목 + 설명 + CTA 1개.
- 높이: PC 720 / Tablet 560 / Mobile 480 (`min-height`, 이미지는 `object-fit: cover`). 이미지 위에 `--overlay-hero`.
- 텍스트 블록: PC는 12컬럼 중 col 1–5, 세로 중앙, 좌측 정렬. Tablet은 col 1–6. Mobile은 하단 정렬(컨트롤 위), 전체 폭.
  - 분류 라벨: `.t-body2-semibold`, 흰색
  - 제목: `.t-display`, 흰색, 최대 2줄 (PC 줄당 약 14자 / Mobile 약 12자 기준으로 샘플 작성)
  - 설명: `.t-body1-regular`, 흰색, 최대 3줄
  - CTA: Border / White / Square / Medium
  - 라벨↔제목 `--space-3`, 제목↔설명 `--space-4`, 설명↔CTA `--space-8`
- **컨트롤**: PC는 `Carousel_pc`(숫자 카운터 + Pause/Prev/Next, DS §8-6)를 하단 좌측 컨테이너 시작선에 `bottom: var(--space-10)`. Mobile은 `Carousel_mobile` pill을 우측 하단 `--space-4`.
- 동작: 자동 재생 5초, 전환 600ms 페이드. Pause 버튼·hover·focus-within 시 정지. `prefers-reduced-motion: reduce`이면 자동 재생 비활성.
- 성능: **첫 슬라이드 이미지만** `priority`(`fetchpriority="high"`), 나머지는 lazy. 이미지 `width`/`height` 명시로 CLS 방지.
- a11y: `aria-roledescription="carousel"`, 각 슬라이드 `role="group" aria-roledescription="slide" aria-label="n / 전체"`, 자동 재생 중에는 `aria-live="off"`, 정지 시 `polite`. 제목은 `h2`.
- 추적: `main_hero`

---

### S3. 스토리 (탭 + 벤토 그리드)
**콘텐츠 모델**: `storyTabs: {id, label, items: StoryItem[5]}[3]` — 탭 이름은 샘플로 "새 소식 / 활동 이야기 / 후원자 이야기".
- 헤더: `SectionHeader`(중앙) → 아래 **Tab01(Pill)** 3개 중앙 정렬(PC는 Small, Mobile은 Mobile 스펙) → 헤더 우측 Plus 버튼.
- 각 탭 패널에 5개 항목: **큰 카드 1 + 작은 카드 4**. 모든 탭 패널은 서버 렌더링, 비활성 패널은 `hidden` 속성만 (크롤러가 전체 콘텐츠를 읽게 한다).
- 레이아웃:
  - Desktop: 12컬럼. 큰 카드 `grid-column: span 6; grid-row: span 2`, 작은 카드 4개 각 span 3 (2×2). 큰 카드는 이미지 영역이 남는 높이를 채운다(`flex: 1`).
  - Tablet(8컬럼): 큰 카드 span 8, 작은 카드 각 span 4 (2×2).
  - Mobile(6컬럼): 큰 카드 span 6, 작은 카드 각 span 3 (2×2, compact 변형).
- 카드는 DS §8-10 Card (border `--color-border-light`, radius 12, `--shadow-blue-01`). 큰 카드는 하단 텍스트 영역에 제목 `.t-h4-bold` + 우측 하단 텍스트 링크 "자세히 보기"(Detail, 밑줄, `--color-link-default`).
- **compact 변형**(작은 카드): 이미지 3:2, 텍스트 padding `--space-4`, 제목 PC `.t-body1-bold` / Mobile `.t-body2-semibold`, 2줄 clamp. (DS Card의 20px 제목은 작은 카드에 너무 커서 정의한 이 문서 내 변형)
- 탭 a11y: `role="tablist/tab/tabpanel"`, ←/→ 키 이동, `aria-selected`.
- 추적: `main_story`

---

### S4. 프로모션 배너
- 컨테이너 안에 배너 1개 (DS Banner: radius 12, border `--color-border-light`, `--shadow-blue-02`). 전체가 링크.
- `Picture`로 PC/Mobile 이미지를 따로 받는다 (PC 가로로 긴 비율 약 8:1, Mobile 약 3:1). 배너 이미지 안에 글자를 넣는 대신 **HTML 텍스트 오버레이**를 우선한다 (SEO·접근성).
- 추적: `main_banner`

---

### S5. 소개 / 신뢰 지표
**S5-A (white)**: 좌 이미지 + 우 텍스트.
- Desktop: 이미지 col 1–6 (4:3, radius 12), 텍스트 col 8–11 세로 중앙. Tablet/Mobile: 이미지 → 텍스트 세로 배치.
- 텍스트: 소개 문장 `.t-h2-regular` (한 문장 4줄 이내, 강조를 위해 일부 단어만 색/굵기를 바꾸지 않는다), 아래 `--space-8` 후 버튼 3개(Border / Gray / Round / Medium, gap `--space-3`, 줄바꿈 허용). 버튼 라벨 샘플: "연차보고서 보기", "재정 보고 보기", "인증·수상 내역 보기".
**S5-B (`--color-bg-green` 밴드)**: 신뢰 지표 3열.
- 각 열: 아이콘(lucide `Globe` / `Award` / `Handshake`, 48px, `--green-700`) + 텍스트 `.t-h5-bold` 최대 3줄. 열 사이 세로 구분선 `1px solid var(--color-border-default)`. Mobile은 세로 쌓기 + 가로 구분선.
- **내용은 전부 `'{{TODO}}'`** — 원본의 UN·WFP·수상 문구를 절대 옮기지 않는다. 단체의 실제 근거 자료가 확정되기 전에는 이 밴드를 숨기는 플래그(`home.trust.enabled = false`)를 기본값으로 둔다.
- 추적: `main_trust`

---

### S6. 캠페인 캐러셀
**콘텐츠 모델**: `campaigns: Campaign[]` (최대 10).
- 헤더: `SectionHeader`. PC는 헤더 우측에 **인디케이터 pill**(숫자 + ‹|›, DS §8-6). 숫자는 페이지 기준(현재 페이지 / 전체 페이지, `slidesToScroll: 'auto'`).
- 카드: DS Card. 이미지 높이 PC 200 / Mobile 160, 텍스트 영역에 Badge01(Border, S) 분류 + 제목 `SemiBold 20`(Mobile 16) 2줄 clamp + 설명 Regular 16(Mobile 14) 2줄 clamp. hover 시 제목 밑줄만 (카드 이동·확대 효과 없음).
- 한 화면에 보이는 카드: Desktop 4 (span 3) / Desktop-S 3 / Tablet 2 / Mobile 1.15장 (다음 카드가 살짝 보이게, 스크롤 스냅).
- Mobile은 화살표 없이 스와이프 + 하단 우측 `Carousel_mobile` pill.
- 카드 전체가 링크(`<a>` 하나, 안쪽에 링크 중첩 금지). 반복 카드는 `article > h3 > a`.
- 추적: `main_campaign`

---

### S7. 소식
**콘텐츠 모델**: `news: {image?, category, title, date, href}[5]` (이미지 있는 2개 + 텍스트 3개)
- Desktop: 이미지 카드 2개 (각 span 4, 이미지 16:10) + 텍스트 목록 (span 4). Tablet: 카드 2개(각 span 4) 아래에 목록 전체 폭. Mobile: 카드 2개 세로(이미지 160) → 목록.
- 목록 항목: Badge01(Filled-Gray, S) 분류 + 제목 `.t-body1-bold` 2줄 clamp + 날짜 `.t-detail` `--text-03` (`--text-04`는 흰 배경에서 약 2.9:1이라 정보 전달 텍스트에 쓰지 않는다, §5.5). 항목 사이 `1px solid var(--color-border-light)`, 항목 padding `--space-6` 상하.
- 헤더 우측 Plus 버튼.
- 추적: `main_news`

---

### S8. 대표 캠페인 (영상)
- Desktop: 영상 col 1–7 (16:9, radius 12, `--shadow-neutral-02`), 텍스트 col 9–12 세로 중앙. Tablet/Mobile: 영상 → 텍스트.
- **YouTube facade**: 처음엔 썸네일 이미지 + 재생 버튼(검정 원형 64px + DS Play SVG 흰색)만 렌더링하고, 클릭하면 `youtube-nocookie.com/embed/{id}?autoplay=1` iframe으로 교체한다. 페이지 로드 시 YouTube 스크립트를 불러오지 않는다.
- 텍스트: Badge01(Border) 분류 → 제목 `.t-h3-bold` → 설명 `.t-body1-regular` → 버튼 2개 [자세히 보기: Border/Secondary/Square/Medium] [후원하기: Filled/Primary/Square/Medium]. Mobile은 버튼 1:1 flex, gap `--space-2`.
- 원본은 어두운 배경 위에 얹지만, DS의 "항상 흰 배경 + 밝은 밴드" 원칙에 맞춰 밝은 배경으로 구현한다.
- 추적: `main_featured`

---

### S9. 퀵링크
- 5개 항목: 아이콘(lucide `BookOpen` `Mail` `Users` `Store` `Building2`, 24px) + 라벨 `.t-body1-bold`. 라벨 샘플: "후원 안내", "참여 프로그램", "정기후원 클럽", "온라인 스토어", "기업 후원".
- Desktop/Tablet: 5등분(이 컴포넌트에 한해 12컬럼 대신 내부 `repeat(5, 1fr)` 허용), 항목 사이 세로 구분선 `1px solid var(--color-border-default)`. Mobile: 한 줄에 1개씩 목록 (행 높이 56, 아래 구분선, 우측에 DS Right 아이콘 16px).
- 추적: `main_quicklink`

---

### S10. 뉴스레터
- Desktop: 좌(col 1–4) 제목 `.t-h4-bold` + 설명 `.t-body2-regular` `--text-03`. 우(col 5–12) 폼. Mobile: 세로.
- 폼 구성: `Input(Medium)` 이름 · `Input(Medium)` 이메일 · `Button(Filled/Secondary/Square/Medium)` "신청하기" — PC는 한 줄(gap `--space-3`), Mobile은 세로(gap `--space-2`).
- 아래 줄: 관심사 Checkbox 3개("국내 소식", "해외 소식", "후원자 이야기") + 개인정보 동의 Checkbox + "[보기]" 링크(→ Modal). Checkbox는 DS 스펙(PC 24 / Mobile 20, 원형).
- **검증** (제출 시 + 필드 blur 시): 
  | 필드 | 규칙 | 오류 문구 |
  |---|---|---|
  | 이름 | 필수, 공백 제거 후 1자 이상 | "이름을 입력해 주세요." |
  | 이메일 | 필수, 이메일 형식 | "이메일 주소를 확인해 주세요. 예: name@example.com" |
  | 관심사 | 1개 이상 | "관심사를 1개 이상 선택해 주세요." |
  | 동의 | 필수 | "신청하려면 개인정보 수집·이용에 동의해 주세요." |
  오류 표시는 DS Input Error 상태(1.5px `--color-brand-point`, 메시지 Regular 14). 첫 오류 필드로 포커스 이동, `aria-invalid`, 메시지는 `aria-describedby`로 연결.
- 제출 → `POST /api/newsletter`(mock). 성공 시 Modal(DS §8-8): 제목 "신청 화면이 정상 동작했습니다" / 본문 "**테스트 화면입니다. 아직 신청 내용은 저장되지 않습니다.**" — 실제 연동 전까지 이 문구를 반드시 표시하고, 연동 시 제거한다.
- 개인정보 동의 Modal: DS Table(수집항목 / 이용목적 / 보유기간) 3행. 내용은 `'{{TODO}}'` — 실제 개인정보처리방침이 확정되기 전에는 채우지 않는다.
- dataLayer에는 이름·이메일을 절대 넣지 않는다.
- 추적: `main_newsletter`

---

### S11. Footer
- DS §8-12(edm유학센터 Footer) 구조를 따른다 (PC 배경 `--color-bg-default`).
- 상단: 링크 목록(gap `--space-10`, Regular 18) — 이용약관 · **개인정보처리방침**(`--text-accent`) · 이메일무단수집거부 · 인재채용 · 후원문의 · FAQ · 사이트맵 · 아동 보호 정책. SNS 아이콘 3개(Youtube / PenLine=블로그 / Instagram)는 48px 원형 버튼(배경 `--neutral-100`, 아이콘 `--text-03`), gap `--space-3`. 우측에 "관련 사이트" Dropdown(Medium, PC 260 / Mobile 152).
- 하단: 법인 정보(법인명 · 대표자 · 사업자등록번호 · 주소 — 전부 `'{{TODO}}'`) Regular 18 `--text-03`, 고객센터 라벨 Bold 20 + 전화번호 Bold 40(`--text-01`), 운영시간 Regular 18. 개인정보 안내 문구는 Regular 14 `--text-03` (DS는 `#999`이나 대비 미달, §5.5).
- Mobile은 DS Mobile 구조. 하단 60px 여백 위에 모바일 CTA 바 높이(88)가 겹치지 않게 `body`에 `padding-bottom: 88px` (Mobile만).
- 원본의 "법인 2개" 구조는 따라 하지 않고 `footer.ts`에 `entities: Entity[]`(1개 이상)로 일반화한다.

---

### S12. 플로팅
- **Top 버튼**: 44×44 원형(DS 컨트롤러 버튼 스타일, 배경 `--neutral-100`, 아이콘 `ArrowUp` `--text-03`). 스크롤이 1 화면 높이를 넘으면 나타남. PC는 `right: var(--space-10); bottom: var(--space-10)`. `z-index: var(--z-floating)`.
- **PC에는 플로팅 후원 CTA를 만들지 않는다.** sticky 헤더에 후원하기 버튼이 항상 보이기 때문이다. (원본과 다른 의도적 결정)
- **Mobile 하단 CTA 바**: DS §8-13 Floating Ad(Mobile) 스펙 — 폭 100%(`left:0; right:0`), 높이 88, 배경 white, 상단 `1px solid var(--color-border-light)`, padding `16 16 24`, 버튼 2개 1:1 [일시후원 Border/Secondary] [정기후원 Filled/Primary] (높이 48, radius 8, Bold 16, gap 8). 하단 padding은 `max(var(--space-6), env(safe-area-inset-bottom))`. Top 버튼은 바 위 `--space-4`에 위치.
- 모바일 메뉴·모달이 열리면 바는 overlay 아래로 내려간다 (`z-overlay > z-floating`).
- 추적: `floating`

---

## 8. 컴포넌트 구현 체크리스트

**Phase 1에서 구현**: Button, Input, Dropdown, Checkbox, Tab01(Pill), Badge01, Card(+compact, Banner), Carousel 컨트롤(pc / mobile / 인디케이터 / Plus), IconButton(컨트롤러 원형), Modal, Table, Header, MegaMenu, MobileMenu, Footer, FloatingBar.
**Phase 2로 미룸(구현 금지)**: Chip, Radio, Textarea, Pagination, Tab02, Badge02, Search.

| 컴포넌트 | DS 근거 | 필수 변형 · 상태 | 메모 |
|---|---|---|---|
| Button | §8-1 | style Filled/Border × color Primary/Secondary/Gray/White × size 5종 × shape Square/Round × Default/Hover/Disabled/Focus | Borderless는 쓰지 않음. 아이콘 버튼은 `inline-flex; align-items:center; gap:4px` |
| Input | §8-2 | Small/Medium/Large × Default/Focused/Completed/Disabled/Error | `width:100%`. 라벨↔입력 12(PC)/8(Mobile), 입력↔메시지 8(PC)/4(Mobile) |
| Dropdown | §8-3 | Medium × Default/Selected/Active | 푸터 전용 고정 너비 예외(PC 260 / Mobile 152). 키보드(↑↓ Enter Esc) 지원 |
| Checkbox | §8-4 | PC 24 / Mobile 20, Default/Selected, 라벨 연결 | 원형(DS 스펙). `<input type="checkbox">` 기반 |
| Tab01 | §8-5 | Active/Default × PC Small / Mobile | `role="tablist"` 패턴 |
| Badge01 | §8-5 | Border / Filled-Gray, 크기 S | 분류 라벨 전용 |
| Card | §8-10 | PC / Mobile, **compact 변형(§7 S3)** | 카드 전체가 링크. 이미지 `object-fit: cover` |
| Banner | §6 Shadow 표 | radius 12, `--shadow-blue-02` | S4 |
| Carousel 컨트롤 | §8-6 | pc(카운터+Pause/Prev/Next) · mobile pill · 인디케이터 pill · Plus 40 | DS 원문 SVG 사용. Default/Hover 색 그대로 |
| IconButton | §8-6 컨트롤러 | 44×44 원형, `--neutral-100`, Hover `#D0D0D3` | Top 버튼·SNS 버튼에 사용 |
| Modal | §8-8 | PC 560 / Mobile 328, 오버레이 `--z-overlay`, 본체 `--z-modal` | 포커스 트랩, Esc, 닫기 시 트리거로 포커스 복귀, 스크롤 잠금 |
| Table | §8-9 | PC / Mobile 셀 | 개인정보 동의 모달에서만 사용 |

**DS에 값이 없어 이 문서에서 정한 기본값** (구현 후 보고만 하고 묻지 않는다)
- **Focus ring**(전 컴포넌트): `outline: 2px solid var(--blue-600); outline-offset: 2px;` — `:focus-visible`에서만.
- **Button Hover**: Filled는 한 단계 진한 토큰(Primary → `--green-600`, Secondary → `--neutral-600`, Gray → `--neutral-100`). Border는 옅은 배경 틴트(Primary → `--green-50`, Secondary·Gray → `--neutral-50`, White → `--hover-on-dark`).
- **Button Disabled**: 배경 `#DADADA`, 글자 `#999999` (DS Input Disabled와 동일), border 없음, `cursor: not-allowed`.
- **Tablet(768–1023) 헤더**: Mobile 헤더 구조를 그대로 사용 (메가메뉴는 ≥ 1024).

---

## 9. 접근성

목표: WCAG 2.2 AA / KWCAG 2.2 수준. §5.5의 known issue 외 위반 0.
- Skip link 3개(메뉴 / 본문 / 푸터)를 문서 맨 앞에 둔다. 포커스 시에만 보인다.
- `<html lang="ko">`. 페이지에 `h1` 1개(시각적으로만 숨김, `site.config.tagline`), 섹션 제목 `h2`, 카드 제목 `h3`. 섹션마다 `aria-labelledby`.
- 모든 인터랙션은 키보드로 가능: 메가메뉴, 모바일 메뉴, 탭(←/→), 캐러셀 컨트롤, 드롭다운, 모달(포커스 트랩 + Esc).
- 링크 문구가 반복되는 "자세히 보기"에는 대상이 드러나는 `aria-label` 또는 시각적 숨김 텍스트를 붙인다.
- 이미지: 정보 이미지는 의미 있는 `alt`, 장식 이미지는 `alt=""`. 배경 이미지로 정보를 전달하지 않는다.
- 자동 재생·자동 반복 모션은 정지할 수단을 제공한다 (Hero Pause 버튼). `prefers-reduced-motion: reduce`에서는 자동 재생 끔.
- 상태를 색으로만 구분하지 않는다 (오류는 문구 + 아이콘 또는 테두리 두께 변화 병행).
- 모바일 터치 타깃 최소 40×40. Button 2X-small(26px)은 보조 동작에만 쓴다.
- 폼: `<label for>` 연결, 오류는 `aria-invalid` + `aria-describedby`, 제출 실패 시 첫 오류 필드로 포커스.

---

## 10. 모션

- **허용**: 사용자 동작에 반응하는 전환 — 메뉴 열림/닫힘, 탭 전환, 모달, 색상 hover. 150–200ms, `ease-out`.
- **자동 모션은 Hero 슬라이드 전환(600ms)뿐이다.**
- **금지**: 섹션 진입 fade-up, 카드 hover 시 이동·확대, 패럴랙스, 카운트업, 원본처럼 `setInterval`로 반복되는 로고 깜빡임.
- 모든 전환은 `prefers-reduced-motion: reduce`에서 즉시 전환(0ms)으로 대체한다.

---

## 11. SEO · GEO

- `generateMetadata`: title `{name} | {tagline}`, description, canonical(`NEXT_PUBLIC_SITE_URL`), Open Graph(1200×630), Twitter card. 프로덕션에서만 `index, follow`; stub 페이지와 비프로덕션은 `noindex`.
- **JSON-LD** (`lib/jsonld.ts`, 서버 렌더링 `<script type="application/ld+json">`): `Organization` + `NGO`(`@id: "{url}/#organization"`), `WebSite`(`inLanguage: "ko-KR"`, publisher 연결), `WebPage`. 값이 `'{{TODO}}'`인 필드는 **출력에서 제외**한다 (플레이스홀더를 구조화 데이터로 내보내지 않는다).
- **FAQPage는 화면에 보이는 FAQ가 있을 때만** 추가한다 (Phase 2). 원본은 화면에 없는 Q&A를 JSON-LD로만 넣고 있는데 따라 하지 않는다.
- 원본 JSON-LD·메타의 자기 평가 문구("N년 연속 최고 등급", "대표 NGO" 등)를 옮기지 않는다 (§2-1).
- 초기 HTML에 모든 탭 패널·캐러셀 슬라이드의 텍스트가 존재해야 한다. 내부 링크는 실제 `href`를 가진 `<a>`만 사용한다 (JS 클릭 핸들러로 이동 금지).
- 단체가 무엇을 하는지(대상, 활동, 설립 연도 등)는 **이미지가 아닌 본문 텍스트**로 S5-A에 명시한다 (검색·생성형 검색이 읽을 수 있게). 값은 확정 전까지 `'{{TODO}}'`.
- `sitemap.ts`, `robots.ts`(stub 제외). `llms.txt`는 Phase 2에서 검토.
- 성능 목표(모바일): LCP < 2.5s, CLS < 0.1, INP < 200ms. 방법: Hero 첫 이미지만 priority, 가변 폰트 1개 preload, 이미지 크기 명시, YouTube facade, GTM `afterInteractive`.

---

## 12. 분석 (GTM / GA4)

- `lib/analytics.ts`의 `track({ category, action, label, extra? })`가 아래를 push한다 (원본의 `btn_ga_send` 패턴과 같은 스키마):
  ```js
  dataLayer.push({ event: 'custom_event', event_name: 'click_cta',
                   event_category, event_action, event_label })
  ```
- 마크업은 `data-track-cat`, `data-track-action`, `data-track-label` 속성. 문서 전역 click 위임 한 곳에서 처리하고, `TrackedLink` 컴포넌트가 속성을 붙인다.
- 후원 CTA(헤더 · 모바일 메뉴 · 모바일 바 · S8)는 추가로 `cta_type: 'donate'` 파라미터를 push한다.
- 페이지뷰는 GTM 트리거가 처리한다 (코드에서 push하지 않음). GTM은 `NEXT_PUBLIC_GTM_ID`가 있을 때만 로드.
- Consent Mode: GTM 로드 전에 `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`을 `denied` 기본값으로 설정. 동의 배너는 Phase 2이며, 그 전까지 이 기본값을 유지하고 README에 명시한다.
- **이름·이메일 등 개인정보를 dataLayer에 넣지 않는다.**

| category | action | label |
|---|---|---|
| `header` | `gnb_click` / `search_click` / `login_click` / `donate_click` | 메뉴명 |
| `main_hero` | `cta_click` / `control_prev` / `control_next` / `control_pause` | 슬라이드 제목 |
| `main_story` | `tab_{id}` / `card_click` | 카드 제목 |
| `main_banner` | `banner_click` | 배너명 |
| `main_trust` | `link_click` | 버튼명 |
| `main_campaign` | `card_click` / `page_prev` / `page_next` | 캠페인명 |
| `main_news` | `card_click` / `list_click` / `more_click` | 제목 |
| `main_featured` | `play` / `cta_more` / `cta_donate` | 캠페인명 |
| `main_quicklink` | `link_click` | 라벨 |
| `main_newsletter` | `submit_success` / `submit_error` | 오류 필드명 (값 금지) |
| `floating` | `top_click` / `mobile_bar_regular` / `mobile_bar_once` | — |
| `footer` | `link_click` / `sns_click` | 링크명 |

---

## 13. 콘텐츠 모델 · 카피 규칙

### 13.1 타입 (`src/content/*.ts`)
```ts
export type Todo = '{{TODO}}';

export interface ImageAsset { pc: string; mobile?: string; alt: string; width: number; height: number }

export interface SiteConfig {
  name: string | Todo;            // 단체명
  tagline: string;                // h1(시각적 숨김) + 메타 title
  description: string;            // 메타 description, 120자 내외
  url: string;                    // NEXT_PUBLIC_SITE_URL
  logo: { src?: string; wordmark: string };   // src가 없으면 텍스트 워드마크
  contact: { phone: string | Todo; email?: string | Todo; hours: string | Todo };
  sns: { youtube?: string; blog?: string; instagram?: string };
}

export interface HeroSlide { image: ImageAsset; label: string; title: string; description: string; cta: { label: string; href: string } }
export interface StoryItem { image: ImageAsset; title: string; href: string; category?: string }
export interface Campaign  { image: ImageAsset; category: string; title: string; description: string; href: string }
export interface NewsItem  { image?: ImageAsset; category: string; title: string; date: string; href: string }
export interface Credential { icon: 'globe' | 'award' | 'handshake'; text: string | Todo }
export interface QuickLink { icon: string; label: string; href: string }
export interface NavItem   { label: string; href: string; groups: { title: string; links: { label: string; href: string }[] }[]; promo: { image: ImageAsset; title: string; href: string }[] }
export interface FooterEntity { name: string | Todo; representative: string | Todo; bizNo: string | Todo; address: string | Todo }
```
- 샘플 문구는 `home.ts`에만 두고 파일 상단에 `// SAMPLE CONTENT — 배포 전 교체` 주석을 단다.
- 이미지는 `public/placeholder/`의 **회색 단색 SVG**(`--neutral-100` 계열)만 사용한다. 스톡·외부 URL·일러스트 금지.

### 13.2 카피 규칙 (샘플 문구를 쓸 때)
- 버튼은 눌렀을 때 무슨 일이 일어나는지 말한다: "정기후원 신청하기", "일시후원 하기", "캠페인 자세히 보기". "확인", "제출"만 쓰지 않는다. 같은 동작은 페이지 전체에서 같은 이름을 쓴다.
- 문체는 합니다/해 주세요체, 능동태. 이모지·느낌표 반복·감정 과장 금지.
- 오류 문구는 무엇이 잘못됐고 어떻게 고치는지 말한다. 사과하지 않는다.
- 제목 위 소제목(eyebrow)은 정보가 있을 때만(분류 라벨) 쓰고, 장식용으로 붙이지 않는다.
- **아동이 등장하는 실제 사진·실명·사연은 넣지 않는다.** 실제 사용은 촬영·게재 동의와 아동 보호(세이프가딩) 정책이 확정된 뒤에만 가능하다.

---

## 14. 검증

### 14.1 자동 검사 스크립트
`package.json`에 `check:tokens`, `check:todo`, `test:e2e`, `verify`(= lint + tsc + check:tokens + build + test:e2e)를 만든다.

**`scripts/check-tokens.mjs`** — 대상: `src/**/*.css` (module 포함, `tokens.css` 제외). 아래 중 하나라도 걸리면 실패한다.
1. `z-index` 값이 `var(--z-*)`가 아님
2. `margin` / `padding` / `gap` 계열의 px 값이 허용 집합 밖 — 허용: `0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 60, 80, 100, 120, 140`
3. `border-radius` px가 `4, 8, 12, 24, 9999` 밖
4. `box-shadow`가 `var(--shadow-*)`가 아님
5. hex 색상 리터럴이 `tokens.css` 밖에 있음
- DS §8이 컴포넌트 스펙으로 직접 명시한 값(예: 헤더 로고↔GNB 96px, Button padding `5px 12px` / `10px 20px`, Input padding `14.5px 16px`)은 `scripts/ds-exceptions.json`에 **출처 절 번호와 함께** 등록한다. 등록되지 않은 값은 실패로 처리한다.

**`scripts/check-todo.mjs`** — `src/content`와 빌드 산출물에서 `{{TODO` 개수를 센다. 개발 중에는 개수만 출력하고, `NODE_ENV=production`이면서 `ALLOW_TODO`가 없으면 실패한다.

### 14.2 E2E (Playwright)
- `/`를 **1920×1080, 768×1024, 360×800**에서 full-page 스크린샷.
- 가로 스크롤 없음 (`scrollWidth <= clientWidth`), 콘솔 에러 0.
- **네트워크 요청 도메인 허용 목록**: 자기 자신, `www.googletagmanager.com`, (영상 재생 클릭 후) `www.youtube-nocookie.com`. 그 밖의 도메인 요청이 있으면 실패 — 트래커가 다시 들어오는 것을 막는 장치다.
- 동작 확인: 메가메뉴(hover·키보드), 모바일 메뉴(열기·포커스 트랩·Esc), 탭(←/→), 캐러셀(이전·다음·정지), 뉴스레터 폼 검증 4종 + 성공 모달, 영상 facade 클릭.
- `@axe-core/playwright`로 `/`와 `/coming-soon` 검사. serious·critical 0 (§5.5 `color-contrast`는 known issue로 개수만 보고).

### 14.3 Lighthouse (모바일, 참고 목표)
Performance ≥ 90 · Accessibility ≥ 95 (§5.5 미결정 시 ≥ 90) · SEO 100.

---

## 15. 작업 순서

각 Step 완료 시 아래 4가지를 보고하고 **멈춘다** (사용자 확인 후 다음 Step).
`① 변경한 파일 ② 검증 결과(verify 출력) ③ 스크린샷 3장(1920 / 768 / 360) ④ DS와 다르게 한 점 · 질문`

| Step | 내용 | 완료 기준 |
|---|---|---|
| **0** 기반 | Next.js 프로젝트, `docs/` 배치, 폰트 셀프 호스팅, `tokens.css` · `typography.css` · `grid.css` · `globals.css`, 스크립트 2종, ESLint/Prettier, `site.config.ts` 골격 | `tokens.css`와 DS 값 비교표 제출. `build` · `lint` · `check:tokens` 통과 |
| **1** UI 컴포넌트 | §8 Phase 1 목록 전부 + `/dev/components` 카탈로그 | 모든 변형·상태가 카탈로그에 보임. 스크린샷 3장 |
| **2** 레이아웃 | SkipNav, Header, MegaMenu, MobileMenu, Footer, FloatingBar, `/coming-soon` stub | §9의 키보드 조작 체크리스트 통과 |
| **3** S2–S4 | Hero, 스토리, 프로모션 배너 | 탭·캐러셀 동작, 첫 이미지만 priority |
| **4** S5–S7 | 소개·신뢰 밴드, 캠페인 캐러셀, 소식 | 반응형 3구간 확인 |
| **5** S8–S10 | 영상 facade, 퀵링크, 뉴스레터 | 폼 검증 4종 + 모달 동작 |
| **6** 기반 기능 | 메타·JSON-LD·sitemap·robots, `track()`·GTM·Consent 기본값 | dataLayer push 확인, JSON-LD에 `{{TODO}}` 미노출 |
| **7** QA | `verify` 전체, axe, Lighthouse, 접근성 수동 점검 | 미해결 항목 목록 제출 |
| **8** 문서화 | `README.md` — 실행법, 파일별 콘텐츠 교체 방법, `{{TODO}}` 목록, known issues, Phase 2 후보 | 비개발자가 읽고 콘텐츠를 바꿀 수 있는 수준 |

---

## 16. 결정이 필요한 항목

| # | 항목 | 기본값 | 질문 필요 |
|---|---|---|---|
| 1 | 단체명 · 후원 대상 · 톤 | `{{ORG_NAME}}`, 아동·지역사회 지원 단체로 가정 | **예** |
| 2 | 명도 대비 이슈 (§5.5) | DS 원안 유지 (`--btn-primary-text:#FFF`, `--text-accent:green-500`) | **예** — ① 원안 유지 ② 버튼 글자를 검정으로 ③ 연두 텍스트를 green-700으로 (②③ 병행 가능) |
| 3 | 로고 | 텍스트 워드마크 | 아니오 |
| 4 | 이미지 | 회색 placeholder | 아니오 |
| 5 | S5-B 신뢰 지표 밴드 | 숨김 (`trust.enabled=false`) | 아니오 |
| 6 | Button hover/disabled, Focus ring, Tablet 헤더 | §8 기본값 | 아니오 (보고만) |
| 7 | 호스팅 · 도메인 | 미정 | 아니오 |
| 8 | 웹 접근성 인증 필요 여부 | 미정 (목표 수준만 준수) | 아니오 |

작업 중 새로 생긴 모호함은 이 표에 행을 추가해 질문한다 (§2-10).

---

## 17. 원본 → 이 프로젝트 매핑

| 원본 섹션 | 이 프로젝트 | 달라진 점 |
|---|---|---|
| 상단 유틸바(로그인·회원가입·영수증) + 헤더 2단 | S1 단일 행 | 유틸을 헤더 우측·푸터·모바일 메뉴로 재배치 |
| 메인 슬라이드(8) | S2 | DS 캐러셀 컨트롤, 정지 버튼, reduced-motion |
| 스토리 탭 3 + 벤토 | S3 | 이모지 제거, 전 탭 서버 렌더링 |
| 중단 배너 | S4 | HTML 텍스트 오버레이 우선 |
| 소개 + 수상·인증 3개 | S5-A / S5-B | 수상·인증 문구 제외, 밴드 기본 숨김 |
| 하단 캠페인 슬라이드(10) | S6 | DS Card, 페이지 기반 카운터 |
| 소식 | S7 | DS Badge · 구분선 |
| 캠페인 영상 | S8 | 밝은 배경, YouTube facade |
| 퀵링크 5 | S9 | 아이콘 lucide 아웃라인 |
| 뉴스레터 | S10 | 검증·접근성 보강, 저장 없음 |
| 푸터(법인 2개) | S11 | `entities[]`로 일반화 |
| 퀵메뉴 + 바로후원하기 | S12 | PC 플로팅 CTA 삭제 |

**의도적으로 가져오지 않는 것**: 일회성 이벤트(창립 기념 로고 뱃지, 앱 다운로드 이벤트 플로팅, 공모전 배너), 로고 깜빡임 `setInterval`, 서드파티 트래커 일체, jQuery · slick · AOS, `m.` 별도 모바일 도메인, PC 고정폭 viewport 메타.
