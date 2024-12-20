import { cva, type VariantProps } from 'class-variance-authority'

const spinnerVariants = cva(
  'animate-spin rounded-full border-b-2',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
      },
      variant: {
        default: 'border-gray-900',
        primary: 'border-indigo-600',
        white: 'border-white',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
)

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string
}

export default function Spinner({ size, variant, className }: SpinnerProps) {
  return (
    <div className={spinnerVariants({ size, variant, className })} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  )
} 