import Link from 'next/link'

import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export default function NotFound() {
  return (
    <Section className="space-y-6 text-center">
      <SectionHeading as="h1">Seite nicht gefunden</SectionHeading>
      <p className="text-charcoal-600">
        Diese Seite existiert nicht oder wurde verschoben.
      </p>
      <div>
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-gold-500 px-6 py-3 font-semibold text-charcoal-900 shadow-gold transition hover:bg-gold-400"
          href="/"
        >
          Zur Startseite
        </Link>
      </div>
    </Section>
  )
}
