import { Check } from 'lucide-react'

import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

const benefits = [
  'Weniger Rückfragen zu Ort, Ablauf und Dresscode',
  'Keine verstreuten RSVPs über WhatsApp, E-Mail und Telefon',
  'Leicht verständlich für mobile Gäste und weniger technikaffine Familienmitglieder',
  'Klare Übersicht über Zusagen, Absagen und die Gesamtzahl der Gäste',
  'Ein professioneller Gesamtauftritt statt vieler einzelner Tools',
  'Ein später anschließbarer Galerie-Bereich für Erinnerungen nach der Feier',
] as const

export function BenefitsSection() {
  return (
    <Section id="vorteile" className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="space-y-5">
        <SectionHeading>Warum Brautpaare damit entspannter planen</SectionHeading>
        <p className="text-lg leading-8 text-charcoal-600">
          Die App ist kein überladenes Wedding-Portal. Sie konzentriert sich auf die
          Punkte, die bei Einladungen, Rückmeldungen und späteren Fotos schnell unübersichtlich werden.
        </p>
      </div>
      <div className="surface-card px-6 py-6 sm:px-8">
        <ul className="space-y-4">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3 text-charcoal-700">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                <Check className="h-4 w-4" />
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
