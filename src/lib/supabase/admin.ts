import { createClient } from '@supabase/supabase-js'

import { ENV } from '@/lib/constants'
import type { Database } from '@/types/database'

export function createAdminClient() {
  if (!ENV.serviceRoleKey) {
    return null
  }

  return createClient<Database>(ENV.supabaseUrl, ENV.serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
