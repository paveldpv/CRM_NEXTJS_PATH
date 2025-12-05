import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
  // TODO: Implement
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
