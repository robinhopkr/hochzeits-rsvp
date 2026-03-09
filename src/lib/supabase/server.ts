import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

import { ENV } from '@/lib/constants'
import type { Database } from '@/types/database'

type CookieStore = Awaited<ReturnType<typeof cookies>>
type CookieOptions = Parameters<CookieStore['set']>[2]
type CookieToSet = {
  name: string
  value: string
  options?: CookieOptions
}

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(ENV.supabaseUrl, ENV.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: CookieToSet[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            if (options) {
              cookieStore.set(name, value, options)
            } else {
              cookieStore.set(name, value)
            }
          })
        } catch {
          // Server Components duerfen Cookies waehrend des Renderns nicht immer schreiben.
        }
      },
    },
  })
}
