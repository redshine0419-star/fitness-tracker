const TOKEN_KEY = 'gh_admin_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = {}
  if (body) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }
  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  const isJson = res.headers.get('content-type')?.includes('application/json')
  const data = isJson ? await res.json() : null
  if (!res.ok) {
    throw new Error(data?.error || `요청에 실패했습니다. (${res.status})`)
  }
  return data
}

export const api = {
  login: (username, password) => request('/auth/login', { method: 'POST', body: { username, password } }),
  changePassword: (currentPassword, newPassword) =>
    request('/auth/change-password', { method: 'POST', auth: true, body: { currentPassword, newPassword } }),
  me: () => request('/auth/me', { auth: true }),

  banners: {
    list: () => request('/banners'),
    listAdmin: () => request('/banners/admin', { auth: true }),
    create: (data) => request('/banners', { method: 'POST', auth: true, body: data }),
    update: (id, data) => request(`/banners/${id}`, { method: 'PUT', auth: true, body: data }),
    remove: (id) => request(`/banners/${id}`, { method: 'DELETE', auth: true }),
  },

  programs: {
    list: (category) => request(`/programs${category ? `?category=${encodeURIComponent(category)}` : ''}`),
    listAdmin: () => request('/programs/admin', { auth: true }),
    get: (id) => request(`/programs/${id}`),
    create: (data) => request('/programs', { method: 'POST', auth: true, body: data }),
    update: (id, data) => request(`/programs/${id}`, { method: 'PUT', auth: true, body: data }),
    remove: (id) => request(`/programs/${id}`, { method: 'DELETE', auth: true }),
  },

  news: {
    list: (category) => request(`/news${category ? `?category=${encodeURIComponent(category)}` : ''}`),
    listAdmin: () => request('/news/admin', { auth: true }),
    get: (id) => request(`/news/${id}`),
    create: (data) => request('/news', { method: 'POST', auth: true, body: data }),
    update: (id, data) => request(`/news/${id}`, { method: 'PUT', auth: true, body: data }),
    remove: (id) => request(`/news/${id}`, { method: 'DELETE', auth: true }),
  },

  inquiries: {
    submit: (data) => request('/inquiries', { method: 'POST', body: data }),
    list: () => request('/inquiries', { auth: true }),
    updateStatus: (id, status) => request(`/inquiries/${id}`, { method: 'PATCH', auth: true, body: { status } }),
    remove: (id) => request(`/inquiries/${id}`, { method: 'DELETE', auth: true }),
  },
}
