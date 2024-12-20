import { cva, type VariantProps } from 'class-variance-authority'
import { XMarkIcon } from '@heroicons/react/20/solid'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'

const alertVariants = cva(
  'rounded-md p-4',
  {
    variants: {
      variant: {
        info: 'bg-blue-50 text-blue-700',
        success: 'bg-green-50 text-green-700',
        warning: 'bg-yellow-50 text-yellow-700',
        error: 'bg-red-50 text-red-700',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
)

const icons = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: XCircleIcon,
}

interface AlertProps extends VariantProps<typeof alertVariants> {
  title: string
  message?: string
  onClose?: () => void
}

export default function Alert({ title, message, variant = 'info', onClose }: AlertProps) {
  const Icon = icons[variant || 'info']

  return (
    <div className={alertVariants({ variant })}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium">{title}</h3>
          {message && <div className="mt-2 text-sm">{message}</div>}
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={`
                  inline-flex rounded-md p-1.5
                  ${variant === 'info' && 'hover:bg-blue-100 focus:ring-blue-600'}
                  ${variant === 'success' && 'hover:bg-green-100 focus:ring-green-600'}
                  ${variant === 'warning' && 'hover:bg-yellow-100 focus:ring-yellow-600'}
                  ${variant === 'error' && 'hover:bg-red-100 focus:ring-red-600'}
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                `}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 