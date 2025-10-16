import { isError } from '@/shared/lib/IsError'

import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { NextRequest, NextResponse } from 'next/server'

//import { ServiceEmployee } from '../../../../../../../Server/Service/serviceEmployee/serviceEmployee'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'


export async function POST(
	req: NextRequest,
	{ params }: { params: { INN: string; IdEmployee: string } },
	res: NextResponse
) {
	const { INN, IdEmployee } = params

	const requestData = await req.json()
	const { dataGeo } = requestData as { dataGeo: Omit<TGeoLocation, 'date'> }

	const permissionRedactData = new ServicePermissionRedactData(INN, ROOT_LINK.employee)
	const solutionRedactData = await permissionRedactData.Permission(dataGeo.idEmployee)
	if (!solutionRedactData) {
		return NextResponse.json('refusal', { status: 403 })
	}

	const serviceGeoLocation = new ServiceGeoLocation(INN)
	const serviceEmployee = new ServiceEmployee(INN)

	const result = await Promise.all([
		serviceGeoLocation.setDataLocation(dataGeo),
		serviceEmployee.restoreEmployee(IdEmployee),
	])
	const error = result.find((res) => isError(res))

	return NextResponse.json(error || 'OK', { status: 200 })
}
