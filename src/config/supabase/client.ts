import { createBrowserClient } from '@supabase/ssr'
import { supabaseApiKey, supabaseUrl } from '../constants'


export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseApiKey)
}
