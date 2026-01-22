import { serverClient } from '@/shared/lib/api/serverClient'
import { TGlobalListCompany, TNewDataGeoLocationDTO } from '@/shared/model/types'



export class FetchGlobalListCompany {
	// static async getListCompany(range?: number, searchParams?: string): Promise<TGlobalListCompany[]> {
	// 	const fetch = await serverClient.api<TGlobalListCompany[]>("",
	// 		`globalListCompany/get/params?range=${range}&searchParams=${searchParams}`,
	// 		{ method: 'GET' }
	// 	)
		
		
	// 	return fetch
	// }
	static async setVisible(INN: string, visible: boolean, dataGeo: TNewDataGeoLocationDTO): Promise<void> {
		const dataBody = {
			visible,
			dataGeo,
		}
		const fetch = await serverClient.api<void>("INN",`globalListCompany/${INN}/setVisible`, {
			method: 'PUT',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}
	static async updateDescription(INN: string, description: string[], dataGeo: TNewDataGeoLocationDTO): Promise<void> {
		const dataBody = { dataGeo, description }
		const fetch = await serverClient.api<void>("INN",`globalListCompany/${INN}/updateDescription`, {
			method: 'PUT',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}
	// static async getAllListCompany(): Promise<TGlobalListCompany[]> {
	// 	const fetch = await serverClient.api<TGlobalListCompany[]>("",`globalListCompany/get/all`, { method: 'GET' })
	// 	return fetch
	// }
}
