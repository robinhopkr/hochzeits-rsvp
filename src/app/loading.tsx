import { Section } from '@/components/ui/Section'
import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <Section className="space-y-6">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-40 w-full" />
    </Section>
  )
}
