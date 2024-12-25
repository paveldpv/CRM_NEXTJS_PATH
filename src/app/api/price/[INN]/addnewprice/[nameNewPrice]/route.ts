import { ROOT_LINK } from '@/shared/model/types/enums'
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { NextRequest, NextResponse } from 'next/server'

import { isError } from '@/shared/lib/IsError'
import ServicePermissionRedactData from '../../../../../../../Server/Service/ServicePermissionRedactData'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation'
import { ServicePrice } from '../../../../../../../Server/Service/servicePrice'

export async function POST(req: NextRequest, { params }: { params: { INN: string; nameNewPrice: string } }) {
	const { INN, nameNewPrice } = params
	
	const requestData = await req.json()
	
	const { dataGeo } = requestData as { dataGeo: Omit<TGeoLocation, 'date'> }
	

	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.price)
	const solutionRedactPrice = await servicePermission.Permission(dataGeo.idEmployee)

	if (!solutionRedactPrice) return NextResponse.json('refusal', { status: 403 })

	const serviceGeo = new ServiceGeoLocation(INN)
	const servicePrice = new ServicePrice(INN)

	const result = await Promise.all([serviceGeo.setDataLocation(dataGeo), servicePrice.addNewPrice(nameNewPrice)])

	const error = result.find(res=>isError(res))
	//@ts-ignore
	return NextResponse.json(error || result[1].idTable,{status:200})
	
	
}
