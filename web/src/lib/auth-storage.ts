import type { PublicUser } from '../types/auth'

const TOKEN_KEY = 'rfq-qcr-token'
const USER_KEY = 'rfq-qcr-user'

function clearFromStorage(storage: Storage): void {
  storage.removeItem(TOKEN_KEY)
  storage.removeItem(USER_KEY)
}

export function saveAuthSession(
  token: string,
  user: PublicUser,
  options?: { remember?: boolean },
): void {
  const remember = options?.remember ?? true
  const storage = remember ? localStorage : sessionStorage
  const otherStorage = remember ? sessionStorage : localStorage

  clearFromStorage(otherStorage)
  storage.setItem(TOKEN_KEY, token)
  storage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearAuthSession(): void {
  clearFromStorage(localStorage)
  clearFromStorage(sessionStorage)
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY)
}

export function getStoredUser(): PublicUser | null {
  const raw = localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as PublicUser
  } catch {
    clearAuthSession()
    return null
  }
}
