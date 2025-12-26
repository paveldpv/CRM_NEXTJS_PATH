import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
  // TODO: Implement
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
