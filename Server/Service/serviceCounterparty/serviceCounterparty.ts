import { fetchDeletedFile } from '@/shared/api/file_manager/deletedFile'
import { isError } from '@/shared/lib/IsError'
import { getAbbreviated } from '@/shared/lib/utils/getAbbreviated'
import { TError } from '@/shared/model/types/subtypes/TError'
import { TResponseUploadFiles } from '@/shared/model/types/subtypes/Types'

import { Service } from '../../classes/Service'

import { TOptionQuery } from '@/shared/model/types/optionQuery'
import { Types } from 'mongoose'
import { ServiceDaDataOrganization } from '../serviceDaData/serviceDaDataOrganization'
import { ServiceRequisites } from '../serviceRequisites/serviceReqisites'
import ControllerCounterpartyDB from './controller/CounterPartyDB.controller'
import { TCounterparty, TNewDataCounterparty } from './models/types/Types'

export class ServiceCounterparty extends Service {
	constructor(INN: string) {
		super(INN)
	}

	public async createNewCounterparty(newCounterparty: TNewDataCounterparty): Promise<void | TError> {
		const dateCreate = new Date()
		let newDataCounterParty: Omit<TCounterparty, '_id'> = {
			dateCreate,
			safeDeleted: false,
			...newCounterparty,
		}
		try {
			if ('INN' in newCounterparty && newCounterparty.INN) {
				const serviceDaData = new ServiceDaDataOrganization(this.INN)
				let daData = await serviceDaData.getDaDataByINN(newCounterparty.INN)
				if (!daData) {
					daData = await serviceDaData.addDaData({ query: newCounterparty.INN })
				}
				if (isError(daData)) {
					throw Error(daData.message)
				} else {
					const serviceRequisites = new ServiceRequisites(this.INN)
					await serviceRequisites.addNewRequisites(daData)
					const nameOrganization = daData?.data?.name?.full || ''
					const emailOrganization = daData?.data?.emails[0].value || ''

					newDataCounterParty = {
						...newDataCounterParty,
						email: emailOrganization,
						data: [...(newDataCounterParty.data || []), { description: getAbbreviated(nameOrganization) }],
					}
				}
			}

			const controllerCounterpartyDB = new ControllerCounterpartyDB(this.INN)
			await controllerCounterpartyDB.addNewCounterparty(newDataCounterParty)
		} catch (error) {
			return this.createError(
				`error create new counterparty,data new counterparty :${newCounterparty},error ;${error}`,
				error
			)
		}
	}
	public async updateCounterparty(data: TCounterparty): Promise<TError | void> {
		try {
			const controllerCounterpartyDB = new ControllerCounterpartyDB(this.INN)
			await controllerCounterpartyDB.updateCounterparty(data)
		} catch (error) {
			return this.createError(`error update counterparty ,data :${data} ,error :${error}`, error)
		}
	}
	public async deletedCounterparty(_id: Types.ObjectId) {
		try {
			const controllerCounterpartyDB = new ControllerCounterpartyDB(this.INN)
			await controllerCounterpartyDB.removeCounterparty(_id)
		} catch (error) {
			return this.createError(`error deleted counterparty id: ${_id} error :${error}`, error)
		}
	}
	public async getCounterpartyByID(_id: Types.ObjectId): Promise<TError | TCounterparty> {
		try {
			const controllerCounterpartyDB = new ControllerCounterpartyDB(this.INN)
			const data = await controllerCounterpartyDB.getCounterpartyByID(_id)

			if (data) {
				return this.normalizeDataFromMongoDB(data)
			} else {
				return this.createError(`error , by id  not found data , id :${_id}`)
			}
		} catch (error) {
			return this.createError(`error get counterparty by id ,id${_id},error :${error}`, error)
		}
	}
	public async getAllCounterparty(option?: TOptionQuery<TCounterparty>): Promise<TError | TCounterparty[]> {
		try {
			const controllerCounterpartyDB = new ControllerCounterpartyDB(this.INN)
			const data = await controllerCounterpartyDB.getAllCounterparty(option)
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			return this.createError(`error get all counterparty, error ${error}`)
		}
	}
	public async getAllCounterpartyWithDeleted(option?: TOptionQuery<TCounterparty>): Promise<TError | TCounterparty[]> {
		try {
			const controllerCounterpartyDB = new ControllerCounterpartyDB(this.INN)
			const data = await controllerCounterpartyDB.getAllCounterpartyWithDeleted(option)
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			return this.createError(`error get all counterparty, error ${error}`)
		}
	}
	public async deletedFileRequitesCounterparty(_id: Types.ObjectId, fileInfo: TResponseUploadFiles): Promise<void | TError> {
		try {
			const controllerCounterpartyDB = new ControllerCounterpartyDB(this.INN)
			await Promise.all([fetchDeletedFile(fileInfo.FullPath), controllerCounterpartyDB.deletedRequisites(_id)])
		} catch (error) {
			return this.createError(
				`error deleted file requites from counterparty ,id ${_id} ,file info ${fileInfo}, error ${error}`,
				error
			)
		}
	}
	public async searchCounterparty(query: string, withDeleted: boolean): Promise<TCounterparty[] | null | TError> {
		try {
			const searchRegEx = new RegExp(query, 'i')
			const controllerCounterpartyDB = new ControllerCounterpartyDB(this.INN)
			const searchData = await controllerCounterpartyDB.searchCounterparty(searchRegEx, withDeleted)
			return this.normalizeDataFromMongoDB(searchData)
		} catch (error) {
			return this.createError(`error search counterparty ,INN:${this.INN} , query :${query} `, error)
		}
	}
	public async getCounterpartyByListID(_ids: Types.ObjectId[]): Promise<TCounterparty[] | TError> {
		try {
			const controllerCounterpartyDB = new ControllerCounterpartyDB(this.INN)
			const data = await controllerCounterpartyDB.getCounterpartyByListID(_ids)
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			return this.createError(`error get counterparty by list id ids ${_ids}, INN:${this.INN}`)
		}
	}
}
