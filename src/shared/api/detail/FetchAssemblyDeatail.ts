import { serverClient } from '@/shared/lib/api/serverClient'
import { TNewDataGeoLocationDTO } from '@/shared/model/types'

export class FetchAssemblyDetail {
	static async removeComponentAssemblyDetail(
		INN: string,
		idAssemblyDetail: string,
		idDetail: string,
		dataGeo: TNewDataGeoLocationDTO,
	): Promise<void> {
		const dataBody = { idDetail, dataGeo }
		const fetch = await serverClient.api<void>(INN, `${INN}/detail/${idAssemblyDetail}/component/remove`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return fetch
		
	}

		static async addComponentAssemblyDetail(
		INN: string,
		idAssemblyDetail: string,
		idDetail: string,
		dataGeo: TNewDataGeoLocationDTO,
	): Promise<void> {
		const dataBody = { idDetail, dataGeo }
		const fetch = await serverClient.api<void>(INN, `${INN}/detail/${idAssemblyDetail}/component/add`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return fetch
		
	}



}
