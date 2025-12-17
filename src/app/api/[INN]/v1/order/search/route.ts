import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
  const url = new URL(request.url)
  const dateStart = url.searchParams.get('dateStart')
  const dateEnd = url.searchParams.get('dateEnd')
  
  // TODO: Implement with dateStart and dateEnd
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
