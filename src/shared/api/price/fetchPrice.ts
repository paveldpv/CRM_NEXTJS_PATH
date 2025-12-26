import { serverClient } from '@/shared/lib/api/serverClient'
import { TNewDataGeoLocationDTO } from '@/shared/model/types'
import { TLink } from '@/shared/model/types/subtypes/Types'
import { TDataTablePriceDTO, TPriceDTO } from '../../../../Server/Service/servicePrice/model/types/Types'

export class FetchPrice {
	static async getPriceById(INN: string, _id: string, phone?: string): Promise<TPriceDTO> {
		const params = new URLSearchParams({ _id })
		if (phone) params.append('phone', phone)

		const fetch = await serverClient.api<TPriceDTO>(`${INN}/price/get?${params}`, { method: 'GET' })
		return fetch
	}

	static async getListInfoPrices(INN: string): Promise<TLink[]> {
		const fetch = await serverClient.api<TLink[]>(`${INN}/price/getList`, { method: 'GET' })
		return fetch
	}

	static async addNewPrice(
		INN: string,
		nameTable: string,
		dataGeo: TNewDataGeoLocationDTO
	): Promise<TDataTablePriceDTO> {
		const dataBody = {
			nameTable,
			dataGeo,
		}
		const fetch = await serverClient.api<TDataTablePriceDTO>(`${INN}/price/create`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}

	static async updatePrice(INN: string, dataTable: TDataTablePriceDTO, dataGeo: TNewDataGeoLocationDTO): Promise<void> {
		const dataBody = {
			dataGeo,
			dataTable,
		}
		const fetch = await serverClient.api<void>(`${INN}/price/update`, { method: 'PUT', body: JSON.stringify(dataBody) })
		return fetch
	}

	static async deletedPrice(INN: string, _id: string, dataGeo: TNewDataGeoLocationDTO): Promise<void> {
		const fetch = await serverClient.api<void>(`${INN}/price/deleted?_id=${_id}`, {
			method: 'POST',
			body: JSON.stringify(dataGeo),
		})
		return fetch
	}

	static async renamePrice(INN: string, newName: string, _id: string, dataGeo: TNewDataGeoLocationDTO): Promise<void> {
		const dataBody = {
			newName,
			_id,
			dataGeo,
		}
		const fetch = await serverClient.api<void>(`${INN}/price/rename`, { method: 'PUT', body: JSON.stringify(dataBody) })
		return fetch
	}
}
