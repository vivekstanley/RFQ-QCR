import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { signup as signupRequest } from '../lib/api'
import { clearAuthSession, getStoredToken, getStoredUser, saveAuthSession } from '../lib/auth-storage'
import type { PublicUser, SignupRequest } from '../types/auth'

type AuthContextValue = {
  user: PublicUser | null
  token: string | null
  isAuthenticated: boolean
  signup: (data: SignupRequest) => Promise<PublicUser>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(() => getStoredUser())
  const [token, setToken] = useState<string | null>(() => getStoredToken())

  const signup = useCallback(async (data: SignupRequest) => {
    const response = await signupRequest(data)
    saveAuthSession(response.token, response.user)
    setToken(response.token)
    setUser(response.user)
    return response.user
  }, [])

  const logout = useCallback(() => {
    clearAuthSession()
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      signup,
      logout,
    }),
    [user, token, signup, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
