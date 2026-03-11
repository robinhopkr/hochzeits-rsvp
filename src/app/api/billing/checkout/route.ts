import { NextResponse, type NextRequest } from 'next/server'

import { getAdminSessionFromCookieStore } from '@/lib/auth/admin-session'
import { resolveWeddingAccessForSession } from '@/lib/auth/admin-accounts'
import { createBillingCheckoutSession } from '@/lib/billing/stripe'
import type { ApiResponse } from '@/types/api'

type CheckoutResponse = {
  url: string
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<CheckoutResponse>>> {
  const session = getAdminSessionFromCookieStore(request.cookies)

  if (!session || session.role !== 'couple') {
    return NextResponse.json(
      {
        success: false,
        error: 'Nur das Brautpaar kann den Kauf abschließen.',
        code: 'UNAUTHORIZED',
      },
      { status: 401 },
    )
  }

  let resolvedAccess: Awaited<ReturnType<typeof resolveWeddingAccessForSession>>

  try {
    resolvedAccess = await resolveWeddingAccessForSession(session)
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Die Hochzeit für den Kauf konnte nicht geladen werden.',
        code: 'WEDDING_NOT_AVAILABLE',
      },
      { status: 409 },
    )
  }

  const { billingAccess, config, coupleAccount } = resolvedAccess

  if (!billingAccess.billingEnabled) {
    return NextResponse.json(
      {
        success: false,
        error: 'Die Stripe-Zahlung ist aktuell noch nicht konfiguriert.',
        code: 'BILLING_NOT_CONFIGURED',
      },
      { status: 503 },
    )
  }

  if (!coupleAccount?.email) {
    return NextResponse.json(
      {
        success: false,
        error: 'Für diese Hochzeit ist noch kein Brautpaar-Konto mit E-Mail hinterlegt.',
        code: 'ADMIN_EMAIL_NOT_CONFIGURED',
      },
      { status: 503 },
    )
  }

  if (!billingAccess.requiresPayment) {
    return NextResponse.json({
      success: true,
      data: {
        url: new URL('/admin/uebersicht', request.url).toString(),
      },
    })
  }

  try {
    if (config.source === 'fallback') {
      throw new Error('Die Hochzeit konnte nicht für den Checkout zugeordnet werden.')
    }

    const checkoutSession = await createBillingCheckoutSession({
      adminEmail: coupleAccount.email,
      weddingSource: config.source,
      weddingSourceId: config.sourceId ?? config.id,
    })

    if (!checkoutSession.url) {
      throw new Error('Stripe hat keine Checkout-URL zurückgegeben.')
    }

    return NextResponse.json({
      success: true,
      data: {
        url: checkoutSession.url,
      },
    })
  } catch (error) {
    console.error('Stripe checkout creation failed', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Der Stripe-Checkout konnte gerade nicht erstellt werden.',
        code: 'CHECKOUT_CREATION_FAILED',
      },
      { status: 500 },
    )
  }
}
