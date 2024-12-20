import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Meta from '@/components/common/Meta'
import { ToastProvider } from '@/components/ui/Toast/ToastContext'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Meta />
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </ToastProvider>
  )
} 