import Link from 'next/link'

import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function DemoTeaserSection() {
  return (
    <Section id="demo" className="space-y-8">
      <SectionHeading>So wirkt die App bei euren Gästen</SectionHeading>
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-5">
          <p className="text-lg leading-8 text-charcoal-600">
            In der Demo erlebt ihr den vollständigen Ablauf aus Gästesicht:
            Begrüßung, Countdown, Tagesablauf, Anfahrt, Galerie-Hinweis, FAQ und das echte RSVP-Formular.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-base font-semibold text-charcoal-900 shadow-gold transition hover:bg-gold-400"
              href="/demo"
            >
              Demo erleben
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-gold-300 bg-white px-6 py-3 text-base font-semibold text-charcoal-800 transition hover:border-gold-500"
              href="/admin/login"
            >
              Paarbereich öffnen
            </Link>
          </div>
        </div>

        <div className="surface-card overflow-hidden">
          <div className="grid gap-px bg-cream-200 sm:grid-cols-2">
            <div className="bg-white px-6 py-6">
              <p className="text-sm uppercase tracking-[0.2em] text-sage-600">Gastseite</p>
              <p className="mt-3 font-display text-2xl text-charcoal-900">Alles an einem Ort</p>
              <p className="mt-3 text-charcoal-600">
                Datum, Ort, Anfahrt, FAQ, Galerie und ein klares Formular ohne Umwege.
              </p>
            </div>
            <div className="bg-cream-50 px-6 py-6">
              <p className="text-sm uppercase tracking-[0.2em] text-gold-600">Brautpaar</p>
              <p className="mt-3 font-display text-2xl text-charcoal-900">Antworten im Blick</p>
              <p className="mt-3 text-charcoal-600">
                Statt einzelner Nachrichten gibt es eine saubere Übersicht mit Export und zentralen Zugängen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
