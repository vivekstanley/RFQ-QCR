import type { PublicUser } from '../types/auth'

const TOKEN_KEY = 'rfq-qcr-token'
const USER_KEY = 'rfq-qcr-user'

export function saveAuthSession(token: string, user: PublicUser): void {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearAuthSession(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function getStoredUser(): PublicUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as PublicUser
  } catch {
    clearAuthSession()
    return null
  }
}
