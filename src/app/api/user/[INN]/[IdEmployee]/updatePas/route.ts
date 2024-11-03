import { ROOT_LINK } from '@/Types/enums'
import { TGeoLocation } from '@/Types/subtypes/TGeoLocation'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceGeoLocation } from '../../../../../../../Controllers/Service/serviceGeoLocation'
import ServicePermissionRedactData from '../../../../../../../Controllers/Service/ServicePermissionRedactData'
import { ServiceUsers } from '../../../../../../../Controllers/Service/serviceUser'
import { isError } from '../../../../../../../function/IsError'

export async function POST(
	req: NextRequest,
	{ params }: { params: { INN: string; IdEmployee: string } },
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
	const error = result.find(res=>isError(res))

	return NextResponse.json(error || 'OK', { status: 200})
}
