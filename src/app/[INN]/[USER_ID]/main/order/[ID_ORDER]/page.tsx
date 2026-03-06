import { TGeneralFormOrder } from '@/entities/order/model/Types'
import GeneralFormOrder from '@/entities/order/ui/form/GeneralFormOrder'
import { isError } from '@/shared/lib/IsError'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { CounterpartyDTO } from '../../../../../../../Server/Service/serviceCounterparty/counterparty.dto'
import { ServiceCounterparty } from '../../../../../../../Server/Service/serviceCounterparty/serviceCounterparty'
import { ServiceOrderFullInfoDTO } from '../../../../../../../Server/Service/serviceOrder/order.dto'
import { ServiceOrder } from '../../../../../../../Server/Service/serviceOrder/serviceOrder'

async function getDataOrderPage(params: { INN: string; ID_ORDER: string }): Promise<TGeneralFormOrder | null> {
	const { ID_ORDER, INN } = params
	if (ID_ORDER === 'NEW_ORDER') {
		const serviceCounterparty = new ServiceCounterparty(INN)
		const listOrder = await serviceCounterparty.getAllCounterparty()
		if (isError(listOrder)) {
			return null
		}
		return {
			listCounterparty: CounterpartyDTO.createListCounterpartyDTO(listOrder),
		}
	} else {
		const idOrder = MongoHelpers.stringToObjectId(ID_ORDER)

		if (!idOrder) {
			return null
		}

		const serviceOrder = new ServiceOrder(INN)
		const data = await serviceOrder.getOrderByID(idOrder)

		if (isError(data) || !data) {
			return null
		}
		return {
			order: ServiceOrderFullInfoDTO.createOrderFullInfoDTO(data),
		}
	}
}

export default async function page({ params }: { params: { INN: string; USER_ID: string; ID_ORDER: string } }) {
	const dataOrderPage = await getDataOrderPage(params)
	if (!dataOrderPage) {
		return <div>Ошибка загрузки данных</div>
	}

	return <GeneralFormOrder listCounterparty={dataOrderPage.listCounterparty} order={dataOrderPage.order} />
}
