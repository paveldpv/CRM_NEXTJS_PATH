import { serverClient } from '@/shared/lib/api/serverClient'
import { TDBRequestPrevCalcDTO, TNewDataGeoLocationDTO, TRequestPrevCalc } from '@/shared/model/types'
import { TOptionQuery } from '@/shared/model/types/subtypes/optionQuery'

export class FetchPrevCalc {
	static async saveRequest(INN: string, data: TRequestPrevCalc) {
		const fetch = await serverClient.api<void>(`${INN}/prevCalc/new`, {
			method: 'POST',
			body: JSON.stringify(data),
		})
		return fetch
	}

	static async deletedRequest(INN: string, idRequest: string, dataGeo: TNewDataGeoLocationDTO) {
		const dataBody = {
			idRequest,
			dataGeo,
		}
		const fetch = await serverClient.api<void>(`${INN}/prevCalc/deleted`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}

	static async getRequestPrevCalc(INN: string, option?: TOptionQuery<TRequestPrevCalc>) {
		const fetch = serverClient.api<TDBRequestPrevCalcDTO[]>(`${INN}/prevCalc/get`, {
			method: 'POST',
			body: JSON.stringify(option),
		})
		return fetch
	}

	static async getFavoritePrevCalc(INN: string, option?: TOptionQuery<TRequestPrevCalc>) {
		const fetch = serverClient.api<TDBRequestPrevCalcDTO[]>(`${INN}/prevCalc/getFavorite`, {
			method: 'POST',
			body: JSON.stringify(option),
		})
		return fetch
	}

	static async setFavoritePrevCall(
		INN: string,
		payload: { idRequest: string; isFavorite: boolean },
		dataGeo: TNewDataGeoLocationDTO
	) {
		const dataBody = {
			payload,
			dataGeo,
		}
		const fetch = await serverClient.api<void>(`${INN}/prevCalc/setFavorite`, {
			method: 'PUT',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}
	static async getDeletedRequest(INN: string) {
		const fetch = await serverClient.api<TDBRequestPrevCalcDTO[]>(`${INN}/prevCalc/get/deleted`, { method: 'GET' })
		return fetch
	}
	static async restoreRequest(INN: string, idRequest: string, dataGeo: TNewDataGeoLocationDTO) {
		const dataBody = { dataGeo, idRequest }
		const fetch = await serverClient.api<void>(`${INN}/prevCalc/restore`, {
			method: 'PUT',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}
	static async getNewRequest(INN: string) {
		const fetch = await serverClient.api<TDBRequestPrevCalcDTO>(`${INN}/prevCalc/get/new`, { method: 'GET' })
		return fetch
	}
	public async setVerifiedRequest(INN: string, idRequest: string, dataGeo: TNewDataGeoLocationDTO) {
		const dataBody = { idRequest, dataGeo }
		const fetch = await serverClient.api<void>(`${INN}/prevCalc/set/verified`, {
			method: 'PUT',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}
	static async setVerifiedRequestMany(INN: string, ids: string[], dataGeo: TNewDataGeoLocationDTO) {
		const dataBody = {
			ids,
			dataGeo,
		}
		const fetch = await serverClient.api<void>(`${INN}/prevCalc/set/verifiedMany`, {
			method: 'PUT',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}
}
