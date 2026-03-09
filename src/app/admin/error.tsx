'use client'

import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <Section className="space-y-6">
      <SectionHeading as="h1">Admin-Bereich konnte nicht geladen werden</SectionHeading>
      <p className="text-charcoal-600">
        Bitte versuche es erneut oder melde dich später noch einmal an.
      </p>
      <Button onClick={reset}>Erneut versuchen</Button>
    </Section>
  )
}
