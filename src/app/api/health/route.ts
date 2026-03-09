import { NextResponse } from 'next/server'

import { createPublicClient } from '@/lib/supabase/public'
import { getActiveWeddingConfig, listRsvps } from '@/lib/supabase/repository'

export async function GET() {
  try {
    const supabase = createPublicClient()
    const config = await getActiveWeddingConfig(supabase)
    const rsvps = await listRsvps(supabase, config)

    return NextResponse.json({
      success: true,
      data: {
        status: 'ok',
        source: config.source,
        hasActiveWedding: Boolean(config.sourceId),
        rsvpCount: rsvps.length,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Health-Check fehlgeschlagen.',
      },
      { status: 500 },
    )
  }
}
