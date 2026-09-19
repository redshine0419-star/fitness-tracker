import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, 'data', 'app.db')

export const db = new Database(dbPath)
db.pragma('journal_mode = WAL')

db.exec(`
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS banners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  sort_order INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT,
  image_url TEXT,
  active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  published_at TEXT DEFAULT CURRENT_TIMESTAMP,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  donation_type TEXT,
  amount TEXT,
  subject TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`)

function seedIfEmpty() {
  const adminCount = db.prepare('SELECT COUNT(*) AS c FROM admins').get().c
  if (adminCount === 0) {
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'admin1234'
    const hash = bcrypt.hashSync(defaultPassword, 10)
    db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run('admin', hash)
    console.log(`[seed] created default admin account -> username: admin / password: ${defaultPassword} (change this after first login)`)
  }

  const bannerCount = db.prepare('SELECT COUNT(*) AS c FROM banners').get().c
  if (bannerCount === 0) {
    const banners = [
      ['한 아이의 결연이, 한 마을의 내일을 바꿉니다', '아동결연 후원으로 희망을 전해주세요', 'https://picsum.photos/seed/gh-banner-1/1600/700', '/programs', 1],
      ['긴급구호 캠페인', '재난과 분쟁으로 고통받는 아이들에게 생명을 지켜주는 손길이 필요합니다', 'https://picsum.photos/seed/gh-banner-2/1600/700', '/programs', 2],
      ['정기후원으로 함께하는 변화', '매달 작은 나눔이 아이의 교육과 건강을 지킵니다', 'https://picsum.photos/seed/gh-banner-3/1600/700', '/donate', 3],
    ]
    const insert = db.prepare('INSERT INTO banners (title, subtitle, image_url, link_url, sort_order) VALUES (?, ?, ?, ?, ?)')
    for (const b of banners) insert.run(...b)
  }

  const programCount = db.prepare('SELECT COUNT(*) AS c FROM programs').get().c
  if (programCount === 0) {
    const programs = [
      ['아동결연', '1:1 아동결연 후원', '한 아이와 결연하여 교육, 건강, 정서적 지지를 지속적으로 지원합니다.', '아동결연 후원자가 되시면 매달 후원금이 결연 아동이 속한 지역사회의 교육, 보건, 영양 사업에 사용됩니다. 결연 아동과 편지를 주고받으며 성장 과정을 함께할 수 있습니다.', 'https://picsum.photos/seed/gh-program-1/900/600'],
      ['국내사업', '취약계층 아동 자립 지원', '국내 저소득 가정 아동과 청소년의 교육 격차 해소와 자립을 돕습니다.', '방과 후 학습 지원, 심리 상담, 자립 준비 프로그램 등을 통해 국내 취약계층 아동이 안전하게 성장할 수 있도록 지원합니다.', 'https://picsum.photos/seed/gh-program-2/900/600'],
      ['해외사업', '식수 위생 개선 사업', '깨끗한 물이 없는 지역에 우물과 위생 시설을 지어 아동 건강을 지킵니다.', '오염된 물로 인한 질병으로 고통받는 아이들을 위해 우물 개발, 정수 시설 보급, 위생 교육을 진행합니다.', 'https://picsum.photos/seed/gh-program-3/900/600'],
      ['긴급구호', '재난 긴급구호 캠페인', '자연재해와 분쟁 지역의 아동과 가족에게 긴급 구호물품을 전달합니다.', '재난 발생 초기 골든타임에 식량, 의약품, 임시 거처 등을 신속히 지원하여 생명을 지킵니다.', 'https://picsum.photos/seed/gh-program-4/900/600'],
      ['캠페인', '희망의 선물상자 캠페인', '연말연시, 전 세계 아동들에게 희망의 선물을 전달하는 캠페인입니다.', '후원자가 보내주신 선물상자는 교육용품, 위생용품, 장난감 등으로 채워져 아이들에게 직접 전달됩니다.', 'https://picsum.photos/seed/gh-program-5/900/600'],
    ]
    const insert = db.prepare('INSERT INTO programs (category, title, summary, content, image_url) VALUES (?, ?, ?, ?, ?)')
    for (const p of programs) insert.run(...p)
  }

  const newsCount = db.prepare('SELECT COUNT(*) AS c FROM news').get().c
  if (newsCount === 0) {
    const news = [
      ['공지사항', '2026년 후원금 사용 내역 공개', '투명한 후원금 운영을 위해 2026년 상반기 후원금 사용 내역을 홈페이지에 공개하였습니다. 후원금은 아동결연, 국내외 사업, 긴급구호 등에 사용되었습니다.', 'https://picsum.photos/seed/gh-news-1/900/500'],
      ['보도자료', '식수 위생 개선 사업, 현지 마을 300세대에 새 우물 제공', '지난 분기 진행된 식수 위생 개선 사업을 통해 현지 마을 300세대가 깨끗한 물을 이용할 수 있게 되었습니다.', 'https://picsum.photos/seed/gh-news-2/900/500'],
      ['캠페인 소식', '희망의 선물상자, 올해 목표 1만 개 달성', '연말 캠페인으로 진행된 희망의 선물상자가 목표했던 1만 개를 초과 달성하며 성공적으로 마무리되었습니다.', 'https://picsum.photos/seed/gh-news-3/900/500'],
      ['공지사항', '개인정보처리방침 개정 안내', '관련 법령 개정에 따라 개인정보처리방침 일부 내용이 개정되었습니다. 자세한 내용은 본문을 참고해 주세요.', 'https://picsum.photos/seed/gh-news-4/900/500'],
    ]
    const insert = db.prepare('INSERT INTO news (category, title, content, image_url) VALUES (?, ?, ?, ?)')
    for (const n of news) insert.run(...n)
  }
}

seedIfEmpty()
