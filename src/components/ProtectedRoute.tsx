import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import { ErrorBoundary } from './ErrorBoundary'
import { getAuth } from 'firebase/auth'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, initialized } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<Error | null>(null)
  const auth = getAuth()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!user && router.pathname !== '/login') {
          await router.replace('/login')
          return
        }

        // Verify token if user exists
        if (user) {
          try {
            await user.getIdToken(true)
          } catch (tokenError) {
            console.error('Token verification failed:', tokenError)
            await auth.signOut()
            localStorage.removeItem('auth_token')
            await router.replace('/login')
          }
        }
      } catch (e) {
        console.error('Auth check failed:', e)
        setError(e as Error)
        await router.replace('/login')
      }
    }

    if (initialized && !loading) {
      checkAuth()
    }
  }, [user, loading, initialized, router, auth])

  // Show loading state while initializing
  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    )
  }

  // Handle errors
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
          <p className="text-gray-600 mb-4">Please log in again to continue.</p>
          <button
            onClick={() => router.replace('/login')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return <ErrorBoundary>{children}</ErrorBoundary>
} 