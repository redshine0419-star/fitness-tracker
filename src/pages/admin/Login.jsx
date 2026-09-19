import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { api, getToken, setToken } from '../../api.js'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (getToken()) return <Navigate to="/admin" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { token } = await api.login(username, password)
      setToken(token)
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-shell">
      <div className="login-card">
        <h1>글로벌호프</h1>
        <p className="sub">관리자 로그인</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="username">아이디</label>
            <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
          </div>
          <div className="form-row">
            <label htmlFor="password">비밀번호</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary btn-block" disabled={loading} type="submit">
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        <div className="hint-box">
          최초 관리자 계정: <strong>admin</strong> / 초기 비밀번호는 서버 콘솔 로그를 확인하세요. 로그인 후 반드시 비밀번호를 변경해 주세요.
        </div>
      </div>
    </div>
  )
}
