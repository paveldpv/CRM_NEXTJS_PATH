import { serverClient } from '@/shared/lib/api/serverClient'
import { TNewDataGeoLocationDTO, TPropertyDetailDTO } from '@/shared/model/types'

export class FetchPropertyDetail {
	static async addPropertyDetail(INN: string, property: string, dataGeo: TNewDataGeoLocationDTO): Promise<void> {
		const dataBody = {
			property,
			dataGeo,
		}
		const fetch = await serverClient.api<void>(INN,`${INN}/propertyDetail/add`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}

	static async removePropertyDetail(INN: string, idProperty: string, dataGeo: TNewDataGeoLocationDTO): Promise<void> {
		const dataBody = {
			idProperty,
			dataGeo,
		}
		const fetch = await serverClient.api<void>(INN,`${INN}/propertyDetail/remove`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}

	static async getProperties(INN: string): Promise<TPropertyDetailDTO[]> {
		const fetch = await serverClient.api<TPropertyDetailDTO[]>(INN,`${INN}/propertyDetail/get`, {
			method: 'GET',
		})
		return fetch
	}

	static async searchProperties(INN: string, dataSearch: string): Promise<TPropertyDetailDTO[]> {
		const fetch = await serverClient.api<TPropertyDetailDTO[]>(INN,
			`${INN}/propertyDetail/search?search=${encodeURIComponent(dataSearch.trim())}`,
			{ method: 'GET' }
		)
		return fetch
	}
}
