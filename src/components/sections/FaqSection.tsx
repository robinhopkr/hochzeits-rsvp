import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { FaqItem, SectionImage } from '@/types/wedding'

import { FaqAccordion } from './FaqAccordion'
import { SectionImageGallery } from './SectionImageGallery'

export function FaqSection({ items, images = [] }: { items: FaqItem[]; images?: SectionImage[] }) {
  if (!items.length) {
    return null
  }

  return (
    <Section density="compact" id="faq" className="max-w-4xl space-y-6">
      <SectionHeading>Gut zu wissen</SectionHeading>
      <SectionImageGallery images={images} className="xl:grid-cols-2" />
      <FaqAccordion items={items} />
    </Section>
  )
}
