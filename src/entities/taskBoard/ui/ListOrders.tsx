'use client'
import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { TListOrder } from '../model/Types'
import CardOrder from './CardOrder'

export default function ListOrders({ dataOrder, setDataOrder, setDataTask, dataTask }: TListOrder) {
	if (dataOrder?.length === 0) {
		return <p> нет текущих заказов</p>
	} else {
		return (
			<Fieldset title='Все заказы'>
				{dataOrder.map((order) => (
					<CardOrder data={order.data} counterParty={order.counterParty} />
				))}
			</Fieldset>
		)
	}
}
