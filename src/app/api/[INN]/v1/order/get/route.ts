import { isError } from '@/shared/lib/IsError'
import { TOrder } from '@/shared/model/types'
import { TOptionQuery } from '@/shared/model/types/subtypes/optionQuery'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceOrder } from '../../../../../../../Server/Service/serviceOrder/serviceOrder'
import { TOrderFullInfo } from '../../../../../../../Server/Service/serviceOrder/model/types/Types'
import { ServiceOrderFullInfo } from '../../../../../../../Server/Service/serviceOrder/order.dto'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()

	const {
		completed = false,
		deleted = false,
		option,
	} = body as {
		deleted?: boolean
		completed?: boolean
		option?: TOptionQuery<TOrder>
	}

	const service = new ServiceOrder(INN)
	const result = await service.getOrders({
		completed,
		deleted,
		option,
	})

	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}
	const ordersDTO = ServiceOrderFullInfo.createListOrderFullInfoDTO(result as TOrderFullInfo[])
	return NextResponse.json(ordersDTO, { status: 200 })
}
