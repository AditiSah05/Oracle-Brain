/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const AUTH_KEY = 'doctoroncall-auth'

function loadAuthState() {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    if (!raw) return { isLoggedIn: false, role: null, email: '' }
    const parsed = JSON.parse(raw)
    if (!parsed?.isLoggedIn) return { isLoggedIn: false, role: null, email: '' }
    return {
      isLoggedIn: true,
      role: parsed.role === 'doctor' ? 'doctor' : 'patient',
      email: parsed.email || '',
    }
  } catch {
    return { isLoggedIn: false, role: null, email: '' }
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(loadAuthState)

  function signIn({ email, role }) {
    const next = {
      isLoggedIn: true,
      role: role === 'doctor' ? 'doctor' : 'patient',
      email,
    }
    setAuth(next)
    localStorage.setItem(AUTH_KEY, JSON.stringify(next))
  }

  function signOut() {
    const next = { isLoggedIn: false, role: null, email: '' }
    setAuth(next)
    localStorage.removeItem(AUTH_KEY)
  }

  const value = useMemo(
    () => ({
      auth,
      signIn,
      signOut,
    }),
    [auth],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
