import { NextResponse } from 'next/server'
import { FieldLearning } from '@/services/fieldLearning'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const label = searchParams.get('label')

  if (!label) {
    return NextResponse.json({ error: 'Label is required' }, { status: 400 })
  }

  const prediction = await FieldLearning.getPredictedType(label)
  return NextResponse.json(prediction)
}