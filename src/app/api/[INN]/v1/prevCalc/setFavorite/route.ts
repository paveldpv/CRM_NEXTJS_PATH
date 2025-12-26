import { isError } from '@/shared/lib/IsError'
import { TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ServicePrevCalc } from '../../../../../../../Server/Service/servicePrevCacl/servicePrevCalc'

export async function PUT(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()

	const { payload, dataGeo } = body as {
		payload: { idRequest: string; isFavorite: boolean }
		dataGeo: TNewDataGeoLocationDTO
	}

	// Validate IDs
	const ids = MongoHelpers.stringsToObjectIdsTuple(payload.idRequest, dataGeo.user)
	if (ids === null) {
		return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 })
	}

	const [requestId, userId] = ids

	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.application)
	const permissionUser = await servicePermission.Permission(userId)

	if (!permissionUser) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}

	const servicePrevCalc = new ServicePrevCalc(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)

	const result = await Promise.all([
		servicePrevCalc.setFavoriteRequest(requestId, payload.isFavorite),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: userId }),
	])
	const error = result.filter((el) => isError(el))
	if (error.length != 0) {
		return NextResponse.json({ message: error[0].message }, { status: 500 })
	}

	return NextResponse.json(`OK`,	{ status: 200 }	)
	
}
