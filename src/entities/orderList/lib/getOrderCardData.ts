import { TOrderFullInfoDTO } from '@/shared/model/types'

export const getOrderCardData = (order: TOrderFullInfoDTO) => {
	const phone = order.CounterParty?.phone || ''
	const displayName = order.CounterParty?.name || 'Без имени'
	const detailsCount = order.details?.length || 0
	const startDate = order.service?.deadlines?.startDate
	const endDate = order.service?.deadlines?.endDate
	const progress = order.processCompleted || 0

	return {
		phone,
		displayName,
		detailsCount,
		startDate,
		endDate,
		progress,
	}
}

export type TOrderCardData = ReturnType<typeof getOrderCardData>