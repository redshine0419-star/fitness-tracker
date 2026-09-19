import { Router } from 'express'
import { db } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', (req, res) => {
  const { category } = req.query
  let rows
  if (category && category !== '전체') {
    rows = db.prepare('SELECT * FROM programs WHERE active = 1 AND category = ? ORDER BY created_at DESC').all(category)
  } else {
    rows = db.prepare('SELECT * FROM programs WHERE active = 1 ORDER BY created_at DESC').all()
  }
  res.json(rows)
})

router.get('/admin', requireAuth, (req, res) => {
  res.json(db.prepare('SELECT * FROM programs ORDER BY created_at DESC').all())
})

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM programs WHERE id = ?').get(req.params.id)
  if (!row) return res.status(404).json({ error: '사업을 찾을 수 없습니다.' })
  res.json(row)
})

router.post('/', requireAuth, (req, res) => {
  const { category, title, summary, content, image_url, active } = req.body || {}
  if (!category || !title) return res.status(400).json({ error: '카테고리와 제목은 필수입니다.' })
  const info = db.prepare(
    'INSERT INTO programs (category, title, summary, content, image_url, active) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(category, title, summary || '', content || '', image_url || '', active === false ? 0 : 1)
  res.status(201).json(db.prepare('SELECT * FROM programs WHERE id = ?').get(info.lastInsertRowid))
})

router.put('/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM programs WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: '사업을 찾을 수 없습니다.' })
  const { category, title, summary, content, image_url, active } = req.body || {}
  db.prepare(
    'UPDATE programs SET category = ?, title = ?, summary = ?, content = ?, image_url = ?, active = ? WHERE id = ?'
  ).run(
    category ?? existing.category,
    title ?? existing.title,
    summary ?? existing.summary,
    content ?? existing.content,
    image_url ?? existing.image_url,
    active === undefined ? existing.active : (active ? 1 : 0),
    req.params.id
  )
  res.json(db.prepare('SELECT * FROM programs WHERE id = ?').get(req.params.id))
})

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM programs WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

export default router
