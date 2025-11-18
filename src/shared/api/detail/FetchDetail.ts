import { serverClient } from '@/shared/lib/api/serverClient'
import { TNewDetailDTO, TNewDataGeoLocationDTO, TDetailDTO, TFullInfoTDetailDTO } from '@/shared/model/types'
import { TResponseUploadFiles } from '@/shared/model/types/subtypes/Types'

export class FetchDetail {
	
	static async addDetailForOrder(INN: string, data: TNewDetailDTO, dataGeo: TNewDataGeoLocationDTO): Promise<TDetailDTO> {
		const dataBody = { data, dataGeo }
		const fetch = await serverClient.api<TDetailDTO>(`${INN}/detail/new`, { method: 'POST', body: JSON.stringify(dataBody) })
		return fetch
	}

	static async removeDetailForOrder(
		INN: string,
		idOrder: string,
		idDetail: string,
		dataGeo: TNewDataGeoLocationDTO
	): Promise<void> {
		const dataBody = {
			idOrder,
			idDetail,
			dataGeo,
		}
		const fetch = await serverClient.api<void>(`${INN}/detail/remove`, { method: 'POST', body: JSON.stringify(dataBody) })
		return fetch
	}

	static async getDetailByIdOrder(INN: string, idOrder: string): Promise<TDetailDTO[]> {
		const fetch = serverClient.api<TDetailDTO[]>(`${INN}/detail/get?idOrder=${idOrder}`, { method: 'GET' })
		return fetch
	}

	static async getDetailFromOrderWithDeleted(INN: string, idOrder: string): Promise<TDetailDTO[]> {
		const fetch = serverClient.api<TDetailDTO[]>(`${INN}/detail/getAll?idOrder=${idOrder}`, { method: 'GET' })
		return fetch
	}

	static async restoreDetail(
		INN: string,
		idOrder: string,
		idDetail: string,
		dataGeo: TNewDataGeoLocationDTO
	): Promise<void> {
		const dataBody = {
			idOrder,
			idDetail,
			dataGeo,
		}
		const fetch = await serverClient.api<void>(`${INN}/detail/restore`, { method: 'POST', body: JSON.stringify(dataBody) })
		return fetch
	}

	static async searchDetail(INN: string, req: string): Promise<TFullInfoTDetailDTO[]> {
		const fetch = await serverClient.api<TFullInfoTDetailDTO[]>(`${INN}/detail/search?req=${req}`, { method: 'GET' })
		return fetch
	}

	static async updateDataDetail(INN: string, data: TDetailDTO, dataGeo: TNewDataGeoLocationDTO): Promise<void> {
		const dataBody = {
			data,
			dataGeo,
		}
		const fetch = await serverClient.api<void>(`${INN}/detail/update`, { method: 'PUT', body: JSON.stringify(dataBody) })
		return fetch
	}

	static async addFilesFromDetail(
		INN: string,
		idDetail: string,
		dataFiles: TResponseUploadFiles[],
		dataGeo: TNewDataGeoLocationDTO
	): Promise<void> {
		const dataBody = { dataFiles, dataGeo }
		const fetch = await serverClient.api<void>(`${INN}/detail/${idDetail}/files/add`, {
			method: 'PUT',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}

	static async removeFileFromDetail(
		INN: string,
		idDetail: string,
		FullPath: string,
		dataGeo: TNewDataGeoLocationDTO
	): Promise<void> {
		const dataBody = { FullPath, dataGeo }
		const fetch = await serverClient.api<void>(`${INN}/detail/${idDetail}/files/remove`, {
			method: 'PUT',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}
	static async addNewStep(INN: string, idDetail: string, name: string, dataGeo: TNewDataGeoLocationDTO): Promise<void> {
		const dataBody = { dataGeo, name }
		const fetch = await serverClient.api<void>(`${INN}/detail/${idDetail}/addNewStep`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}
	static async completedStepStatusDetail(
		INN: string,
		idDetail: string,
		name: string,
		dataGeo: TNewDataGeoLocationDTO
	): Promise<void> {
		const dataBody = { dataGeo, name }
		const fetch = await serverClient.api<void>(`${INN}/detail/${idDetail}/completedStep`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}
	static async completedDetail(
		INN: string,
		idDetail: string,
		idOrder: string,
		dataGeo: TNewDataGeoLocationDTO
	): Promise<void> {
		const dataBody = {
			dataGeo,
			idOrder,
		}
		const fetch = await serverClient.api<void>(`${INN}/detail/${idDetail}/completed`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}
}
