import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../../../Server/classes/until/MongoHelpers'
import ServicePermissionRedactData from '../../../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ROOT_LINK } from '../../../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import { TGeolLocationDTO } from '@/shared/model/types'
import { TResponseUploadFiles } from '@/shared/model/types/subtypes/Types'
import { ServiceCounterparty } from '../../../../../../../../../Server/Service/serviceCounterparty/serviceCounterparty'
import { ServiceGeoLocation } from '../../../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { isError } from '@/shared/lib/IsError'

export async function POST(request: NextRequest, { params }: { params: { INN: string; _id: string } }) {
	const { INN, _id } = params
  const body = await request.json()
  const {file,dataGeo} = body as {
    file: TResponseUploadFiles , dataGeo: TGeolLocationDTO
  }
	const ids = MongoHelpers.stringsToObjectIdsTuple(_id,dataGeo.user)
	if (ids === null) {
		return NextResponse.json({ message: 'Invalid file ID format' }, { status: 400 })
	}
  const [idCounterparty , idUser]= ids
  const servicePermission = new ServicePermissionRedactData(INN,ROOT_LINK.order)
  const permission =await servicePermission.Permission(idUser)
  if(!permission){
    return NextResponse.json({ message: 'permission blocked' }, { status: 403 })
  }
  const serviceCounterparty = new ServiceCounterparty(INN)
  const serviceGeoLocation = new ServiceGeoLocation(INN)
  const result  = await Promise.all([
    serviceGeoLocation.setDataLocation({...dataGeo,user:idUser}),
    serviceCounterparty.deletedFileRequitesCounterparty(idCounterparty,file)
  ])
  const error = result.filter(el =>isError(el))
  if(error.length!=0){
    return NextResponse.json({ message: 'error server', INN, _id }, { status: 500 })
  }else{
return NextResponse.json({ message: 'OK'}, { status: 200 })
  }


	
}
