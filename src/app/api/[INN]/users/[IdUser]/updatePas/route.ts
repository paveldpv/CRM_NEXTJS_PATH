
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { NextRequest, NextResponse } from 'next/server'

import { isError } from '../../../../../../shared/lib/IsError'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ServiceUsers } from '../../../../../../../Server/Service/serviceUser/serviceUser'
import { ObjectId } from 'mongoose'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'

export async function POST(
	req: NextRequest,
	{ params }: { params: { INN: string; IdEmployee: ObjectId } },
	res: NextResponse
) {
	const { INN, IdEmployee } = params
	const requestData = await req.json()
	const { newPas, dataGeo } = requestData as { newPas: string; dataGeo: Omit<TGeoLocation, 'date'> }

	const permissionRedactData = new ServicePermissionRedactData(INN, ROOT_LINK.employee)
	const solutionRedactData = await permissionRedactData.Permission(dataGeo.idEmployee)
	if (!solutionRedactData) {
		return NextResponse.json('refusal', { status: 403 })
	}
	
	const serviceGeoLocation = new ServiceGeoLocation(INN)
	const serviceUser = new ServiceUsers(INN)
	const result = await Promise.all([
		serviceGeoLocation.setDataLocation(dataGeo),
		serviceUser.updatePas(IdEmployee, newPas),
	])
	const error = result.find((res) => isError(res))

	return NextResponse.json(error || 'OK', { status: 200 })
}
