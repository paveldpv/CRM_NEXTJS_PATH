import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
  const url = new URL(request.url)
  const req = url.searchParams.get('req')
  
  // TODO: Implement with req
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
