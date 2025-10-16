

import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { NextRequest, NextResponse } from 'next/server'



import { isError } from '../../../../../shared/lib/IsError'
import { ServiceGeoLocation } from '../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import ServicePermissionRedactData from '../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ROOT_LINK } from '../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import { TNewUser } from '../../../../../../Server/Service/serviceUser/model/types/Types'
import { ServiceUsers } from '../../../../../../Server/Service/serviceUser/serviceUser'

export async function POST(
	req: NextRequest,
	{ params }: { params: { INN: string } },
	res: NextResponse
) {
	const INN = params.INN
	const requestData = await req.json()
	const { employee, dataGeo } = requestData as {
		employee:  TNewUser
		dataGeo: Omit<TGeoLocation, 'date'>
	}

	const servicePermissionRedactData = new ServicePermissionRedactData(INN, ROOT_LINK.employee)

	if (!(await servicePermissionRedactData.Permission(dataGeo.idEmployee))) {
		return NextResponse.json('refusal', { status: 403 })
	}

	const serviceUser = new ServiceUsers(INN)
	const serviceGeo = new ServiceGeoLocation(INN)
	

	const result = await Promise.all([
		serviceGeo.setDataLocation(dataGeo),
		serviceUser.addNewUser(employee),
	])

	const error = result.find((req) => isError(req))
	return NextResponse.json(error || 'OK', { status: 200 })
}
