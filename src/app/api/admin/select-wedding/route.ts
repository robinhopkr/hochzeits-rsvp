import { NextResponse, type NextRequest } from 'next/server'

import { selectPlannerWedding } from '@/lib/auth/admin-accounts'
import {
  ADMIN_SESSION_COOKIE,
  getAdminSessionCookieOptions,
  getAdminSessionFromCookieStore,
} from '@/lib/auth/admin-session'
import { plannerWeddingSelectionSchema } from '@/lib/validations/admin-registration.schema'
import type { ApiResponse } from '@/types/api'

type PlannerSelectionResponse = {
  nextUrl: string
  selected: true
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<PlannerSelectionResponse>>> {
  const session = getAdminSessionFromCookieStore(request.cookies)

  if (!session || session.role !== 'planner') {
    return NextResponse.json(
      {
        success: false,
        error: 'Nicht autorisiert.',
        code: 'UNAUTHORIZED',
      },
      { status: 401 },
    )
  }

  const rawBody: unknown = await request.json().catch(() => null)
  const parseResult = plannerWeddingSelectionSchema.safeParse(rawBody)

  if (!parseResult.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Bitte wähle eine gültige Hochzeit aus.',
        code: 'VALIDATION_ERROR',
        details: parseResult.error.flatten(),
      },
      { status: 422 },
    )
  }

  try {
    const result = await selectPlannerWedding(session, parseResult.data)
    const response = NextResponse.json<ApiResponse<PlannerSelectionResponse>>({
      success: true,
      data: {
        nextUrl: result.nextUrl,
        selected: true,
      },
    })

    response.cookies.set(ADMIN_SESSION_COOKIE, result.sessionToken, getAdminSessionCookieOptions())
    return response
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Die Hochzeit konnte nicht ausgewählt werden.',
        code: 'SELECTION_FAILED',
      },
      { status: 400 },
    )
  }
}
