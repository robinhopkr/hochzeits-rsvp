import { notFound, redirect } from 'next/navigation'

import { WeddingInvitationPage } from '@/components/pages/WeddingInvitationPage'
import { DEMO_GUEST_CODE } from '@/lib/demo-wedding'
import { createClient } from '@/lib/supabase/server'
import {
  getFaqItems,
  getMusicWishlistData,
  getProgramItems,
  getSeatingPlanData,
  getWeddingConfigByGuestCode,
  listGalleryPhotos,
} from '@/lib/supabase/repository'

interface PersonalizedInvitationPageProps {
  params: Promise<{
    guestCode: string
  }>
}

export default async function PersonalizedInvitationPage({
  params,
}: PersonalizedInvitationPageProps) {
  const resolvedParams = await params
  const normalizedGuestCode = resolvedParams.guestCode.trim().toUpperCase()

  if (!normalizedGuestCode) {
    notFound()
  }

  if (normalizedGuestCode === DEMO_GUEST_CODE) {
    redirect('/demo')
  }

  const supabase = await createClient()
  const config = await getWeddingConfigByGuestCode(supabase, normalizedGuestCode)

  if (!config) {
    notFound()
  }

  const [programItems, faqItems, galleryPhotos, seatingPlanData, musicWishlistData] = await Promise.all([
    getProgramItems(supabase, config),
    getFaqItems(supabase, config),
    listGalleryPhotos(supabase, config),
    getSeatingPlanData(supabase, config),
    getMusicWishlistData(supabase, config),
  ])

  return (
    <WeddingInvitationPage
      config={config}
      faqItems={faqItems}
      galleryPhotos={galleryPhotos}
      musicWishlistData={musicWishlistData}
      mode="live"
      programItems={programItems}
      seatingPlanData={seatingPlanData}
    />
  )
}
