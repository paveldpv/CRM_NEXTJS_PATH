import { isError } from '@/shared/lib/IsError'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ServiceDetails } from '../../../../../../../Server/Service/serviceDetails/serviceDetails'
import { ServiceDetailDTO } from '../../../../../../../Server/Service/serviceDetails/detail.dto'
import { TDetail } from '../../../../../../../Server/Service/serviceDetails/model/types/Types'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const url = new URL(request.url)
	const idOrder = url.searchParams.get('idOrder')
	if (!idOrder) {
		return NextResponse.json({ error: 'idOrder query parameter is required' }, { status: 400 })
	}
	const orderId = MongoHelpers.stringToObjectId(idOrder)
	if (orderId == null) {
		return NextResponse.json({ message: 'Invalid order ID format' }, { status: 400 })
	}
	const service = new ServiceDetails(INN)
	const result = await service.getDetailsByIdOrder(orderId)
	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}

	const detailsDTO = ServiceDetailDTO.createListDetailDTO(result as TDetail[])
	return NextResponse.json(detailsDTO, { status: 200 })
	
}
