import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { NextRequest, NextResponse } from 'next/server'
import ServicePermissionRedactData from '../../../../../../Server/Service/ServicePermissionRedactData'
import { ROOT_LINK } from '@/shared/model/types/enums'
import { ServicePrice } from '../../../../../../Server/Service/servicePrice'
import { ServiceGeoLocation } from '../../../../../../Server/Service/serviceGeoLocation'
import { isError } from '@/shared/lib/IsError'

export async function POST(req: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const requestData = await req.json()
	const {newNamePrice,idPrice,dataGeo} = requestData as { newNamePrice: string; idPrice: string; dataGeo: Omit<TGeoLocation, 'date'> }
	const servicePermission = new ServicePermissionRedactData(INN,ROOT_LINK.price)
	const solutionRedactPrice = await servicePermission.Permission(dataGeo.idEmployee)

	if(!solutionRedactPrice)return NextResponse.json('refusal',{status:403})
	
	const servicePrice= new ServicePrice(INN)
	const serviceGeo = new ServiceGeoLocation(INN)
	
	const result = await Promise.all([
		serviceGeo.setDataLocation(dataGeo),servicePrice.renamePrice(newNamePrice,idPrice)		
	])
	const error = result.find(res=>isError(res))

	return NextResponse.json(error|| 'OK',{status:200})


}
