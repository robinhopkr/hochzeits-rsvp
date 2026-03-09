import { cn } from '@/lib/utils/cn'

interface SectionProps {
  children: React.ReactNode
  id?: string
  className?: string
  density?: 'default' | 'compact'
  'aria-labelledby'?: string
}

export function Section({ children, className, density = 'default', id, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'mx-auto w-full max-w-6xl px-6 sm:px-10',
        density === 'compact' ? 'py-[clamp(3rem,5vw,4.75rem)]' : 'py-section',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}
