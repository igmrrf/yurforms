import { NextResponse } from 'next/server'
import { FieldLearning } from '@/services/fieldLearning'

export async function POST(request: Request) {
  try {
    const { field, newType, confidence } = await request.json()

    if (!field || !newType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await FieldLearning.learnFromCorrection(field, newType, confidence || 0.8)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Learning failed' }, { status: 500 })
  }
}