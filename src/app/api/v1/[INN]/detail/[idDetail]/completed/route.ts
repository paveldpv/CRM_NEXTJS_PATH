import { TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../../Server/classes/until/MongoHelpers'
import { ROOT_LINK } from '../../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ServiceDetails } from '../../../../../../../../Server/Service/serviceDetails/serviceDetails'
import { ServiceGeoLocation } from '../../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { isError } from '@/shared/lib/IsError'

export async function POST(request: NextRequest, { params }: { params: { INN: string; idDetail: string } }) {
	const { INN, idDetail } = params
	const body = await request.json()
	const { idOrder, dataGeo } = body as {
		idOrder: string
		dataGeo: TNewDataGeoLocationDTO
	}

	const ids = MongoHelpers.stringsToObjectIdsTuple(idDetail, idOrder, dataGeo.user)
	if (ids === null) {
		return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 })
	}

	const [detailId, orderId, userId] = ids

	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.order)
	const permissionUser = await servicePermission.Permission(userId)

	if (!permissionUser) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}

	const serviceDetail = new ServiceDetails(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)

	const result = await Promise.all([
		serviceDetail.completedDetail(detailId, orderId),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: userId }),
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
