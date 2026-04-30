
import { isError } from '@/shared/lib/IsError'
import { TOrderFullInfoDTO } from '@/shared/model/types'
import { Metadata } from 'next'

import { ServiceOrder } from '../../../../../../Server/Service/serviceOrder/serviceOrder'
import GeneralOrderList from '@/entities/orderList/ui/GeneralOrderList'
import { ServiceOrderFullInfoDTO } from '../../../../../../Server/Service/serviceOrder/order.dto'

export const metadata: Metadata = {
	title: 'Заказы',
	description: 'Обработка заказов',
}

async function dataOrder(INN: string): Promise<{ data: TOrderFullInfoDTO[]; totalOrders: number } | null> {
	const serviceOrder = new ServiceOrder(INN)
	const [data, totalOrders] = await Promise.all([
		serviceOrder.getOrders({ completed: false, deleted: false }),
		serviceOrder.getAmountOrder({ completed: false, deleted: false }),
	])

	if (isError(data) || isError(totalOrders)) {
		return null
	}
	return {
		data: data ? ServiceOrderFullInfoDTO.createListOrderFullInfoDTO(data) : [],
		totalOrders: totalOrders ? totalOrders : 0,
	}
}

export default async function page({ params }: { params: { INN: string; USER_ID: string } }) {
	const { INN } = params
	const initialDataOrder = await dataOrder(INN)

	if (!initialDataOrder) {
		<div></div>
	}
	return <GeneralOrderList data={initialDataOrder?.data!} totalOrders={initialDataOrder?.totalOrders!} />
}
