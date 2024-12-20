import { createContext, useContext, useState, ReactNode } from 'react'
import ToastContainer from '@/components/ui/Toast/ToastContainer'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  title: string
  message?: string
  type: ToastType
}

interface ToastContextType {
  showToast: (title: string, message?: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (title: string, message?: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, message, type }])

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 5000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} setToasts={setToasts} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
} 