import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { WeddingConfig } from '@/types/wedding'

import { CountdownTimer } from './CountdownTimer'

export function CountdownSection({ config }: { config: WeddingConfig }) {
  return (
    <Section density="compact" className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
      <div className="max-w-xl space-y-4">
        <SectionHeading>Bis wir mit euch feiern</SectionHeading>
        <p className="text-charcoal-600">
          Hier seht ihr, wie lange es noch bis zu unserem Hochzeitstag ist. Alle wichtigen Infos
          für Anreise, Dresscode und Rückmeldung findet ihr direkt darunter.
        </p>
      </div>
      <CountdownTimer targetDate={config.weddingDate} />
    </Section>
  )
}
