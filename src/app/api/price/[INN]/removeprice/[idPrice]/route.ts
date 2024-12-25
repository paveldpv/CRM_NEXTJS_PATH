import { NextRequest, NextResponse } from 'next/server'
import ServicePermissionRedactData from '../../../../../../../Server/Service/ServicePermissionRedactData'
import { ROOT_LINK } from '@/shared/model/types/enums'
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { ServicePrice } from '../../../../../../../Server/Service/servicePrice'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation'
import { isError } from '@/shared/lib/IsError'

export async function POST(req: NextRequest, { params }: { params: { INN: string,idPrice:string } }) {
	const {INN,idPrice}=params
	if(idPrice==='initialPrice')return NextResponse.json({error:true,message:'impossible remove initial price '},{status:2000})
	const requestData = await req.json()
	const {dataGeo} =requestData as {dataGeo:Omit<TGeoLocation,'date'>}
	const servicePermission = new ServicePermissionRedactData(INN,ROOT_LINK.price)
	const solutionRedactPrice = await servicePermission.Permission(dataGeo.idEmployee)

	if(!solutionRedactPrice)return NextResponse.json('refusal',{status:403})

	const servicePrice = new ServicePrice(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)

	const result =await Promise.all([
		servicePrice.deletedPrice(idPrice),
		serviceGeoLocation.setDataLocation(dataGeo)

	])

	const error = result.find(res=>isError(res))

	return NextResponse.json(error|| 'OK',{status:200})



	
}