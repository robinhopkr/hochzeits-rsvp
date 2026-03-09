import { NextResponse } from 'next/server'

import { ADMIN_SESSION_COOKIE } from '@/lib/auth/admin-session'
import type { ApiResponse } from '@/types/api'

type LogoutResponse = {
  loggedOut: true
}

export async function POST(): Promise<NextResponse<ApiResponse<LogoutResponse>>> {
  const response = NextResponse.json<ApiResponse<LogoutResponse>>({
    success: true,
    data: {
      loggedOut: true,
    },
  })

  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}
