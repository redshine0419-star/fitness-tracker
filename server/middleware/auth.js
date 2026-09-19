import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-only-secret-change-me'

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' })
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: '인증이 필요합니다.' })
  try {
    req.admin = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: '유효하지 않거나 만료된 토큰입니다.' })
  }
}
