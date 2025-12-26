import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest, { params }: { params: { INN: string } }) {
  // TODO: Implement
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
