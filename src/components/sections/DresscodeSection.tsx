import { Info, Shirt, Sparkles } from 'lucide-react'

import { DRESSCODE_COLOR_OPTIONS } from '@/lib/constants'
import type { SectionImage, WeddingConfig } from '@/types/wedding'

import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { SectionImageGallery } from './SectionImageGallery'

const defaultColors = ['pearl', 'champagner', 'sage', 'dusty-rose', 'navy']

function buildStyleCards(config: WeddingConfig) {
  return [
    {
      title: 'Für Damen',
      copy: config.dressCodeWomen,
      icon: Sparkles,
    },
    {
      title: 'Für Herren',
      copy: config.dressCodeMen,
      icon: Shirt,
    },
    {
      title: 'Zusätzlicher Hinweis',
      copy: config.dressCodeExtras,
      icon: Info,
    },
  ].filter((item) => item.copy)
}

export function DresscodeSection({
  config,
  images = [],
}: {
  config: WeddingConfig
  images?: SectionImage[]
}) {
  const selectedValues = config.dressCodeColors.length ? config.dressCodeColors : defaultColors
  const selectedColors = DRESSCODE_COLOR_OPTIONS.filter((color) => selectedValues.includes(color.value))
  const note =
    config.dressCode ??
    'Festlich und entspannt. Wenn ihr mögt, könnt ihr euch gern an unserer Farbpalette orientieren.'
  const styleCards = buildStyleCards(config)

  if (!note && !selectedColors.length && !styleCards.length) {
    return null
  }

  return (
    <Section density="compact" id="dresscode" className="space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <SectionHeading>Dresscode</SectionHeading>
          <p className="mt-4 text-body-md text-charcoal-600">{note}</p>
        </div>
        {selectedColors.length ? (
          <p className="text-eyebrow uppercase text-sage-600">
            Farbwelt für unseren Tag
          </p>
        ) : null}
      </div>
      <SectionImageGallery images={images} />

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card overflow-hidden px-6 py-6">
          <div className="flex flex-wrap gap-3">
            {selectedColors.map((color) => (
              <span
                key={color.value}
                aria-label={color.label}
                className="inline-flex h-10 w-10 rounded-full border border-white/90 shadow-sm ring-1 ring-cream-200"
                role="img"
                style={{ backgroundColor: color.hex }}
                title={color.label}
              />
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-charcoal-500">
            Wenn ihr mögt, könnt ihr euch locker an dieser Farbwelt orientieren.
          </p>
        </div>

        <div className="grid gap-4">
          {styleCards.length ? (
            styleCards.map((card) => (
              <article key={card.title} className="surface-card px-6 py-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream-100 text-gold-700">
                    <card.icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-card text-charcoal-900">{card.title}</h3>
                </div>
                <p className="mt-4 text-body-md text-charcoal-600">{card.copy}</p>
              </article>
            ))
          ) : (
            <article className="surface-card px-6 py-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream-100 text-gold-700">
                  <Sparkles className="h-4 w-4" />
                </span>
                <h3 className="font-display text-card text-charcoal-900">Stilgefühl statt Zwang</h3>
              </div>
              <p className="mt-4 text-body-md text-charcoal-600">
                Wichtig ist vor allem, dass ihr euch wohlfühlt und den Tag mit uns festlich feiern könnt.
              </p>
            </article>
          )}
        </div>
      </div>
    </Section>
  )
}
