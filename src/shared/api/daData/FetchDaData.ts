import { serverClient } from '@/shared/lib/api/serverClient'
import { TGeolLocationDTO, TDaDataOrganizationDTO } from '@/shared/model/types'

export class FetchDaData {
	static async updateDaData(
		INN: string,
		INNqueryOrganization: string,
		idQueryOrganization: string,
		dataGeo: TGeolLocationDTO
	): Promise<TDaDataOrganizationDTO> {
		const dataBody = {
			INNqueryOrganization,
			idQueryOrganization,
			dataGeo,
		}
		const updateDaData = await serverClient.api<TDaDataOrganizationDTO>(`${INN}/daData/update`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return updateDaData
	}
	static async getDaDataByINN(INN: string, queryINN: string): Promise<TDaDataOrganizationDTO> {
		const getDataData = await serverClient.api<TDaDataOrganizationDTO>(`${INN}/daData/get/INN`, {
			method: 'POST',
			body: JSON.stringify({ queryINN }),
		})
		return getDataData
	}
	static async getAllDaData(INN: string): Promise<TDaDataOrganizationDTO[]> {
		const getAllDaData = await serverClient.api<TDaDataOrganizationDTO[]>(`${INN}/daData/get/all`, { method: 'GET' })
		return getAllDaData
	}
	static async getAllDaDataWithDeleted(INN: string): Promise<TDaDataOrganizationDTO[]> {
		const getAllDaDataWithDeleted = await serverClient.api<TDaDataOrganizationDTO[]>(`${INN}/daData/get/withDeleted`, {
			method: 'GET',
		})
		return getAllDaDataWithDeleted
	}
}
