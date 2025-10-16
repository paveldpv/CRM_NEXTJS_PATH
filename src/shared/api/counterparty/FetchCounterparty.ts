import { serverClient } from '@/shared/lib/api/serverClient'
import { TOptionQuery } from '@/shared/model/types/optionQuery'
import { TResponseUploadFiles } from '@/shared/model/types/Types'
import {
	TCounterparty,
	TCounterpartyDTO,
	TNewDataCounterparty,
} from '../../../../Server/Service/serviceCounterparty/models/types/Types'
import { TGeolLocationDTO } from '../../../../Server/Service/serviceGeoLocation/model/types/type'

export class FetchCounterparty {

	static async createCounterparty(
		INN: string,
		data: TNewDataCounterparty,
		dataGeo: TGeolLocationDTO
	): Promise<void> {

		const dataBody = {
			data,
			dataGeo,
		}
		await serverClient.api<void>(`${INN}/counterparty/create`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return
	}

	static async updateCounterparty(
		INN: string,
		data: TCounterpartyDTO,
		dataGeo: TGeolLocationDTO
	): Promise<void> {
		const dataBody = {
			data,
			dataGeo,
		}
		await serverClient.api<void>(`${INN}/counterparty/update`, {
			method: 'PUT',
			body: JSON.stringify(dataBody),
		})
		return
	}

	static async deletedCounterparty(INN: string, _id: string, dataGeo: TGeolLocationDTO): Promise<void> {
		await serverClient.api<void>(`${INN}/counterparty/remove/${_id}`, {
			method: 'POST',
			body: JSON.stringify(dataGeo),
		})
		return
	}

	static async getAllCounterparty(
		INN: string,
		option?: TOptionQuery<TCounterparty>
	): Promise<TCounterpartyDTO[]> {
		const data = await serverClient.api<TCounterpartyDTO[]>(`${INN}/counterparty/all`, {
			method: 'POST',
			body: JSON.stringify(option),
		})
		return data
	}
	static async getAllCounterpartyWithDeleted(
		INN: string,
		option?: TOptionQuery<TCounterparty>
	): Promise<TCounterpartyDTO[]> {
		const data = await serverClient.api<TCounterpartyDTO[]>(`${INN}/counterparty/allWithDeleted`, {
			method: 'POST',
			body: JSON.stringify(option),
		})
		return data
	}


	static async deletedFileRequitesCounterparty(
		INN: string,
		_id: string,
		file: TResponseUploadFiles,
		dataGeo: TGeolLocationDTO
	): Promise<void> {

		const dataBody = { file, dataGeo }
		await serverClient.api<void>(`${INN}/counterparty/file/remove/${_id}`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return
	}
	static async searchCounterparty(INN: string, query: string,withDeleted:boolean): Promise<TCounterpartyDTO[] | null> {
		const data = await serverClient.api<TCounterpartyDTO[]>(`${INN}/counterparty/query?query=${query}&withDeleted=${withDeleted}`, {
			method: 'GET',			
		})
		return data
	}
}
