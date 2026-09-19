import { Router } from 'express'
import { db } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM banners WHERE active = 1 ORDER BY sort_order ASC, id ASC').all()
  res.json(rows)
})

router.get('/admin', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM banners ORDER BY sort_order ASC, id ASC').all()
  res.json(rows)
})

router.post('/', requireAuth, (req, res) => {
  const { title, subtitle, image_url, link_url, sort_order, active } = req.body || {}
  if (!title || !image_url) return res.status(400).json({ error: '제목과 이미지 URL은 필수입니다.' })
  const info = db.prepare(
    'INSERT INTO banners (title, subtitle, image_url, link_url, sort_order, active) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(title, subtitle || '', image_url, link_url || '', sort_order ?? 0, active === false ? 0 : 1)
  const row = db.prepare('SELECT * FROM banners WHERE id = ?').get(info.lastInsertRowid)
  res.status(201).json(row)
})

router.put('/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM banners WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: '배너를 찾을 수 없습니다.' })
  const { title, subtitle, image_url, link_url, sort_order, active } = req.body || {}
  db.prepare(
    'UPDATE banners SET title = ?, subtitle = ?, image_url = ?, link_url = ?, sort_order = ?, active = ? WHERE id = ?'
  ).run(
    title ?? existing.title,
    subtitle ?? existing.subtitle,
    image_url ?? existing.image_url,
    link_url ?? existing.link_url,
    sort_order ?? existing.sort_order,
    active === undefined ? existing.active : (active ? 1 : 0),
    req.params.id
  )
  res.json(db.prepare('SELECT * FROM banners WHERE id = ?').get(req.params.id))
})

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM banners WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

export default router
