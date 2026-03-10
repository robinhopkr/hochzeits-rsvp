import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

import { requirePaidAdminSession } from '@/lib/auth/require-paid-admin-session'
import { createAdminClient } from '@/lib/supabase/admin'
import { createPublicClient } from '@/lib/supabase/public'
import { getAdminWeddingConfig, savePhotographerPassword } from '@/lib/supabase/repository'
import type { ApiResponse } from '@/types/api'

const photographerPasswordSchema = z.object({
  password: z.string().trim().min(1, 'Bitte gib ein Passwort ein.').max(200),
})

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<null>>> {
  const access = await requirePaidAdminSession(request)

  if (!access.ok) {
    return access.response
  }

  const rawBody: unknown = await request.json().catch(() => null)
  const parseResult = photographerPasswordSchema.safeParse(rawBody)

  if (!parseResult.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Bitte gib ein gültiges Passwort ein.',
        code: 'VALIDATION_ERROR',
        details: parseResult.error.flatten(),
      },
      { status: 422 },
    )
  }

  const supabase = createAdminClient() ?? createPublicClient()
  const config = await getAdminWeddingConfig(supabase, undefined)

  try {
    await savePhotographerPassword(supabase, config, parseResult.data.password)

    return NextResponse.json({
      success: true,
      data: null,
      message: 'Das Fotografen-Passwort wurde gespeichert.',
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Das Fotografen-Passwort konnte nicht gespeichert werden.',
        code: 'SAVE_FAILED',
      },
      { status: 500 },
    )
  }
}
