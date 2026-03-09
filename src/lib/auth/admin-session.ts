import { createHmac, timingSafeEqual } from 'node:crypto'

export const ADMIN_SESSION_COOKIE = 'niiro_admin_session'
const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7

type CookieValue = {
  value: string
}

type CookieStore = {
  get: (name: string) => CookieValue | undefined
}

export interface AdminSession {
  email: string
}

function getAdminEmail(): string | null {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? null
}

function getAdminPassword(): string | null {
  return process.env.ADMIN_PASSWORD ?? null
}

function getSessionSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET ?? getAdminPassword()
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
  return Boolean(getAdminEmail() && getAdminPassword())
}

export function validateAdminCredentials(email: string, password: string): boolean {
  const adminEmail = getAdminEmail()
  const adminPassword = getAdminPassword()

  if (!adminEmail || !adminPassword) {
    return false
  }

  return adminEmail === email.trim().toLowerCase() && safeCompare(adminPassword, password)
}

export function createAdminSessionToken(email: string): string | null {
  const secret = getSessionSecret()
  if (!secret) {
    return null
  }

  const payload = {
    email: email.trim().toLowerCase(),
    expiresAt: Date.now() + ADMIN_SESSION_MAX_AGE * 1000,
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = createSignature(encodedPayload, secret)

  return `${encodedPayload}.${signature}`
}

export function verifyAdminSessionToken(token: string | null | undefined): AdminSession | null {
  const adminEmail = getAdminEmail()
  const secret = getSessionSecret()

  if (!token || !adminEmail || !secret) {
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
      email?: string
      expiresAt?: number
    }

    if (!payload.email || !payload.expiresAt) {
      return null
    }

    if (payload.expiresAt < Date.now()) {
      return null
    }

    if (payload.email !== adminEmail) {
      return null
    }

    return {
      email: payload.email,
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

