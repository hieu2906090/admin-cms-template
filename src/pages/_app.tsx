import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Meta from '@/components/common/Meta'
import { ToastProvider } from '@/components/ui/Toast/ToastContext'
import { AuthProvider } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <Meta />
          <main className={inter.className}>
            {router.pathname === '/login' ? (
              <Component {...pageProps} />
            ) : (
              <ProtectedRoute>
                <Component {...pageProps} />
              </ProtectedRoute>
            )}
          </main>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
} 