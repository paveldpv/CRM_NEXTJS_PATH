import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
   const url = new URL(request.url)
  const _id = url.searchParams.get('_id')
  const phone = url.searchParams.get('phone')
  // TODO: Implement
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
