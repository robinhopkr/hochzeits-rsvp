'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Section className="space-y-6 text-center">
      <SectionHeading as="h1">Etwas ist schiefgelaufen</SectionHeading>
      <p className="text-charcoal-600">
        Bitte lade die Seite erneut oder versuche es später noch einmal.
      </p>
      <div className="flex justify-center">
        <Button onClick={reset}>Erneut versuchen</Button>
      </div>
    </Section>
  )
}
