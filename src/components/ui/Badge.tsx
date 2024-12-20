import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset',
  {
    variants: {
      variant: {
        default: 'bg-gray-50 text-gray-600 ring-gray-500/10',
        primary: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
        success: 'bg-green-50 text-green-700 ring-green-600/20',
        warning: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
        danger: 'bg-red-50 text-red-700 ring-red-600/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode
  className?: string
}

export default function Badge({ children, variant, className }: BadgeProps) {
  return (
    <span className={badgeVariants({ variant, className })}>
      {children}
    </span>
  )
} 