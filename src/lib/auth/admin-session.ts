import { createHmac, timingSafeEqual } from 'node:crypto'

import type { WeddingSource } from '@/types/wedding'

export const ADMIN_SESSION_COOKIE = 'niiro_admin_session'
const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7

type CookieValue = {
  value: string
}

type CookieStore = {
  get: (name: string) => CookieValue | undefined
}

export type AdminSessionRole = 'couple' | 'planner'

export interface AdminSession {
  accountId: string
  email: string
  role: AdminSessionRole
  weddingSource: WeddingSource | null
  weddingSourceId: string | null
}

interface SessionPayload extends AdminSession {
  expiresAt: number
}

function normalizeEmail(value: string | null | undefined): string | null {
  const normalized = value?.trim().toLowerCase()
  return normalized ? normalized : null
}

function getSessionSecret(): string | null {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.STRIPE_SECRET_KEY ??
    process.env.ADMIN_PASSWORD ??
    process.env.WEDDING_PLANNER_PASSWORD ??
    null
  )
}

function createSignature(value: string, secret: string): string {
  return createHmac('sha256', secret).update(value).digest('base64url')
}

function safeCompare(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return timingSafeEqual(leftBuffer, rightBuffer)
}

export function hasConfiguredAdminCredentials(): boolean {
  return true
}

export function hasConfiguredCoupleCredentials(): boolean {
  return true
}

export function hasConfiguredPlannerCredentials(): boolean {
  return true
}

export function createAdminSessionToken(session: AdminSession): string | null {
  const secret = getSessionSecret()

  if (!secret) {
    return null
  }

  const payload: SessionPayload = {
    ...session,
    email: normalizeEmail(session.email) ?? session.email,
    expiresAt: Date.now() + ADMIN_SESSION_MAX_AGE * 1000,
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = createSignature(encodedPayload, secret)

  return `${encodedPayload}.${signature}`
}

export function withSelectedWedding(
  session: AdminSession,
  weddingSource: WeddingSource,
  weddingSourceId: string,
): AdminSession {
  return {
    ...session,
    weddingSource,
    weddingSourceId,
  }
}

export function clearSelectedWedding(session: AdminSession): AdminSession {
  return {
    ...session,
    weddingSource: null,
    weddingSourceId: null,
  }
}

export function verifyAdminSessionToken(token: string | null | undefined): AdminSession | null {
  const secret = getSessionSecret()

  if (!token || !secret) {
    return null
  }

  const [encodedPayload, signature] = token.split('.')

  if (!encodedPayload || !signature) {
    return null
  }

  const expectedSignature = createSignature(encodedPayload, secret)

  if (!safeCompare(signature, expectedSignature)) {
    return null
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as Partial<SessionPayload>

    if (
      !payload.accountId ||
      !payload.email ||
      !payload.expiresAt ||
      (payload.role !== 'couple' && payload.role !== 'planner')
    ) {
      return null
    }

    if (payload.expiresAt < Date.now()) {
      return null
    }

    if ((payload.weddingSource && !payload.weddingSourceId) || (!payload.weddingSource && payload.weddingSourceId)) {
      return null
    }

    return {
      accountId: payload.accountId,
      email: normalizeEmail(payload.email) ?? payload.email,
      role: payload.role,
      weddingSource: payload.weddingSource ?? null,
      weddingSourceId: payload.weddingSourceId ?? null,
    }
  } catch {
    return null
  }
}

export function getAdminSessionFromCookieStore(cookieStore: CookieStore): AdminSession | null {
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    maxAge: ADMIN_SESSION_MAX_AGE,
    path: '/',
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
  }
}
