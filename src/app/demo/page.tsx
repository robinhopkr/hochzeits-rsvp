import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { CountdownSection } from '@/components/sections/CountdownSection'
import { DresscodeSection } from '@/components/sections/DresscodeSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { HeroSection } from '@/components/sections/HeroSection'
import { LocationSection } from '@/components/sections/LocationSection'
import { ProgramSection } from '@/components/sections/ProgramSection'
import { RsvpSection } from '@/components/sections/RsvpSection'
import { DEMO_NAV_ITEMS } from '@/lib/constants'
import { createClient } from '@/lib/supabase/server'
import {
  getActiveWeddingConfig,
  getFaqItems,
  getProgramItems,
  listGalleryPhotos,
} from '@/lib/supabase/repository'

export default async function DemoPage() {
  const supabase = await createClient()
  const config = await getActiveWeddingConfig(supabase)
  const [programItems, faqItems, galleryPhotos] = await Promise.all([
    getProgramItems(supabase, config),
    getFaqItems(supabase, config),
    listGalleryPhotos(supabase, config),
  ])

  return (
    <main className="min-h-screen bg-cream-50">
      <Header
        brandLabel="NiiRo Demo"
        navItems={DEMO_NAV_ITEMS}
        brandHref="/"
        ctaHref="/admin/login"
        ctaLabel="Login für Brautpaare"
      />
      <HeroSection config={config} />
      <CountdownSection config={config} />
      <ProgramSection
        items={programItems}
        images={config.sectionImages.filter((image) => image.section === 'programm')}
      />
      <LocationSection
        config={config}
        images={config.sectionImages.filter((image) => image.section === 'anfahrt')}
      />
      <DresscodeSection
        config={config}
        images={config.sectionImages.filter((image) => image.section === 'dresscode')}
      />
      <GallerySection
        config={config}
        photos={galleryPhotos}
        images={config.sectionImages.filter((image) => image.section === 'galerie')}
      />
      <RsvpSection
        config={config}
        images={config.sectionImages.filter((image) => image.section === 'rsvp')}
      />
      <FaqSection
        items={faqItems}
        images={config.sectionImages.filter((image) => image.section === 'faq')}
      />
      <Footer coupleLabel={config.coupleLabel} />
    </main>
  )
}
