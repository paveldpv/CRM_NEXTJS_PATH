import { TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../../Server/classes/until/MongoHelpers'
import { ROOT_LINK } from '../../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ServiceCounterparty } from '../../../../../../../../Server/Service/serviceCounterparty/serviceCounterparty'
import { ServiceGeoLocation } from '../../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { isError } from '@/shared/lib/IsError'

export async function POST(request: NextRequest, { params }: { params: { INN: string; _id: string } }) {
	const { INN, _id } = params
	const body = await request.json()
	const { dataGeo } = body as {
		dataGeo: TNewDataGeoLocationDTO
	}
	const ids = MongoHelpers.stringsToObjectIdsTuple(dataGeo?.user, _id)
	if (ids === null) {
		return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 })
	}
	const [idUser, idCounterparty] = ids
	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.order)
	const permissionUser = await servicePermission.Permission(idUser)
	if (!permissionUser) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}
	const serviceGeoLocation = new ServiceGeoLocation(INN)
	const serviceCounterparty = new ServiceCounterparty(INN)

	const result = await Promise.all([
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: idUser }),
		serviceCounterparty.restoreCounterparty(idCounterparty),
	])
  const error = result.filter(el=>isError(el))
  if(error.length!=0){
    return NextResponse.json(
      { message: error[0].message },
      { status: 500 }
    )
  }
  return NextResponse.json(
    { message: 'OK' },
    { status: 200 }
  )
	
}
