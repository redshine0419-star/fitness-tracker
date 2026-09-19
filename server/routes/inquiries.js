import { Router } from 'express'
import { db } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/', (req, res) => {
  const { type, name, phone, email, donation_type, amount, subject, message } = req.body || {}
  if (!type || !name) return res.status(400).json({ error: '이름은 필수입니다.' })
  if (!phone && !email) return res.status(400).json({ error: '연락처 또는 이메일 중 하나는 입력해 주세요.' })
  const info = db.prepare(
    `INSERT INTO inquiries (type, name, phone, email, donation_type, amount, subject, message)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(type, name, phone || '', email || '', donation_type || '', amount || '', subject || '', message || '')
  res.status(201).json({ id: info.lastInsertRowid })
})

router.get('/', requireAuth, (req, res) => {
  const { status, type } = req.query
  let rows = db.prepare('SELECT * FROM inquiries ORDER BY created_at DESC').all()
  if (status) rows = rows.filter((r) => r.status === status)
  if (type) rows = rows.filter((r) => r.type === type)
  res.json(rows)
})

router.patch('/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM inquiries WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: '문의를 찾을 수 없습니다.' })
  const { status } = req.body || {}
  db.prepare('UPDATE inquiries SET status = ? WHERE id = ?').run(status ?? existing.status, req.params.id)
  res.json(db.prepare('SELECT * FROM inquiries WHERE id = ?').get(req.params.id))
})

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM inquiries WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

export default router
