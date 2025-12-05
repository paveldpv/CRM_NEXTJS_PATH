import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest, { params }: { params: { INN: string, idDetail: string } }) {
  const { INN, idDetail } = params
  // TODO: Implement with idDetail
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}