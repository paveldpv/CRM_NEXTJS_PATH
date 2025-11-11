import { serverClient } from '@/shared/lib/api/serverClient'
import { TGeolLocationFullInfoDTO, TGeoLocation, TNewDataGeoLocationDTO } from '@/shared/model/types'
import { TOptionQuery } from '@/shared/model/types/subtypes/optionQuery'

export class FetchGeoLocation {
	static async getData(INN: string, option?: TOptionQuery<TGeoLocation>): Promise<TGeolLocationFullInfoDTO[]> {		
		const fetch = await serverClient.api<TGeolLocationFullInfoDTO[]>(`${INN}/get`, { method: 'POST' ,body:JSON.stringify(option)})
		return fetch
	}
	static async setDate(INN: string, data: TNewDataGeoLocationDTO): Promise<void> {
		const fetch = await serverClient.api<void>(`${INN}/set`,{method:'POST',body:JSON.stringify(data)})
		return fetch
	}
}
