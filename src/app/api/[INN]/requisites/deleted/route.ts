import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
  const url = new URL(request.url)
  const targetINN = url.searchParams.get('targetINN')
  // TODO: Implement
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
