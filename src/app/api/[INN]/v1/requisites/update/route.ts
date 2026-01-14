import { TNewDataGeoLocationDTO, TRequisitesDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ServiceRequisites } from '../../../../../../../Server/Service/serviceRequisites/serviceReqisites'
import { isError } from '@/shared/lib/IsError'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()
	const { data, dataGeo } = body as {
		data: TRequisitesDTO
		dataGeo: TNewDataGeoLocationDTO
	}

	const ids = MongoHelpers.stringsToObjectIdsTuple(dataGeo.user, data._id)
	if (!ids) {
		return NextResponse.json({ message: 'Invalid user ID format' }, { status: 400 })
	}
	const [userId, dataId] = ids
	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.order)
	const permissionUser = await servicePermission.Permission(userId)

	if (!permissionUser) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}

	const serviceRequisites = new ServiceRequisites(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)

	const result = await Promise.all([
		serviceRequisites.updateRequisites({...data,_id:dataId}),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: userId }),
	])

  const errors = result.filter(el => isError(el));
  if (errors.length > 0) {
    return NextResponse.json({ message: errors[0].message }, { status: 500 });
  }
  
  return NextResponse.json({ message: 'OK' }, { status: 200 })

	
}
