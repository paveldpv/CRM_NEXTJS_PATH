import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, { params }: { params: { INN: string, _id: string } }) {
  const { INN, _id } = params
  // TODO: Implement with _id
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}