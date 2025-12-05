import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
  const url = new URL(request.url)
  const idOrder = url.searchParams.get('idOrder')
  
  // TODO: Implement with idOrder
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
