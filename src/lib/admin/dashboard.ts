import { cache } from 'react'
import { redirect } from 'next/navigation'

import { getServerSession } from '@/lib/auth/get-session'
import { getBillingAccessState } from '@/lib/billing/access'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { getAdminWeddingConfig } from '@/lib/supabase/repository'
import { buildInvitationPath, buildInvitationUrl } from '@/lib/urls'

export const getProtectedAdminContext = cache(async () => {
  const user = await getServerSession()
  const supabase = createAdminClient() ?? (await createClient())
  const config = await getAdminWeddingConfig(supabase, undefined)
  const billingAccess = await getBillingAccessState(supabase, config)

  if (!user || billingAccess.requiresPayment) {
    redirect('/admin/login')
  }

  return {
    user,
    supabase,
    config,
    guestInviteHref: buildInvitationPath(config.guestCode),
    guestInviteUrl: buildInvitationUrl(config.guestCode),
    galleryHref: config.guestCode ? `/galerie/${config.guestCode}` : null,
    photographerHref: config.guestCode && config.photoPassword ? `/fotograf/${config.guestCode}` : null,
  }
})
