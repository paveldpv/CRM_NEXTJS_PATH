import { TError } from '@/shared/model/types/subtypes/TError'
import { TDataOrganization, TNameOrganization } from '@/shared/model/types/subtypes/TOrganization'
import { Service } from '../../classes/Service'
import ControllerRuleOrganizationDB from './controller/RuleOrganizationDB.controller'

import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import moment from 'moment'
import { isError } from '../../../src/shared/lib/IsError'

import { ServiceRequisites } from '../serviceRequisites/serviceReqisites'

import { TDaDataOrganization } from '@/shared/model/types/subtypes/TDaDataOrganization'
import { getAbbreviated } from '../../../src/shared/lib/getAbbreviated'
import { ServiceDaDataOrganization } from '../serviceDaData/serviceDaDataOrganization'
import { ServiceGeoLocation } from '../serviceGeoLocation/serviceGeoLocation'
import ServiceGlobalLIstCompany from '../serviceGlobalListCompany/serviceGlobalListCompany'

export class ServiceRuleOrganization extends Service {
	constructor(INN: string) {
		super(INN)
	}

	private getInitialDataOrganization(
		daData: TDaDataOrganization,
		date: Date
	): Partial<TDataOrganization> {
		const { data, value, unrestricted_value } = daData

		const initialDataOrganization: TDataOrganization = {
			INN: data.inn!,
			dateRegistration: date,
			nameOrganization: {
				abbreviated: getAbbreviated(value),
				fullName: value || unrestricted_value!,
			},
			paramsEmailNewsletter: {
				password: 'не задано',
				email: 'не задано',
				dataUpdate: date,
			},
			seal: 'NOT_FOUND',
			telegram: {
				idTelegramBot: 'не задано',
				hrefChat: 'не задано',
				botOn: false,
			},
			actualAddress: {
				location: {
					latitude: 0,
					longitude: 0,
				},
				actualAddress: 'не задано',
			},
		}
		return initialDataOrganization
	}

	public async getNameOrganization(): Promise<TNameOrganization | TError> {
		try {
			const nameOrganization = await new ControllerRuleOrganizationDB(this.INN).getNameOrganization()
			if (nameOrganization == null) {
				return this.createError(`organization not found , inn:${this.INN}`)
			}
			return this.normalizeDataFromMongoDB(nameOrganization.nameOrganization)
		} catch (error) {
			return this.createError(`error get name organization,error ${error}`, error)
		}
	}

	public async getParamsOrganization(): Promise<TDataOrganization | TError> {
		try {
			const dataOrganization = await new ControllerRuleOrganizationDB(this.INN).getInfoOrganization()
			if (dataOrganization === null) {
				return this.createError(`data organization NULL bad INN ${this.INN}`)
			}
			return this.normalizeDataFromMongoDB(dataOrganization)
		} catch (error) {
			return this.createError(`error get data from DB ,error : ${error}`, error)
		}
	}
	public async updateParamsOrganization(data: TDataOrganization): Promise<void | TError> {
		try {
			await new ControllerRuleOrganizationDB(this.INN).updateInfoOrganization(data)
		} catch (error) {
			return this.createError(`error update params organization ,data :${data},error ${error}`, error)
		}
	}

	public async createNewRuleOrganization(dataGeo: TGeoLocation): Promise<void | TError> {
		const daDataOrganization = await new ServiceDaDataOrganization(this.INN).addDaData({
			query: this.INN,
		})

		if (isError(daDataOrganization)) {
			const { error, message } = daDataOrganization
			return { error, message }
		}

		
		const currentDate = new Date()
		dataGeo.date = currentDate

		const initialDataOrganization = this.getInitialDataOrganization(daDataOrganization, currentDate)
		
		const serviceGlobalListCompany = new ServiceGlobalLIstCompany().addNewCompany({
			INN: this.INN,
			name: initialDataOrganization.nameOrganization!
		})
		const saveGeoLocation = new ServiceGeoLocation(this.INN).setDataLocation(dataGeo)

		const saveInitialDataOrganization = new ControllerRuleOrganizationDB(this.INN).addInfoOrganization(
			initialDataOrganization
		)

		const saveRequisites = new ServiceRequisites(this.INN).addNewRequisites(daDataOrganization)

		const asyncSaveData = await Promise.all([
			serviceGlobalListCompany,
			saveGeoLocation,
			saveInitialDataOrganization,
			saveRequisites,
		])

		const err = asyncSaveData.find((data) => isError(data))

		if (!err) {
			return
		} else {
			return err
		}
	}
}
