import { TNewEmployee } from '@/Types/Types'
import { ROOT_LINK } from '@/Types/enums'
import { TGeoLocation } from '@/Types/subtypes/TGeoLocation'
import { NextRequest, NextResponse } from 'next/server'
import ServicePermissionRedactData from '../../../../../../Controllers/Service/ServicePermissionRedactData'
import { ServiceEmployee } from '../../../../../../Controllers/Service/serviceEmployee'
import { ServiceGeoLocation } from '../../../../../../Controllers/Service/serviceGeoLocation'
import { isError } from '../../../../../../function/IsError'

export async function POST(req: NextRequest, { params }: { params: { INN: string } }, res: NextResponse) {
	const INN = params.INN
	const requestData = await req.json()
	const { employee, dataGeo } = requestData as { employee: TNewEmployee; dataGeo: Omit<TGeoLocation, 'date'> }

	const servicePermissionRedactData = new ServicePermissionRedactData(INN, ROOT_LINK.employee)

	if (!(await servicePermissionRedactData.Permission(dataGeo.idEmployee))) {
		return NextResponse.json('refusal', { status: 403 })
	}

	const serviceEmployee = new ServiceEmployee(INN)
	const serviceGeo = new ServiceGeoLocation(INN)
	const result = await Promise.all([serviceGeo.setDataLocation(dataGeo), serviceEmployee.addNewEmployee(employee)])


	const error = result.find((req) => isError(req))
	return NextResponse.json(error || 'OK', { status: 200 })
}
