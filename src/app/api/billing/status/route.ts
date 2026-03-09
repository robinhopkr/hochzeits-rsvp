import { NextResponse } from 'next/server'

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

export async function GET(): Promise<NextResponse<ApiResponse<BillingStatusResponse>>> {
  const supabase = createAdminClient() ?? createPublicClient()
  const config = await getActiveWeddingConfig(supabase)
  const access = await getBillingAccessState(supabase, config)

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
