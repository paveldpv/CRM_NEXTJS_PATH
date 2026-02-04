import GeneralOrder from '@/entities/order/ui/GeneralOrder'
import { isError } from '@/shared/lib/IsError'
import { TOrderFullInfoDTO } from '@/shared/model/types'
import { typicalError } from '@/shared/model/types/subtypes/enums'
import { Metadata } from 'next'
import { ServiceOrderFullInfo } from '../../../../../../Server/Service/serviceOrder/order.dto'
import { ServiceOrder } from '../../../../../../Server/Service/serviceOrder/serviceOrder'

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
	console.log("🚀 ~ dataOrder ~ totalOrders:", totalOrders)
	console.log("🚀 ~ dataOrder ~ data:", data)
	
	if (isError(data)  || isError(totalOrders) ) {
		return null
	}

	
	return {
		data: data?ServiceOrderFullInfo.createListOrderFullInfoDTO(data):[],
		totalOrders:totalOrders?totalOrders:0,
	}
}

export default async function page({ params }: { params: { INN: string; USER_ID: string } }) {
	const { INN } = params
	const initialDataOrder = await dataOrder(INN)
	console.log("🚀 ~ page ~ initialDataOrder:", initialDataOrder)

	if (!initialDataOrder  ) {
		<div></div>
	}
	return <GeneralOrder data={initialDataOrder?.data!} totalOrders={initialDataOrder?.totalOrders!} />
}
