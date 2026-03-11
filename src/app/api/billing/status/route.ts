import { NextResponse, type NextRequest } from 'next/server'

import { getAdminSessionFromCookieStore } from '@/lib/auth/admin-session'
import { resolveWeddingAccessForSession } from '@/lib/auth/admin-accounts'
import { getBillingAccessState } from '@/lib/billing/access'
import { createAdminClient } from '@/lib/supabase/admin'
import { createPublicClient } from '@/lib/supabase/public'
import { getActiveWeddingConfig } from '@/lib/supabase/repository'
import type { ApiResponse } from '@/types/api'

type BillingStatusResponse = {
  access: {
    requiresPayment: boolean
  }
}

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<BillingStatusResponse>>> {
  const session = getAdminSessionFromCookieStore(request.cookies)
  const supabase = createAdminClient() ?? createPublicClient()
  const access =
    session && session.weddingSource && session.weddingSourceId
      ? await resolveWeddingAccessForSession(session)
          .then((result) => result.billingAccess)
          .catch(async () => getBillingAccessState(supabase, await getActiveWeddingConfig(supabase)))
      : await getBillingAccessState(supabase, await getActiveWeddingConfig(supabase))

  return NextResponse.json(
    {
      success: true,
      data: {
        access: {
          requiresPayment: access.requiresPayment,
        },
      },
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  )
}
