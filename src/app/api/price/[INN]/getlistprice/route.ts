import { NextRequest, NextResponse } from 'next/server'
import { ServicePrice } from '../../../../../../Server/Service/servicePrice'

export async function GET(req:NextRequest,{params}:{params:{INN:string}}){
	const {INN}=params
	const servicePrice = new ServicePrice(INN)
	const result = await servicePrice.getListInfoPrices()

	return NextResponse.json(result,{status:200})
}