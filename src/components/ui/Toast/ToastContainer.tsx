import { Fragment, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import ToastProgress from './ToastProgress'

const icons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationCircleIcon,
  info: InformationCircleIcon,
}

const styles = {
  success: 'bg-white border-green-500 text-green-800',
  error: 'bg-white border-red-500 text-red-800',
  warning: 'bg-white border-yellow-500 text-yellow-800',
  info: 'bg-white border-blue-500 text-blue-800',
}

const iconStyles = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
}

interface Toast {
  id: string
  title: string
  message?: string
  type: keyof typeof icons
}

interface ToastContainerProps {
  toasts: Toast[]
  setToasts: React.Dispatch<React.SetStateAction<Toast[]>>
}

const TOAST_DURATION = 5000 // 5 seconds

export default function ToastContainer({ toasts, setToasts }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-4 min-w-[320px] max-w-[420px]">
      {toasts.map((toast) => {
        const IconComponent = icons[toast.type]
        return (
          <Transition
            key={toast.id}
            show={true}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div 
              className={`
                ${styles[toast.type]} 
                rounded-lg border-l-4 p-4 shadow-lg
                backdrop-blur-sm bg-opacity-95
                relative
              `}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {IconComponent && (
                    <IconComponent 
                      className={`h-5 w-5 ${iconStyles[toast.type]}`} 
                      aria-hidden="true" 
                    />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">{toast.title}</p>
                  {toast.message && (
                    <p className="mt-1 text-sm opacity-90">{toast.message}</p>
                  )}
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className={`
                      inline-flex rounded-md p-1.5
                      opacity-60 hover:opacity-100
                      focus:outline-none focus:ring-2 focus:ring-offset-2
                      ${iconStyles[toast.type]}
                    `}
                    onClick={() => {
                      setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <ToastProgress 
                type={toast.type} 
                onComplete={() => {
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                }}
                duration={TOAST_DURATION}
              />
            </div>
          </Transition>
        )
      })}
    </div>
  )
} 