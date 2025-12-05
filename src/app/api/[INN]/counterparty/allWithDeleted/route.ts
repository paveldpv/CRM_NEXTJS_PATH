import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
  const { INN } = params
  // TODO: Implement
  return NextResponse.json({ message: 'Not implemented', INN }, { status: 501 })
}
