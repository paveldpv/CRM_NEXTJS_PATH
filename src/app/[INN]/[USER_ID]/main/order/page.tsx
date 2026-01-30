import { TOrderFullInfoDTO } from '@/shared/model/types'
import { TError } from '@/shared/model/types/subtypes/TError'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Заказы',
	description: 'Обработка заказов',
}

async function dataOrder(INN: string): Promise<TOrderFullInfoDTO[] | TError | null> {}

export default async function page({ params }: { params: { INN: string; USER_ID: string } }) {
	const { INN, USER_ID } = params
	const initialDataOrder = await dataOrder(INN)
	return <div>Заказы</div>
}
