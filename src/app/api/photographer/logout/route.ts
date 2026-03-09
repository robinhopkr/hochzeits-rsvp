import { NextResponse } from 'next/server'

import { PHOTO_SESSION_COOKIE } from '@/lib/auth/photo-session'
import type { ApiResponse } from '@/types/api'

export async function POST(): Promise<NextResponse<ApiResponse<{ loggedOut: true }>>> {
  const response = NextResponse.json<ApiResponse<{ loggedOut: true }>>({
    success: true,
    data: {
      loggedOut: true,
    },
  })

  response.cookies.set(PHOTO_SESSION_COOKIE, '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}
