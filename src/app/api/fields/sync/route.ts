import { NextResponse } from 'next/server'
import { FieldLearning } from '@/services/fieldLearning'

export async function POST(request: Request) {
  try {
    const { fields } = await request.json()
    
    if (!fields || !Array.isArray(fields)) {
      return NextResponse.json({ error: 'Invalid fields data' }, { status: 400 })
    }
    
    const success = await FieldLearning.syncFields(fields)
    
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}