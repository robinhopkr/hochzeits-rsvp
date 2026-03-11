import { ENV } from '@/lib/constants'

function normalizeGuestCodeValue(guestCode: string | null | undefined): string | null {
  const normalized = guestCode?.trim().toUpperCase()
  return normalized ? normalized : null
}

export function buildInvitationPath(guestCode: string | null | undefined): string {
  const normalizedGuestCode = normalizeGuestCodeValue(guestCode)

  if (!normalizedGuestCode) {
    return '/einladung'
  }

  return `/einladung/${encodeURIComponent(normalizedGuestCode)}`
}

export function buildInvitationUrl(guestCode: string | null | undefined): string {
  return new URL(buildInvitationPath(guestCode), ENV.appUrl).toString()
}
