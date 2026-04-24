import { isError } from '@/shared/lib/IsError'
import { TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../../Server/classes/until/MongoHelpers'
import { ServiceDetails } from '../../../../../../../../Server/Service/serviceDetails/serviceDetails'
import { ServiceGeoLocation } from '../../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import ServicePermissionRedactData from '../../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ROOT_LINK } from '../../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'


export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()

	const { idOrder, ids, dataGeo } = body as {
		idOrder: string
		ids: string[]
		dataGeo: TNewDataGeoLocationDTO
	}

	if (!idOrder || !Array.isArray(ids) || ids.length === 0 || !dataGeo.user) {
		return NextResponse.json(
			{ message: 'idOrder, non-empty ids[], and dataGeo.user are required' },
			{ status: 400 }
		)
	}

	const orderDetailIds = [idOrder, ...ids, dataGeo.user]
	const objectIds = MongoHelpers.stringsToObjectIds(orderDetailIds)
	if (!objectIds) {
		return NextResponse.json({ message: 'One or more IDs have invalid format' }, { status: 400 })
	}

	const [orderId, ...detailIds] = objectIds
	const userId = objectIds[objectIds.length - 1] 

	const serviceDetail      = new ServiceDetails(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)
	const servicePermission  = new ServicePermissionRedactData(INN, ROOT_LINK.order)

	const permission = await servicePermission.Permission(userId)
	if (!permission) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}

	const result = await Promise.all([
		serviceDetail.removeBunchDetailsForOrder(orderId, detailIds),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: userId }),
	])

	const errors = result.filter(isError)
	if (errors.length > 0) {
		return NextResponse.json({ message: errors[0].message }, { status: 500 })
	}

	return NextResponse.json({ message: 'OK' }, { status: 200 })
}