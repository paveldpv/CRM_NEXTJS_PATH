import { serverClient } from '@/shared/lib/api/serverClient'
import { TNewDataGeoLocationDTO, TRequisitesDTO } from '@/shared/model/types'

export class FetchRequisites {
	static async getCurrentOrganizationRequisites(INN: string): Promise<TRequisitesDTO> {
		const fetch = await serverClient.api<TRequisitesDTO>(`${INN}/requisites/get/current`, { method: 'GET' })
		return fetch
	}

	static async getAllCounterpartyRequisites(INN: string): Promise<TRequisitesDTO[]> {
		const fetch = await serverClient.api<TRequisitesDTO[]>(`${INN}/requisites/get/all`, { method: 'GET' })
		return fetch
	}

	static async deleteRequisites(INN: string, targetINN: string, dataGeo: TNewDataGeoLocationDTO): Promise<void> {
		const fetch = await serverClient.api<void>(`${INN}/requisites/deleted?targetINN=${targetINN}`, {
			method: 'POST',
			body: JSON.stringify(dataGeo),
		})
		return fetch
	}

	static async updateRequisites(INN: string, dataGeo: TNewDataGeoLocationDTO, data: TRequisitesDTO): Promise<void> {
		const dataBody = {
			data,
			dataGeo,
		}
		const fetch = await serverClient.api<void>(`${INN}/requisites/update/all`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}
}
