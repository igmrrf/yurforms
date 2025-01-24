import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { supabaseUrl, supabaseApiKey } from '@/config/constants'

export function createServer() {
  return createServerClient(
    supabaseUrl,
    supabaseApiKey,
    {
      cookies: {
        async getAll() {
          const cookieStore = await cookies()
          return cookieStore.getAll().map(cookie => ({
            name: cookie.name,
            value: cookie.value
          }))
        },
        async setAll(cookieValues) {
          const cookieStore = await cookies()
          cookieValues.forEach(({ name, value, ...options }) => {
            cookieStore.set({ name, value, ...options })
          })
        }
      }
    }
  )
}
