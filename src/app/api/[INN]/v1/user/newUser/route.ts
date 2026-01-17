import { TDBUser, TGeolLocationDTO, TNewUser } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'

import { isError } from '@/shared/lib/IsError'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ServiceUsers } from '../../../../../../../Server/Service/serviceUser/serviceUser'
import { ServiceUserDTO } from '../../../../../../../Server/Service/serviceUser/user.dto'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	
	const { INN } = params
	const body = await request.json()

	const { newUser, dataGeo } = body as {
		newUser: TNewUser
		dataGeo: TGeolLocationDTO
	}

	const userId = MongoHelpers.stringToObjectId(dataGeo.user)
	if (!userId) {
		return NextResponse.json({ message: 'Invalid user ID format' }, { status: 400 })
	}
	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.employee)
	const permissionUser = await servicePermission.Permission(userId)

	if (!permissionUser) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}

	const serviceUser = new ServiceUsers(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)

	const result = await Promise.all([
		serviceUser.addNewUser(newUser),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: userId }),
	])

	const errors = result.filter((el) => isError(el))
	if (errors.length > 0) {
		return NextResponse.json({ message: errors[0].message }, { status: 500 })
	}

	const resultDTO = ServiceUserDTO.createUserDTO(result[0] as TDBUser)
	return NextResponse.json(resultDTO, { status: 201 })

	
}
