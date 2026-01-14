import { TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ServicePropertyDetail } from '../../../../../../../Server/Service/servicePropertyDetail/servicePropertyDetail'
import { isError } from '@/shared/lib/IsError'


export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()

	const { idProperty, dataGeo } = body as {
		idProperty: string
		dataGeo: TNewDataGeoLocationDTO
	}
	const ids = MongoHelpers.stringsToObjectIdsTuple(idProperty, dataGeo.user)
	if (ids === null) {
		return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 })
	}
	const [propertyId, userId] = ids

	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.details)
	const permissionUser = await servicePermission.Permission(userId)

	if (!permissionUser) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}

	const servicePropertyDetail = new ServicePropertyDetail(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)

	const result = await Promise.all([
		servicePropertyDetail.removeAddPropertyDetail(propertyId),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: userId }),
	])

	const errors = result.filter((el) => isError(el))
	if (errors.length > 0) {
		return NextResponse.json({ message: errors[0].message }, { status: 500 })
	}

	return NextResponse.json({ message: 'OK' }, { status: 200 })

	
}
