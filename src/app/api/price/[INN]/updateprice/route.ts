import { TDataTablePrice } from '@/entities/price/model/Types'
import { ROOT_LINK } from '@/shared/model/types/enums'
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceGeoLocation } from '../../../../../../Server/Service/serviceGeoLocation'
import ServicePermissionRedactData from '../../../../../../Server/Service/ServicePermissionRedactData'
import { ServicePrice } from '../../../../../../Server/Service/servicePrice'
import { isError } from '@/shared/lib/IsError'

export async function POST(req: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const requestData = await req.json()
	const { data, dataGeo } = requestData as { data: TDataTablePrice; dataGeo: Omit<TGeoLocation, 'date'> }
	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.price)
	const solutionRedactPrice = await servicePermission.Permission(dataGeo.idEmployee)

	if (!solutionRedactPrice) return NextResponse.json('refusal', { status: 200 })

	const serviceGeoLocation = new ServiceGeoLocation(INN)
	const servicePrice = new ServicePrice(INN)
	const result = await Promise.all([serviceGeoLocation.setDataLocation(dataGeo), servicePrice.updatePrice(data)])

	const error = result.find(res=>isError(res))
	return NextResponse.json(error || 'OK', { status: 200 })
}
