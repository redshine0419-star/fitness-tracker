import { mock } from './mockApi.js'

const TOKEN_KEY = 'gh_admin_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

// Thrown when the /api/* backend isn't actually reachable (network failure,
// or a static-only deployment where /api/* falls through to the SPA's own
// index.html). Callers use it to fall back to the client-only demo data in
// mockApi.js instead of surfacing a confusing error.
class NoBackendError extends Error {}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = {}
  if (body) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }
  let res
  try {
    res = await fetch(`/api${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new NoBackendError('network unreachable')
  }
  const isJson = res.headers.get('content-type')?.includes('application/json')
  if (!isJson) {
    throw new NoBackendError('non-json response')
  }
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data?.error || `요청에 실패했습니다. (${res.status})`)
  }
  return data
}

async function withDemoFallback(realCall, mockCall) {
  try {
    return await realCall()
  } catch (err) {
    if (err instanceof NoBackendError) {
      return mockCall()
    }
    throw err
  }
}

export const api = {
  login: (username, password) =>
    withDemoFallback(
      () => request('/auth/login', { method: 'POST', body: { username, password } }),
      () => mock.login(username, password)
    ),
  changePassword: (currentPassword, newPassword) =>
    withDemoFallback(
      () => request('/auth/change-password', { method: 'POST', auth: true, body: { currentPassword, newPassword } }),
      () => mock.changePassword(currentPassword, newPassword)
    ),
  me: () => withDemoFallback(() => request('/auth/me', { auth: true }), () => mock.me()),

  banners: {
    list: () => withDemoFallback(() => request('/banners'), () => mock.banners.list()),
    listAdmin: () => withDemoFallback(() => request('/banners/admin', { auth: true }), () => mock.banners.listAdmin()),
    create: (data) =>
      withDemoFallback(() => request('/banners', { method: 'POST', auth: true, body: data }), () => mock.banners.create(data)),
    update: (id, data) =>
      withDemoFallback(() => request(`/banners/${id}`, { method: 'PUT', auth: true, body: data }), () => mock.banners.update(id, data)),
    remove: (id) => withDemoFallback(() => request(`/banners/${id}`, { method: 'DELETE', auth: true }), () => mock.banners.remove(id)),
  },

  programs: {
    list: (category) =>
      withDemoFallback(
        () => request(`/programs${category ? `?category=${encodeURIComponent(category)}` : ''}`),
        () => mock.programs.list(category)
      ),
    listAdmin: () => withDemoFallback(() => request('/programs/admin', { auth: true }), () => mock.programs.listAdmin()),
    get: (id) => withDemoFallback(() => request(`/programs/${id}`), () => mock.programs.get(id)),
    create: (data) =>
      withDemoFallback(() => request('/programs', { method: 'POST', auth: true, body: data }), () => mock.programs.create(data)),
    update: (id, data) =>
      withDemoFallback(() => request(`/programs/${id}`, { method: 'PUT', auth: true, body: data }), () => mock.programs.update(id, data)),
    remove: (id) => withDemoFallback(() => request(`/programs/${id}`, { method: 'DELETE', auth: true }), () => mock.programs.remove(id)),
  },

  news: {
    list: (category) =>
      withDemoFallback(
        () => request(`/news${category ? `?category=${encodeURIComponent(category)}` : ''}`),
        () => mock.news.list(category)
      ),
    listAdmin: () => withDemoFallback(() => request('/news/admin', { auth: true }), () => mock.news.listAdmin()),
    get: (id) => withDemoFallback(() => request(`/news/${id}`), () => mock.news.get(id)),
    create: (data) =>
      withDemoFallback(() => request('/news', { method: 'POST', auth: true, body: data }), () => mock.news.create(data)),
    update: (id, data) =>
      withDemoFallback(() => request(`/news/${id}`, { method: 'PUT', auth: true, body: data }), () => mock.news.update(id, data)),
    remove: (id) => withDemoFallback(() => request(`/news/${id}`, { method: 'DELETE', auth: true }), () => mock.news.remove(id)),
  },

  inquiries: {
    submit: (data) => withDemoFallback(() => request('/inquiries', { method: 'POST', body: data }), () => mock.inquiries.submit(data)),
    list: () => withDemoFallback(() => request('/inquiries', { auth: true }), () => mock.inquiries.list()),
    updateStatus: (id, status) =>
      withDemoFallback(
        () => request(`/inquiries/${id}`, { method: 'PATCH', auth: true, body: { status } }),
        () => mock.inquiries.updateStatus(id, status)
      ),
    remove: (id) => withDemoFallback(() => request(`/inquiries/${id}`, { method: 'DELETE', auth: true }), () => mock.inquiries.remove(id)),
  },
}
