import { cn } from '@/lib/utils/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'attending' | 'declined' | 'neutral'
}

const badgeVariantClasses = {
  attending: 'bg-sage-100 text-sage-700',
  declined: 'bg-dusty-rose-100 text-dusty-rose-700',
  neutral: 'bg-cream-100 text-charcoal-700',
} as const

export function Badge({ children, variant = 'neutral' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]',
        badgeVariantClasses[variant],
      )}
    >
      {children}
    </span>
  )
}
