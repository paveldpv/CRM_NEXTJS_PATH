import { serverClient } from '@/shared/lib/api/serverClient'
import { TDataOrganizationDTO, TDataOrganizationFullInfoDTO, TNewDataGeoLocationDTO } from '@/shared/model/types'

export class FetchRuleOrganization {
	static async getParams(INN: string): Promise<TDataOrganizationFullInfoDTO> {
		const fetch = await serverClient.api<TDataOrganizationFullInfoDTO>(`${INN}/get`, { method: 'GET' })
		return fetch
	}

	static async updateParams(INN: string, data: TDataOrganizationDTO, dataGeo: TNewDataGeoLocationDTO): Promise<void> {
		const dataBody = { data, dataGeo }
		const fetch = await serverClient.api<void>(`${INN}/set`, { method: 'PUT', body: JSON.stringify(dataBody) })
		return fetch
	}
}
