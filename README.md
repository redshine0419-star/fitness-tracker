# 글로벌호프 (GlobalHope) 웹사이트

아동결연/구호 NGO 홈페이지를 참고하여 만든 **후원 단체 소개 사이트** + **관리자(CMS) 페이지**입니다.
(실제 특정 단체의 명칭·로고를 사용하지 않고, 유사한 구조와 기능을 가진 예시 사이트로 제작했습니다.)

## 구성

- `src/` — React + Vite 프론트엔드 (공개 사이트 + 관리자 화면)
- `server/` — Express + SQLite 백엔드 API

## 주요 기능

**공개 사이트**
- 홈: 배너 슬라이더, 빠른 후원 메뉴, 사업 소개, 후원 통계, 최신 소식
- 단체소개, 사업소개(카테고리 필터), 사업 상세
- 소식(공지/보도자료/캠페인) 목록 및 상세
- 후원 신청 폼, 일반 문의 폼

**관리자(CMS) 기능** — `/admin/login`
- JWT 로그인 인증
- 대시보드(통계 요약, 최근 문의)
- 배너 관리 (등록/수정/삭제, 노출 순서·공개 여부)
- 사업소개 관리 (카테고리별 CRUD)
- 소식 관리 (CRUD)
- 후원 신청 / 문의 내역 조회, 상태 변경(신규/처리중/완료), 삭제

## 실행 방법

### 1. 의존성 설치

```bash
npm install
npm run install:server
```

### 2. 개발 서버 실행 (프론트 + API 동시 실행)

```bash
npm run dev:all
```

- 프론트엔드: http://localhost:5173 (API 요청은 자동으로 :4000 으로 프록시됩니다)
- API 서버: http://localhost:4000

개별로 실행하려면 `npm run dev` (프론트)와 `npm run server` (API)를 각각 다른 터미널에서 실행하세요.

### 3. 관리자 로그인

최초 실행 시 서버 콘솔에 기본 관리자 계정이 출력됩니다.

```
username: admin
password: admin1234
```

`/admin/login`으로 접속 후 로그인하며, 반드시 비밀번호를 변경해서 사용하세요.
(비밀번호 변경 API: `POST /api/auth/change-password`)

### 4. 프로덕션 빌드 및 실행

```bash
npm run build          # dist/ 생성
npm run install:server
npm run start           # 빌드 후 서버가 dist를 정적으로 서빙하며 API도 함께 제공
```

## 데이터 저장

SQLite 파일(`server/data/app.db`)에 배너/사업/소식/문의 데이터가 저장됩니다. 최초 실행 시 샘플 데이터가 자동으로 시드됩니다. 이 파일은 git에 커밋되지 않습니다(`.gitignore` 처리).

## 환경변수 (선택)

`server/.env` 파일을 만들어 아래 값을 설정할 수 있습니다.

```
PORT=4000
JWT_SECRET=change-this-secret
ADMIN_DEFAULT_PASSWORD=admin1234
```
