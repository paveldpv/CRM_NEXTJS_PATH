import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
  const { INN } = params
  const url = new URL(request.url)
  const query = url.searchParams.get('query') || ''
  const withDeleted = url.searchParams.get('withDeleted') === 'true'
  
  
  return NextResponse.json({ 
    message: 'Not implemented'   
  }, { status: 501 })
}
