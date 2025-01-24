import { NextResponse } from 'next/server'
import { createClient } from '@/config/supabase/client'

const supabase = createClient()

export async function POST(request: Request) {
  try {
    const { forms } = await request.json()
    const userId = request.headers.get('X-User-ID')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 401 })
    }

    if (!forms || !Array.isArray(forms)) {
      return NextResponse.json({ error: 'Invalid forms data' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('forms')
      .upsert(
        forms.map(form => ({
          ...form,
          user_id: userId,
          updated_at: new Date().toISOString()
        }))
      )
      .select()

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Forms sync error:', error)
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
  }
}