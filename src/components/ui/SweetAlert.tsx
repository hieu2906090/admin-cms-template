import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import Button from './Button'

const icons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
}

const styles = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
}

interface SweetAlertProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message?: string
  type?: keyof typeof icons
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  showCancel?: boolean
}

export default function SweetAlert({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  showCancel = false,
}: SweetAlertProps) {
  const IconComponent = icons[type]

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col items-center text-center">
                  {IconComponent && (
                    <IconComponent
                      className={`h-12 w-12 ${styles[type]} mb-4`}
                      aria-hidden="true"
                    />
                  )}
                  <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                    {title}
                  </Dialog.Title>
                  {message && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{message}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-center gap-3">
                  {showCancel && (
                    <Button variant="secondary" onClick={onClose}>
                      {cancelText}
                    </Button>
                  )}
                  <Button
                    variant={type === 'error' ? 'danger' : 'primary'}
                    onClick={() => {
                      onConfirm?.()
                      onClose()
                    }}
                  >
                    {confirmText}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 