import { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { useRouter } from 'next/router'
import { app } from '@/services/firebase'

interface AuthContextType {
  user: User | null
  loading: boolean
  initialized: boolean
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  initialized: false
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const router = useRouter()
  const auth = getAuth(app)

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('auth_token')
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // Verify token is still valid
          await user.getIdToken(true)
          setUser(user)
        } else {
          setUser(null)
          localStorage.removeItem('auth_token')
          if (!router.pathname.startsWith('/login')) {
            router.replace('/login')
          }
        }
      } catch (error) {
        console.error('Auth verification failed:', error)
        setUser(null)
        localStorage.removeItem('auth_token')
        router.replace('/login')
      } finally {
        setLoading(false)
        setInitialized(true)
      }
    })

    // If no stored token and not on login page, redirect immediately
    if (!token && !router.pathname.startsWith('/login')) {
      router.replace('/login')
    }

    return () => unsubscribe()
  }, [auth, router])

  return (
    <AuthContext.Provider value={{ user, loading, initialized }}>
      {initialized ? children : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
        </div>
      )}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 