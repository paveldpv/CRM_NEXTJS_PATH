import { TGeolLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../../Server/classes/until/MongoHelpers'
import { ROOT_LINK } from '../../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { isError } from 'util'
import { ServiceGeoLocation } from '../../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ServiceUsers } from '../../../../../../../../Server/Service/serviceUser/serviceUser'

export async function PUT(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()

	const { data, dataGeo } = body as {
		data: { idUser: string; newPas: string }
		dataGeo: TGeolLocationDTO
	}
  
	const ids = MongoHelpers.stringsToObjectIdsTuple(data.idUser, dataGeo.user)
	if (!ids) {
		return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 })
	}
	const [targetUserId, executorUserId] = ids

	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.employee)
	const permissionUser = await servicePermission.Permission(executorUserId)
	if (!permissionUser) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}

	const serviceUser = new ServiceUsers(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)

	const result = await Promise.all([
		serviceUser.updatePas(targetUserId,data.newPas),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: executorUserId }),
	])

	const errors = result.filter((el) => isError(el))
	if (errors.length > 0) {
		return NextResponse.json({ message: errors[0].message }, { status: 500 })
	}

	return NextResponse.json({ message: 'OK' }, { status: 200 })
}
