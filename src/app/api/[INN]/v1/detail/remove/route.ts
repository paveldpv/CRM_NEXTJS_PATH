import { isError } from '@/shared/lib/IsError'
import { TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ServiceDetails } from '../../../../../../../Server/Service/serviceDetails/serviceDetails'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()

	const { idOrder, idDetail, dataGeo } = body as {
		idOrder: string
		idDetail: string
		dataGeo: TNewDataGeoLocationDTO
	}
	const ids = MongoHelpers.stringsToObjectIdsTuple(idOrder, idDetail, dataGeo.user)
	if (ids == null) {
		return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 })
	}
	const [orderId, detailId, userId] = ids
	const serviceDetail = new ServiceDetails(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)
  
	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.order)
	const permission = await servicePermission.Permission(userId)
	if (!permission) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}

	const result = await Promise.all([
		serviceDetail.removeDetailFromOrder(orderId, detailId),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: userId }),
	])
	const error = result.filter((el) => isError(el))
	if (error.length != 0) {
		return NextResponse.json({ message: error[0].message }, { status: 500 })
	}
	return NextResponse.json({ message: 'OK' }, { status: 200 })
}
