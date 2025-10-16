import { TDataTablePrice } from '@/entities/price/model/Types'

import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { NextRequest, NextResponse } from 'next/server'

import { isError } from '@/shared/lib/IsError'
import ServicePermissionRedactData from '../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ServiceGeoLocation } from '../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ServicePrice } from '../../../../../../Server/Service/servicePrice/servicePrice'
import { ROOT_LINK } from '../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'

export async function POST(req: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const requestData = await req.json()
	const { data, dataGeo } = requestData as { data: TDataTablePrice; dataGeo: Omit<TGeoLocation, 'date'> }
	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.price)
	
	
	const solutionRedactPrice = await servicePermission.Permission(dataGeo.idEmployee)
	

	if (!solutionRedactPrice) return NextResponse.json('refusal', { status: 403 })

	const serviceGeoLocation = new ServiceGeoLocation(INN)
	const servicePrice = new ServicePrice(INN)
	const result = await Promise.all([serviceGeoLocation.setDataLocation(dataGeo), servicePrice.updatePrice(data)])

	const error = result.find(res=>isError(res))
	return NextResponse.json(error || 'OK', { status: 200 })
}
