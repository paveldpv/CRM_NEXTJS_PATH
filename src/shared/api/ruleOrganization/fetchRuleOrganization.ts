import { serverClient } from '@/shared/lib/api/serverClient'
import { TDataOrganizationDTO, TDataOrganizationFullInfoDTO, TNewDataGeoLocationDTO } from '@/shared/model/types'

export class FetchRuleOrganization {
	static async getParams(INN: string): Promise<TDataOrganizationDTO> {
		const fetch = await serverClient.api<TDataOrganizationDTO>(INN,`${INN}/ruleOrganization/get`, { method: 'GET' })
		return fetch
	}

	static async updateParams(INN: string, data: TDataOrganizationDTO, dataGeo: TNewDataGeoLocationDTO): Promise<void> {
		const dataBody = { data, dataGeo }
		const fetch = await serverClient.api<void>(INN,`${INN}/ruleOrganization/set`, { method: 'PUT', body: JSON.stringify(dataBody) })
		return fetch
	}
}
