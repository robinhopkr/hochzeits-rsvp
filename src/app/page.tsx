import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { BenefitsSection } from '@/components/sections/BenefitsSection'
import { DemoTeaserSection } from '@/components/sections/DemoTeaserSection'
import { FeatureGridSection } from '@/components/sections/FeatureGridSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { ProductCtaSection } from '@/components/sections/ProductCtaSection'
import { ProductHeroSection } from '@/components/sections/ProductHeroSection'
import { getBillingPricing } from '@/lib/billing/constants'
import { APP_BRAND_NAME, MARKETING_NAV_ITEMS } from '@/lib/constants'

export const revalidate = 3600

export default function HomePage() {
  const pricing = getBillingPricing()

  return (
    <main className="min-h-screen bg-cream-50">
      <Header
        brandLabel={APP_BRAND_NAME}
        navItems={MARKETING_NAV_ITEMS}
        ctaHref="/admin/registrieren?role=couple"
        ctaLabel={
          pricing.promoActive
            ? `Für ${pricing.activePriceLabel} starten`
            : `Für ${pricing.activePriceLabel} kaufen`
        }
        showBrandMark
      />
      <ProductHeroSection />
      <FeatureGridSection />
      <HowItWorksSection />
      <BenefitsSection />
      <DemoTeaserSection />
      <ProductCtaSection />
      <Footer coupleLabel={APP_BRAND_NAME} />
    </main>
  )
}
