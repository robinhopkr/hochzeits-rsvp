import { cn } from '@/lib/utils/cn'

interface SectionHeadingProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
  decorativeLine?: boolean
  id?: string
}

export function SectionHeading({
  children,
  as: Tag = 'h2',
  className,
  decorativeLine = true,
  id,
}: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      <Tag id={id} className={cn('font-display text-section text-charcoal-900', className)}>
        {children}
      </Tag>
      {decorativeLine ? <div className="wedding-divider h-px w-24" /> : null}
    </div>
  )
}
