import { NextResponse, type NextRequest } from 'next/server'

import { getAdminSessionFromCookieStore } from '@/lib/auth/admin-session'
import { createClient } from '@/lib/supabase/server'
import { getAdminWeddingConfig, listRsvps } from '@/lib/supabase/repository'
import type { ApiResponse } from '@/types/api'
import type { RsvpRecord } from '@/types/wedding'

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<RsvpRecord[]>>> {
  const session = getAdminSessionFromCookieStore(request.cookies)

  if (!session) {
    return NextResponse.json(
      {
        success: false,
        error: 'Nicht autorisiert.',
        code: 'UNAUTHORIZED',
      },
      { status: 401 },
    )
  }

  const supabase = await createClient()
  const config = await getAdminWeddingConfig(supabase, undefined)
  const rsvps = await listRsvps(supabase, config)

  return NextResponse.json({
    success: true,
    data: rsvps,
  })
}
