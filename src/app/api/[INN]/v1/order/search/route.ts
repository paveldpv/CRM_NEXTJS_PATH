import { NextRequest, NextResponse } from 'next/server'

import { isError } from '@/shared/lib/IsError'
import { ServiceOrder } from '../../../../../../../Server/Service/serviceOrder/serviceOrder'
import { TOrderFullInfo } from '../../../../../../../Server/Service/serviceOrder/model/types/Types'
import { ServiceOrderFullInfo } from '../../../../../../../Server/Service/serviceOrder/order.dto'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const url = new URL(request.url)
	const { searchParams } = new URL(request.url)
	const dateStartStr = searchParams.get('dateStart')
	const dateEndStr = searchParams.get('dateEnd')
	if (!dateStartStr || !dateEndStr) {
		return NextResponse.json({ error: 'dateStart and dateEnd query parameters are required' }, { status: 400 })
	}

	const dateStart = new Date(dateStartStr)
	const dateEnd = new Date(dateEndStr)
	if (isNaN(dateStart.getTime()) || isNaN(dateEnd.getTime())) {
		return NextResponse.json({ error: 'Invalid date format. Use ISO string format' }, { status: 400 })
	}
	if (dateStart > dateEnd) {
		return NextResponse.json({ error: 'dateStart must be before or equal to dateEnd' }, { status: 400 })
	}

	const service = new ServiceOrder(INN)
	const result = await service.searchOrderByDate({ dateStart, dateEndDate: dateEnd })

	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}
	const ordersDTO = ServiceOrderFullInfo.createListOrderFullInfoDTO(result as TOrderFullInfo[])
	return NextResponse.json(ordersDTO, { status: 200 })


}
