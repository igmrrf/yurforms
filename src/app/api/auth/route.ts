import { createServer } from '@/config/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password, action } = await request.json()
  const supabase = createServer()

  switch (action) {
    case 'signin': {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 401 })
      }

      return NextResponse.json({
        user: {
          id: data.user.id,
          email: data.user.email
        },
        session: {
          access_token: data.session?.access_token
        }
      })
    }

    case 'signup': {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json({
        user: data.user ? {
          id: data.user.id,
          email: data.user.email
        } : null
      })
    }

    case 'signout': {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json({ message: 'Signed out successfully' })
    }

    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }
}