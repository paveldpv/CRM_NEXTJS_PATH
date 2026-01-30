import { isError } from '@/shared/lib/IsError'
import { TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../../Server/classes/until/MongoHelpers'
import { ServiceGeoLocation } from '../../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ROOT_LINK } from '../../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ServicePrevCalc } from '../../../../../../../../Server/Service/servicePrevCacl/servicePrevCalc'

export async function PUT(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()

	const { ids, dataGeo } = body as {
		ids: string[]
		dataGeo: TNewDataGeoLocationDTO
	}
	const userId = MongoHelpers.stringToObjectId(dataGeo.user)
	if (userId === null) {
		return NextResponse.json({ message: 'Invalid user ID format' }, { status: 400 })
	}

	const requestIds = MongoHelpers.stringsToObjectIds(ids)
	if (requestIds === null) {
		return NextResponse.json({ message: 'Invalid request ID format in array' }, { status: 400 })
	}

	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.application)
	const permissionUser = await servicePermission.Permission(userId)

	if (!permissionUser) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}

	const servicePrevCalc = new ServicePrevCalc(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)

	const result = await Promise.all([
		servicePrevCalc.setVerifiedRequestMany(requestIds),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: userId }),
	])
	const error = result.filter((el) => isError(el))

	if (error.length != 0) {
		return NextResponse.json({ message: error[0].message }, { status: 500 })
	}
  return NextResponse.json('OK', { status: 200 })
	
}
