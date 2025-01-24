export const baseUrl = "https://yurforms.com"
export const supabasePassword = process.env.SUPABASE_PASSWORD
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
export const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string
export const sendgripApiKey = process.env.SENDGRID_API_KEY as string
export const SYNC_INTERVAL = 5 * 60 * 1000 // 5 minutes
export const MIN_CONFIDENCE_THRESHOLD = 0.7
export const DEFAULT_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s-()]+$/,
  name: /^[A-Za-z\s'-]+$/,
  address: /^[A-Za-z0-9\s,.-]+$/
}
