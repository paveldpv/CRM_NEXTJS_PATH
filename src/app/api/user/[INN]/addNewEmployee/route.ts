
import { ROOT_LINK } from '@/shared/model/types/enums'
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { NextRequest, NextResponse } from 'next/server'
import ServicePermissionRedactData from '../../../../../../Server/Service/ServicePermissionRedactData'
import { ServiceEmployee } from '../../../../../../Server/Service/serviceEmployee'
import { ServiceGeoLocation } from '../../../../../../Server/Service/serviceGeoLocation'
import { isError } from '../../../../../shared/lib/IsError'
import { TNewEmployee } from '@/shared/model/types/Types'

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
