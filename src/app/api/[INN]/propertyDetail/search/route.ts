import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
  const url = new URL(request.url)
  const search = url.searchParams.get('search')
  
  // TODO: Implement with search query
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
