 import { NextRequest, NextResponse } from 'next/server'

 export async function POST(request: NextRequest, { params }: { params: { INN: string, _id: string } }) {
   const { INN, _id } = params
   // TODO: Implement
   return NextResponse.json({ message: 'Not implemented', INN, _id }, { status: 501 })
 }