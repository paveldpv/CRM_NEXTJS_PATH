import { TNewDataCounterparty, TGeolLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ServiceCounterparty } from '../../../../../../../Server/Service/serviceCounterparty/serviceCounterparty'
import { isError } from '@/shared/lib/IsError'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()
	const {data,dataGeo} = body as {
		data: TNewDataCounterparty
		dataGeo: TGeolLocationDTO
	}
  const idUser = MongoHelpers.stringToObjectId(dataGeo.user)
  if(idUser==null){
    return NextResponse.json({ message: 'not valid ID user' }, { status: 400 })
  }

  const servicePermission = new ServicePermissionRedactData(INN,ROOT_LINK.order)
  const permissionUser = await servicePermission.Permission(idUser)
  if(!permissionUser){
    return NextResponse.json({ message: 'permission blocked' }, { status: 403 })
  }

  const serviceGeoLocation = new ServiceGeoLocation(INN)
  const serviceCounterparty = new ServiceCounterparty(INN)
  const result = await Promise.all([
    serviceGeoLocation.setDataLocation({...dataGeo,user:idUser}),
    serviceCounterparty.createNewCounterparty(data)
  ])
  const error = result.filter(el => isError(el))
  if(error.length!=0){
     return NextResponse.json({ message: 'permission blocked' }, { status: 500 })
  }else{
    return NextResponse.json({ message: 'OK' }, { status: 200 })
  }


	
}
