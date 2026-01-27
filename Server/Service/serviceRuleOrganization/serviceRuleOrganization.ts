import { TError } from '@/shared/model/types/subtypes/TError'

import { Service } from '../../classes/Service'
import ControllerRuleOrganizationDB from './controller/RuleOrganizationDB.controller'

import { isError } from '../../../src/shared/lib/IsError'

import { ServiceRequisites } from '../serviceRequisites/serviceReqisites'


import { getAbbreviated } from '../../../src/shared/lib/utils/getAbbreviated'
import { ServiceDaDataOrganization } from '../serviceDaData/serviceDaDataOrganization'
import ServiceGlobalLIstCompany from '../serviceGlobalListCompany/serviceGlobalListCompany'
import { TDaDataOrganization } from '../serviceDaData/model/types/Type'
import { TDataOrganization, TDataOrganizationFullInfo, TNameOrganization,TNewRuleOrganization } from './model/types/Types'
import { ServicePrice } from '../servicePrice/servicePrice'

export class ServiceRuleOrganization extends Service {
	constructor(INN: string) {
		super(INN)
	}

	private getInitialDataOrganization(
		daData: TDaDataOrganization,
		date: Date
	): Omit<TNewRuleOrganization,'requisites'> {
		const { data, value, unrestricted_value } = daData

		const initialDataOrganization: Omit<TNewRuleOrganization,'requisites'> = {
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

	public async getParamsOrganizationWithoutRequisites ():Promise<TDataOrganization|TError>{
		try {
			const dataOrganization = await new ControllerRuleOrganizationDB(this.INN).getInfoOrganizationWithoutRequisites()
			if (dataOrganization === null) {
				return this.createError(`data organization NULL bad INN ${this.INN}`)
			}
			return this.normalizeDataFromMongoDB(dataOrganization)
		} catch (error) {
			return this.createError(`error get data organization from DB ,error : ${error}`, error)
		}
	}

	public async getParamsOrganization(): Promise<TDataOrganizationFullInfo | TError> {
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

	public async createNewRuleOrganization(): Promise<void | TError> {
		const daDataOrganization = await new ServiceDaDataOrganization(this.INN).addDaData({
			query: this.INN,
		})

		if (isError(daDataOrganization)) {
			const { error, message } = daDataOrganization
			return { error, message }
		}
		
		const servicePrice = new ServicePrice(this.INN)
		const initialDataOrganization  = this.getInitialDataOrganization(daDataOrganization, new Date())
		const serviceGlobalListCompany = new ServiceGlobalLIstCompany(this.INN)
		const saveRequisites           = await new ServiceRequisites(this.INN).addNewRequisites(daDataOrganization)
		if(isError(saveRequisites)){
			throw new Error('error save requisites rule company')
		}

		const saveInitialDataOrganization = new ControllerRuleOrganizationDB(this.INN).addInfoOrganization(
			{...initialDataOrganization,requisites:saveRequisites._id}
		)


		const asyncSaveData = await Promise.all([
			serviceGlobalListCompany.addNewCompany({
				INN: this.INN,
				name: initialDataOrganization.nameOrganization!,
				globalVisible: true,
			}),
			saveInitialDataOrganization,
			servicePrice.addNewPrice('прайс')
			
		])

		const err = asyncSaveData.find((data) => isError(data))

		if (!err) {
			return
		} else {
			return err
		}
	}
}
