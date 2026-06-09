'use client'
import { createContext, useContext, useState } from 'react'

const PRIVATE_PASSWORD = 'portfolio2025'

interface AuthCtx {
  isAuth: boolean
  login: (pw: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthCtx>({
  isAuth: false,
  login: () => false,
  logout: () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(
    () => typeof window !== 'undefined' && sessionStorage.getItem('__pauth') === '1'
  )

  const login = (pw: string) => {
    if (pw === PRIVATE_PASSWORD) {
      sessionStorage.setItem('__pauth', '1')
      setIsAuth(true)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem('__pauth')
    setIsAuth(false)
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
