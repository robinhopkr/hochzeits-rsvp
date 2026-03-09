import { createClient } from '@supabase/supabase-js'

import { ENV } from '@/lib/constants'
import type { Database } from '@/types/database'

export function createPublicClient() {
  return createClient<Database>(ENV.supabaseUrl, ENV.supabaseAnonKey)
}
