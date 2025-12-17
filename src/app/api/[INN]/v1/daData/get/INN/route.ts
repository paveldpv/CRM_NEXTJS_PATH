import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
  const url = new URL(request.url)
  const INNqueryOrganization = url.searchParams.get('INN')
  
  // TODO: Implement with INNqueryOrganization
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
