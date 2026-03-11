import { NextResponse, type NextRequest } from 'next/server'

import { registerPlannerAdmin } from '@/lib/auth/admin-accounts'
import { ADMIN_SESSION_COOKIE, getAdminSessionCookieOptions } from '@/lib/auth/admin-session'
import { plannerRegistrationSchema } from '@/lib/validations/admin-registration.schema'
import type { ApiResponse } from '@/types/api'

type PlannerRegistrationResponse = {
  customerNumber: string
  nextUrl: string
  registered: true
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<PlannerRegistrationResponse>>> {
  const rawBody: unknown = await request.json().catch(() => null)
  const parseResult = plannerRegistrationSchema.safeParse(rawBody)

  if (!parseResult.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Bitte prüfe deine Angaben.',
        code: 'VALIDATION_ERROR',
        details: parseResult.error.flatten(),
      },
      { status: 422 },
    )
  }

  try {
    const result = await registerPlannerAdmin(parseResult.data)
    const response = NextResponse.json<ApiResponse<PlannerRegistrationResponse>>({
      success: true,
      data: {
        customerNumber: result.customerNumber,
        nextUrl: '/admin/hochzeiten',
        registered: true,
      },
      message: 'Das Wedding-Planer-Konto wurde angelegt.',
    })

    response.cookies.set(ADMIN_SESSION_COOKIE, result.sessionToken, getAdminSessionCookieOptions())
    return response
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Das Wedding-Planer-Konto konnte nicht angelegt werden.'

    return NextResponse.json(
      {
        success: false,
        error: message,
        code: 'REGISTRATION_FAILED',
      },
      { status: message.includes('bereits') ? 409 : 500 },
    )
  }
}
