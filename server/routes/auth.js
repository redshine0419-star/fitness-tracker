import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { db } from '../db.js'
import { signToken, requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password) {
    return res.status(400).json({ error: '아이디와 비밀번호를 입력해 주세요.' })
  }
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username)
  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
    return res.status(401).json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' })
  }
  const token = signToken({ id: admin.id, username: admin.username })
  res.json({ token, username: admin.username })
})

router.post('/change-password', requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body || {}
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: '현재 비밀번호와 새 비밀번호를 입력해 주세요.' })
  }
  const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(req.admin.id)
  if (!admin || !bcrypt.compareSync(currentPassword, admin.password_hash)) {
    return res.status(401).json({ error: '현재 비밀번호가 올바르지 않습니다.' })
  }
  const hash = bcrypt.hashSync(newPassword, 10)
  db.prepare('UPDATE admins SET password_hash = ? WHERE id = ?').run(hash, admin.id)
  res.json({ ok: true })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ id: req.admin.id, username: req.admin.username })
})

export default router
