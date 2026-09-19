import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

import './db.js'
import authRoutes from './routes/auth.js'
import bannerRoutes from './routes/banners.js'
import programRoutes from './routes/programs.js'
import newsRoutes from './routes/news.js'
import inquiryRoutes from './routes/inquiries.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/banners', bannerRoutes)
app.use('/api/programs', programRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/inquiries', inquiryRoutes)

app.get('/api/health', (req, res) => res.json({ ok: true }))

const distDir = path.join(__dirname, '..', 'dist')
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'))
  })
}

app.use((err, req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: '서버 오류가 발생했습니다.' })
})

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`)
})
