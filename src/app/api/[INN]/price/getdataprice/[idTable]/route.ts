import { NextRequest, NextResponse } from 'next/server'
import { ServicePrice } from '../../../../../../../Server/Service/servicePrice/servicePrice'


export async function GET(req:NextRequest,{params}:{params:{INN:string,idTable:string}}){
	
	const {INN,idTable}=params
	
	const employeePhone = req.nextUrl.searchParams.get('employeephone')
	
	const servicePrice = new ServicePrice(INN)

	const result = await servicePrice.getPriceByID(idTable,employeePhone?employeePhone:undefined)
	return NextResponse.json(result,{status:200})
}