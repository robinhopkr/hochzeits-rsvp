import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

const steps = [
  {
    number: '01',
    title: 'Hochzeit einrichten',
    copy: 'Brautpaar-Konto registrieren, die Hochzeit einmalig per Stripe freischalten und danach Brautpaarname, Datum, Ort, Rückmeldefrist und Texte festlegen.',
  },
  {
    number: '02',
    title: 'Gäste antworten online',
    copy: 'Gäste öffnen die Einladung auf dem Handy oder Desktop und geben ihre Rückmeldung in wenigen verständlichen Schritten ab.',
  },
  {
    number: '03',
    title: 'Im Paarbereich alles im Blick',
    copy: 'Zusagen, Absagen, Begleitpersonen, Texte, Galerie-Link und Fotografen-Zugang bleiben gesammelt an einem Ort.',
  },
] as const

export function HowItWorksSection() {
  return (
    <Section id="ablauf" className="space-y-8">
      <SectionHeading>So läuft es für Brautpaare ab</SectionHeading>
      <div className="grid gap-4 lg:grid-cols-3">
        {steps.map((step) => (
          <article key={step.number} className="surface-card px-6 py-6">
            <p className="text-sm uppercase tracking-[0.26em] text-gold-600">{step.number}</p>
            <h3 className="mt-4 font-display text-card text-charcoal-900">{step.title}</h3>
            <p className="mt-3 text-charcoal-600">{step.copy}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
