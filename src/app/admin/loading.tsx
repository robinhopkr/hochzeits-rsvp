import { Section } from '@/components/ui/Section'
import { Skeleton } from '@/components/ui/Skeleton'

export default function AdminLoading() {
  return (
    <Section className="space-y-4">
      <Skeleton className="h-12 w-64" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={`admin-skeleton-${index}`} className="h-32 w-full" />
        ))}
      </div>
      <Skeleton className="h-72 w-full" />
    </Section>
  )
}
