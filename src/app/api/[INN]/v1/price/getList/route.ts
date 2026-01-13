import { NextRequest, NextResponse } from 'next/server'
import { ServicePrice } from '../../../../../../../Server/Service/servicePrice/servicePrice'
import { isError } from '@/shared/lib/IsError'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
  const {INN}=params
  const servicePrice = new ServicePrice(INN)
  const result = await servicePrice.getListInfoPrices()

  if(isError(result)){
    return NextResponse.json(
      { message: result.message },
      { status: 500 }
    )
  }
  return NextResponse.json(result, { status: 200 })


  
}
