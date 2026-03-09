import { createHmac, timingSafeEqual } from 'node:crypto'

export const PHOTO_SESSION_COOKIE = 'niiro_photo_session'
const PHOTO_SESSION_MAX_AGE = 60 * 60 * 12

type CookieValue = {
  value: string
}

type CookieStore = {
  get: (name: string) => CookieValue | undefined
}

export interface PhotoSession {
  weddingId: string
  guestCode: string
}

function getSessionSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? null
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

export function createPhotoSessionToken(weddingId: string, guestCode: string): string | null {
  const secret = getSessionSecret()
  if (!secret) {
    return null
  }

  const payload = {
    weddingId,
    guestCode: guestCode.trim().toUpperCase(),
    expiresAt: Date.now() + PHOTO_SESSION_MAX_AGE * 1000,
  }

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = createSignature(encodedPayload, secret)

  return `${encodedPayload}.${signature}`
}

export function verifyPhotoSessionToken(
  token: string | null | undefined,
  weddingId: string,
): PhotoSession | null {
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
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as {
      weddingId?: string
      guestCode?: string
      expiresAt?: number
    }

    if (!payload.weddingId || !payload.guestCode || !payload.expiresAt) {
      return null
    }

    if (payload.expiresAt < Date.now() || payload.weddingId !== weddingId) {
      return null
    }

    return {
      weddingId: payload.weddingId,
      guestCode: payload.guestCode,
    }
  } catch {
    return null
  }
}

export function getPhotoSessionFromCookieStore(
  cookieStore: CookieStore,
  weddingId: string,
): PhotoSession | null {
  return verifyPhotoSessionToken(cookieStore.get(PHOTO_SESSION_COOKIE)?.value, weddingId)
}

export function getPhotoSessionCookieOptions() {
  return {
    httpOnly: true,
    maxAge: PHOTO_SESSION_MAX_AGE,
    path: '/',
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
  }
}
