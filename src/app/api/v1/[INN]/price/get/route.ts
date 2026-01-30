import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ServicePrice } from '../../../../../../../Server/Service/servicePrice/servicePrice'
import { Types } from 'mongoose'
import { isError } from '@/shared/lib/IsError'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
  const {INN}=params
  const url = new URL(request.url)
  const _id = url.searchParams.get('_id')||null
  const _idUser = url.searchParams.get('idUser')|| null
  let idTable :Types.ObjectId | null =null
  let idUser :Types.ObjectId | null =null
 if(_id){
     idTable = MongoHelpers.stringToObjectId(_id)
 }
 if(_idUser){
   idUser = MongoHelpers.stringToObjectId(_idUser)
 }
 const servicePrice =new ServicePrice(INN)
 const price = await servicePrice.getPriceByID(idTable,idUser)
 if(isError(price)){
  return NextResponse.json({
    message:price.message
  },{status:500})
 }
  return NextResponse.json(price,{status:200})

}
