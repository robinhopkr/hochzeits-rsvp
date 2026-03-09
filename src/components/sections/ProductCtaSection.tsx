import Link from 'next/link'

import { Section } from '@/components/ui/Section'

export function ProductCtaSection() {
  return (
    <Section className="pb-24">
      <div className="rounded-[2rem] bg-charcoal-900 px-6 py-10 text-center text-white shadow-elegant sm:px-10">
        <p className="text-sm uppercase tracking-[0.26em] text-gold-300">Bereit für den nächsten Schritt?</p>
        <h2 className="mt-4 font-display text-section">
          Wenn ihr möchtet, ist die App bereit für eure echte Hochzeit.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-cream-100/85">
          Ihr könnt die Demo zeigen, den Paarbereich prüfen und danach eure echten
          Hochzeitsdaten, Texte und Zugänge pflegen.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold-500 px-6 py-3 font-semibold text-charcoal-900 shadow-gold transition hover:bg-gold-400"
            href="/demo"
          >
            Demo öffnen
          </Link>
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            href="/admin/login"
          >
            Admin-Login
          </Link>
        </div>
      </div>
    </Section>
  )
}
