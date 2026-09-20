# 후원 단체 홈페이지 (Phase 1: 메인 페이지)

아동·지역사회 지원 단체를 가정한 후원 홈페이지 메인 페이지입니다. 실제 단체명·연락처·이미지 등은
아직 정해지지 않아 자리표시자(`{{TODO}}`, 회색 도형 이미지)로 채워져 있고, 구조·디자인·기능은
전부 완성되어 있습니다. 이 문서는 **개발 지식이 없어도** 실행하고 콘텐츠를 바꿀 수 있도록
작성했습니다.

- 스펙 문서: [`docs/PROJECT_SPEC.md`](docs/PROJECT_SPEC.md)
- 디자인 시스템 원문(수정 금지): [`docs/edm-design-system.md`](docs/edm-design-system.md)
- 작업 기록(무엇을 언제 만들었는지): [`docs/PROGRESS.md`](docs/PROGRESS.md)
- 스펙과 다르게 결정한 부분과 이유: [`docs/DEVIATIONS.md`](docs/DEVIATIONS.md)

---

## 1. 실행하는 방법

터미널(명령 프롬프트)에서 이 폴더로 이동한 뒤 아래 순서대로 입력합니다.

```bash
# 1) 처음 한 번만: 필요한 프로그램 설치
npm install

# 2) 화면을 보면서 수정하고 싶을 때 (수정하면 화면이 바로 갱신됩니다)
npm run dev
```

브라우저에서 `http://localhost:3000` 을 열면 화면이 보입니다. 종료하려면 터미널에서
`Ctrl + C`를 누릅니다.

실제 서비스처럼(최적화된 상태로) 확인하고 싶다면:

```bash
npm run build   # 배포용으로 한 번 빌드
npm run start   # 빌드된 결과를 http://localhost:3000 으로 실행
```

### 코드가 안 깨졌는지 확인하는 명령어 (콘텐츠만 바꿨다면 보통 필요 없음)

```bash
npm run lint        # 코드 스타일 검사
npm run typecheck   # 타입 오류 검사
npm run check:tokens # 디자인 시스템 색상/간격 규칙 검사
npm run build        # 빌드가 되는지 확인
npm run test:e2e     # 자동 브라우저 테스트 (Playwright 필요)
npm run verify        # 위 4가지(lint/typecheck/check:tokens/build) + test:e2e를 한 번에
```

> 이 샌드박스 환경에서 `npm run test:e2e`를 돌리려면 `PW_CHROMIUM_PATH` 환경변수가 필요할 수
> 있습니다. 자세한 설명은 `playwright.config.ts` 상단 주석을 참고하세요. 일반 PC/맥에서는
> 먼저 `npx playwright install chromium`을 한 번 실행하면 됩니다.

---

## 2. 사이트 주소·분석 도구 설정 (`.env.local`)

프로젝트 루트에 `.env.example`이라는 파일이 있습니다. 이 파일을 복사해서 `.env.local`이라는
이름으로 저장한 뒤, 아래 두 값을 채웁니다. (`.env.local`은 절대 GitHub 등에 올리지 마세요.)

```bash
cp .env.example .env.local
```

| 변수 | 설명 | 비워두면? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | 실제 배포 도메인 (예: `https://www.우리단체.org`). 검색엔진 링크, SNS 공유 미리보기, 사이트맵에 쓰입니다. | 기본값 `https://example.org`로 동작(실제 배포 전 반드시 채워야 함) |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager 컨테이너 ID (예: `GTM-XXXXXXX`). 방문자 통계를 구글 애널리틱스로 보내고 싶을 때만 채웁니다. | 비워두면 분석 스크립트 자체가 로드되지 않습니다(추적 없음, 안전한 기본값). |

값을 바꾼 뒤에는 `npm run dev`(또는 `build`)를 다시 시작해야 반영됩니다.

---

## 3. 콘텐츠(글·이미지·메뉴)를 바꾸는 방법

모든 실제 내용은 `src/content/` 폴더의 4개 파일에 모여 있습니다. **화면 디자인이나 배치를
바꾸는 게 아니라 "글자와 이미지만" 바꾸는 것이라면 이 폴더만 건드리면 됩니다.**

파일을 열 때는 메모장 대신 VS Code 같은 코드 편집기를 쓰는 것을 권장합니다(따옴표·쉼표를
실수로 지우기 쉬워서 그렇습니다). 값은 항상 큰따옴표(`"..."`) 안의 글자만 바꾸고, 따옴표
자체나 쉼표(`,`)는 지우지 마세요.

### 3.1 `src/content/site.config.ts` — 단체 기본 정보

| 항목 | 예시 | 설명 |
|---|---|---|
| `name` | `"글로벌호프"` | 단체 이름. 페이지 제목(브라우저 탭)과 검색 결과에 노출됩니다. |
| `tagline` | `"아동과 지역사회를..."` | 한 줄 슬로건. 화면에는 안 보이지만(시각적 숨김 제목) 검색엔진이 읽습니다. |
| `description` | (2문장 정도) | 검색 결과 요약 문구. 120자 내외 권장. |
| `logo.wordmark` | `"글로벌호프"` | 헤더 좌측 로고 자리에 글자로 표시됩니다(이미지 로고는 아직 미지원, 3.6절 참고). |
| `contact.phone` / `email` / `hours` | `"02-1234-5678"` 등 | 푸터 고객센터 정보. |
| `sns.youtube` / `blog` / `instagram` | `"https://..."` | 실제 SNS 주소가 정해지면 이 값을 채우세요(그 전엔 "준비 중" 페이지로 연결됩니다). |

### 3.2 `src/content/nav.ts` — 상단 메뉴(GNB)

5개 메뉴(후원하기/스토리/기관소개/사업안내/나의후원) 각각에 하위 메뉴 묶음(`groups`)과
오른쪽 이미지 배너 2개(`promo`)가 들어 있습니다. `label`(메뉴 이름)과 `href`(연결 주소)만
바꾸면 됩니다. 실제 페이지가 아직 없는 주소는 전부 `/coming-soon/...`로 연결돼 "준비 중"
화면이 뜹니다 — 실제 페이지가 만들어지면 그 주소로 바꿔주세요.

### 3.3 `src/content/home.ts` — 메인 페이지의 거의 모든 내용

이 파일 하나가 메인 페이지 대부분을 채웁니다. 위에서부터 순서대로:

- `heroSlides` — 맨 위 큰 배너 3장. 이미지, 라벨, 제목, 설명, 버튼 문구/링크.
- `storyTabs` — "스토리" 섹션의 탭 3개(새 소식/활동 이야기/후원자 이야기)와 각 탭의 카드 5개.
- `promoBanner` — 스토리 아래 얇은 프로모션 배너 1개.
- `introSection` — "우리는 무엇을 하는가" 소개 문구 + 버튼 3개(연차보고서/재정보고/인증내역).
- `trustSection` — 인증·수상 실적을 보여주는 밴드. **`enabled: false`로 꺼져 있습니다.**
  실제 근거 자료(인증 마크, 수상 내역)가 확정되면 `credentials`의 `{{TODO}}` 3곳을 채우고
  `enabled: true`로 바꾸세요.
- `campaigns` — 캠페인 카드 6개(카테고리/제목/설명/이미지/링크).
- `newsItems` — 소식 5개(이미지 있는 것 2개 + 텍스트만 3개, 최신순으로 나열하면 됩니다).
- `featuredVideo` — 대표 영상 섹션. `videoId`는 유튜브 영상 주소의 마지막 부분입니다
  (`https://youtube.com/watch?v=ABC123` → `videoId: "ABC123"`). **지금은 실제 캠페인 영상이
  없어 데모용 공개 영상 ID가 들어 있으니, 실제 서비스 전 반드시 교체하세요.**
- `quickLinks` — 하단 바로가기 5개(아이콘/라벨/링크).

### 3.4 `src/content/footer.ts` — 하단 영역

- `footerLinks` — 이용약관/개인정보처리방침 등 하단 링크 목록.
- `relatedSites` — "관련 사이트" 드롭다운 목록.
- `footerEntities` — **법인 정보(단체명/대표자/사업자등록번호/주소).** 지금은 전부
  `{{TODO}}`이며, 실제 값이 정해지는 대로 반드시 채워야 하는 항목입니다(하단 §4 참고).

### 3.5 서브페이지 콘텐츠 — `about.ts` / `programs.ts` / `donate.ts` / `story.ts` / `news.ts`

메인 페이지 외에 아래 5개 서브페이지가 있습니다(스펙의 Phase 1 범위 밖이지만 요청에 따라
추가). 나머지 메뉴 링크는 여전히 `/coming-soon` 준비중 화면입니다.

| 경로 | 콘텐츠 파일 | 내용 |
|---|---|---|
| `/about` | `src/content/about.ts` | 설립 정신, 일하는 방식(가치 카드 3개), 기관 현황 숫자 4개(전부 `{{TODO}}`) |
| `/programs` | `src/content/programs.ts` | 사업 분야 카드 3개(국제협력/국내복지/교육·연구) |
| `/donate` | `src/content/donate.ts` | 후원 방법 카드 4개(정기/일시/결연/기업) |
| `/story` | `src/content/story.ts` | `/story` 목록 페이지 전용 탭별 카드 9개(홈 화면의 `storyTabs`와는 별개 콘텐츠) |
| `/news` | `src/content/news.ts` | `/news` 목록 페이지 전용 소식 9건(홈 화면의 `newsItems`와는 별개 콘텐츠) |

### 3.6 이미지 교체하기

지금은 사진 대신 `public/illustrations/` 폴더의 자체 제작 일러스트(SVG, 아동결연·긴급구호·
캠페인 등 주제별 12종)를 쓰고 있습니다. 실제 사진 저작권·초상권 문제를 피하기 위한 임시
자리표시자입니다. 실제 사진으로 바꾸려면:

1. 이미지 파일(jpg/png/webp)을 `public/images/` 같은 폴더를 새로 만들어 넣습니다.
2. `home.ts`/`nav.ts`에서 `image: { pc: "/illustrations/xxx.svg", ... }`로 된 부분을
   `pc: "/images/파일이름.jpg"`로 바꿉니다.
3. `width`/`height`는 **실제 이미지의 가로/세로 픽셀 크기**로 반드시 같이 바꿔주세요
   (화면이 갑자기 밀리는 현상을 막기 위한 값입니다).
4. `alt`에는 이미지가 무슨 내용인지 설명하는 짧은 문장을 넣습니다. 순수 배경/장식용
   이미지라면 `alt: ""`로 비워둡니다.
5. 모바일에서 다른 이미지를 쓰고 싶으면 `mobile` 속성도 같은 방식으로 채웁니다(선택 사항).

SNS 공유 시 보이는 미리보기 이미지는 `public/og-image.png`(1200×630)입니다. 실제 이미지로
교체하려면 같은 파일명·크기(1200×630 픽셀)로 덮어쓰면 됩니다.

---

## 4. 지금 비어 있는 값(`{{TODO}}`) 목록

아래 16곳은 실제 단체 정보가 정해지기 전까지 일부러 비워둔 자리입니다. 실제 서비스를
시작하기 전에 전부 채워야 합니다. (`npm run check:todo`로 언제든 남은 개수를 다시 셀 수
있습니다 — 이 스크립트는 코드 설명 주석과 타입 정의에 쓰인 `{{TODO}}`라는 글자까지 함께
세기 때문에 실제로는 20건으로 나오지만, 진짜로 채워야 할 콘텐츠 값은 아래 16곳입니다.)

| 파일 | 항목 | 무엇을 채워야 하나 |
|---|---|---|
| `src/content/site.config.ts` | `name` | 단체 정식 명칭 |
| `src/content/site.config.ts` | `logo.wordmark` | 헤더에 표시할 로고 글자 |
| `src/content/site.config.ts` | `contact.phone` | 고객센터 전화번호 |
| `src/content/site.config.ts` | `contact.email` | 고객센터 이메일 |
| `src/content/site.config.ts` | `contact.hours` | 운영 시간 (예: "평일 09:00–18:00") |
| `src/content/footer.ts` | `footerEntities[0].name` | (사업자등록증상) 법인명 |
| `src/content/footer.ts` | `footerEntities[0].representative` | 대표자명 |
| `src/content/footer.ts` | `footerEntities[0].bizNo` | 사업자등록번호 |
| `src/content/footer.ts` | `footerEntities[0].address` | 사업장 주소 |
| `src/content/home.ts` | `trustSection.credentials[0..2].text` | 인증·수상 3건의 문구 (밴드 자체가 `enabled:false`라 채운 뒤 켜야 화면에 보임) |
| `src/content/about.ts` | `orgStats[0..3].value` | 설립연도/국내 조직/해외 협력국/결연 아동 수 (`/about` 페이지 하단 숫자) |

그 밖에 `src/components/sections/home/Newsletter.tsx`의 개인정보 수집·이용 동의 팝업
표(수집항목/이용목적/보유기간)도 지금은 전부 `{{TODO}}`이니 실제 개인정보처리방침 확정 후
같은 파일에서 채워야 합니다.

---

## 5. 알려진 이슈 (Known Issues)

1. **명도 대비(디자인 결정 사항)** — "후원하기" 등 초록 배경 버튼의 흰 글자, 그리고 초록색
   강조 텍스트가 WCAG AA 기준(4.5:1)에 살짝 못 미칩니다(약 2.2:1). 디자인 시스템 원안을
   그대로 쓰기로 결정된 사항이며, 필요해지면 `src/styles/tokens.css`의 `--btn-primary-text`,
   `--text-accent` 두 값만 바꾸면 전체 화면에 한 번에 반영되도록 만들어 두었습니다.
2. **뉴스레터 신청은 저장되지 않습니다** — "신청하기"를 누르면 화면 검증(입력 확인)까지만
   동작하고, 실제로 이메일이 저장되거나 발송되지는 않습니다(성공 화면에도 "아직 신청 내용은
   저장되지 않습니다"라고 명시돼 있습니다). 실제 서비스에는 이메일 마케팅 도구 연동이
   필요합니다.
3. **`/coming-soon/...`로 연결되는 링크가 많습니다** — 로그인, 검색, 후원 신청, 상세
   페이지 등 이번 단계 범위 밖의 기능은 전부 "준비 중" 안내 화면으로 연결됩니다. 각 기능이
   만들어지면 `nav.ts`/`home.ts`/`footer.ts`의 해당 링크만 실제 주소로 바꾸면 됩니다.
4. **폰트 용량** — 화면에 쓰이는 한글 폰트(Pretendard) 전체 글립을 담은 파일이 약 2MB로
   다소 큽니다. 실제 서비스 전 사용 글자 범위만 남기는 "서브셋팅" 작업을 하면 초기 로딩
   속도를 개선할 수 있습니다.
5. **Lighthouse 성능 자동 측정** — 이 개발 샌드박스 환경에서는 Lighthouse 측정 도구 자체가
   불안정하게 동작해(실행할 때마다 결과가 크게 달라짐) 신뢰할 수 있는 점수를 얻지 못했습니다.
   실제 배포 서버(또는 일반 PC의 크롬 개발자 도구 Lighthouse 탭)에서 다시 측정하는 것을
   권장합니다.

---

## 6. Phase 2 후보 (이번 단계에서 일부러 만들지 않은 것)

- 로그인/회원가입, 실제 결제(후원) 처리, 관리자 CMS
- 쿠키 동의 배너 UI (지금은 동의 여부와 무관하게 분석 저장을 기본 거부(denied) 상태로
  시작하도록만 만들어 뒀습니다)
- 화면에 실제로 보이는 FAQ가 생기면 그때 FAQ 구조화 데이터(JSON-LD) 추가
- `llms.txt` 검토
- 신뢰 지표 밴드 활성화(§4 참고, 근거 자료 확정 시)

---

## 7. 프로젝트 구조 (참고용)

```
src/
  app/           페이지 라우팅(홈, /coming-soon, /dev/components 카탈로그, API)
  components/    화면 부품 (ui: 버튼 등 기본 부품 / layout: 헤더·푸터 / sections/home: 섹션별 조립)
  content/       ← 실제 글·이미지·메뉴 (콘텐츠 담당자는 대부분 이 폴더만 수정)
  lib/           SEO·구조화데이터·분석 관련 코드
  styles/        디자인 토큰(색상/간격/타이포그래피)
docs/            스펙, 진행 기록, 결정 사항 문서
public/          이미지·폰트 등 정적 파일
tests/e2e/       자동 브라우저 테스트
```
