import { serverClient } from '@/shared/lib/api/serverClient'
import { TNewDataGeoLocationDTO, TNewOrderDTO, TOrder, TOrderDTO, TOrderFullInfoDTO } from '@/shared/model/types'
import { TOptionQuery } from '@/shared/model/types/subtypes/optionQuery'

export class FetchOrder {
	static async createOrder(
		INN: string,
		data: TNewOrderDTO,
		dataGeo: TNewDataGeoLocationDTO
	): Promise<TOrderFullInfoDTO> {
		const dataBody = {
			data,
			dataGeo,
		}
		const fetch = await serverClient.api<TOrderFullInfoDTO>(INN,`${INN}/order/create`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}

	static async restoreOrder(INN: string, idOrder: string, dataGeo: TNewDataGeoLocationDTO): Promise<void> {
		const dataBody = { idOrder, dataGeo }
		const fetch = await serverClient.api<void>(INN,`${INN}/order/restore`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}

	static async removeOrder(INN: string, idOrder: string, dataGeo: TNewDataGeoLocationDTO): Promise<void> {
		const dataBody = {
			idOrder,
			dataGeo,
		}
		const fetch = await serverClient.api<void>(INN,`${INN}/order/remove`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}

	static async getOrders(
		INN: string,
		deleted = false,
		completed = false,
		option: TOptionQuery<TOrder>
	): Promise<TOrderFullInfoDTO[]> {
		const dataBody = {
			deleted,
			completed,
			option,
		}
		const fetch = await serverClient.api<TOrderFullInfoDTO[]>(INN,`${INN}/order/get`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}

	static async searchOrderByDate(INN: string, dateStart: Date, dateEndDate: Date): Promise<TOrderFullInfoDTO[]> {
		const params = new URLSearchParams({
			dateStart: dateStart.toISOString(),
			dateEnd: dateEndDate.toISOString(),
		})
		const fetch = await serverClient.api<TOrderFullInfoDTO[]>(INN,`${INN}/order/search?${params}`, { method: 'GET' })
		return fetch
	}

	static async updateOrder(INN: string, data: TOrderDTO, dataGeo: TNewDataGeoLocationDTO): Promise<void> {
		const dataBody = {
			data,
			dataGeo,
		}
		const fetch = await serverClient.api<void>(INN,`${INN}/order/update`, { method: 'PUT', body: JSON.stringify(dataBody) })
		return fetch
	}

	static async completedOrder(INN: string, idOrder: string, dataGeo: TNewDataGeoLocationDTO): Promise<void> {
		const dataBody = { idOrder, dataGeo }
		const fetch = await serverClient.api<void>(INN,`${INN}/order/competed`, {
			method: 'PUT',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}
}
