import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { getToken, setToken } from '../api.js'

const LINKS = [
  { to: '/admin', label: '대시보드', end: true },
  { to: '/admin/banners', label: '배너 관리' },
  { to: '/admin/programs', label: '사업 관리' },
  { to: '/admin/news', label: '소식 관리' },
  { to: '/admin/inquiries', label: '문의/후원신청 관리' },
]

export default function AdminLayout() {
  const navigate = useNavigate()

  if (!getToken()) {
    return <Navigate to="/admin/login" replace />
  }

  function handleLogout() {
    setToken(null)
    navigate('/admin/login')
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand">글로벌호프 관리자</div>
        <nav>
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => (isActive ? 'active' : '')}>
              {link.label}
            </NavLink>
          ))}
          <button className="logout" onClick={handleLogout}>로그아웃</button>
        </nav>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
