import { cn } from '@/lib/utils/cn'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-shimmer rounded-3xl bg-gradient-to-r from-cream-100 via-white to-cream-100 bg-[length:200%_100%]',
        className,
      )}
    />
  )
}
