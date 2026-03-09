import { cookies } from 'next/headers'

import { getAdminSessionFromCookieStore } from '@/lib/auth/admin-session'

export async function getServerSession() {
  const cookieStore = await cookies()
  return getAdminSessionFromCookieStore(cookieStore)
}
