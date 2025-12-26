import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
  const url = new URL(request.url)
  const ids = url.searchParams.get('ids')
  
  // TODO: Implement with ids (format: id1!id2!id3)
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
