import { TError } from '@/shared/model/types/subtypes/TError'
import { TDataOrganization, TNameOrganization } from '@/shared/model/types/subtypes/TOrganization'
import { Service } from '../classes/Service'
import ControllerRuleOrganizationDB from '../ControllersDB/Collection/RuleOrganizationDB'

import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import moment from 'moment'
import { isError } from '../../src/shared/lib/IsError'
import { ServiceGeoLocation } from './serviceGeoLocation'

import { ServiceDaDataOrganization } from './serviceDaDataOrganization'
import { ServiceRequisites } from './serviceReqisites'

import { TDaDataOrganization } from '@/shared/model/types/subtypes/TDaDataOrganization'
import { getAbbreviated } from '../../src/shared/lib/getAbbreviated'

export class ServiceRuleOrganization extends Service {
	constructor(INN: string) {
		super(INN)
	}

	private getInitialDataOrganization(daData: TDaDataOrganization, date: Date): Partial<TDataOrganization> {
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
				const er: TError = {
					error: true,
					message: `organization not found , inn:${this.INN}`,
				}
				this.logError(er)
				return er
			}
			return this.normalizeDataFromMongoDB(nameOrganization.nameOrganization)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error get name organization,error ${error}`,
			}
			this.logError(er)
			return er
		}
	}

	public async getParamsOrganization(): Promise<TDataOrganization | TError> {
		try {
			const dataOrganization = await new ControllerRuleOrganizationDB(this.INN).getInfoOrganization()
			if (dataOrganization === null) {
				const err: TError = {
					error: true,
					message: `data organization NULL bad INN ${this.INN}`,
				}
				this.logError(err)
				return err
			}
			return this.normalizeDataFromMongoDB(dataOrganization)
		} catch (error) {
			const err: TError = {
				error: true,
				message: `error get data from DB ,error : ${error}}`,
			}
			this.logError(err)
			return err
		}
	}
	public async updateParamsOrganization(data: TDataOrganization): Promise<void | TError> {
		try {
			await new ControllerRuleOrganizationDB(this.INN).updateInfoOrganization(data)
		} catch (error) {
			const err: TError = {
				error: true,
				message: `error update params organization ,data :${data},error ${error}`,
			}
			this.logError(err)
			return err
		}
	}

	public async createNewRuleOrganization(dataGeo: TGeoLocation): Promise<void | TError> {
		const daDataOrganization = await new ServiceDaDataOrganization(this.INN).addDaData({ query: this.INN })

		if (isError(daDataOrganization)) {
			const { error, message } = daDataOrganization
			return { error, message }
		}

		const _moment = moment()
		const currentDate = _moment.toDate()
		dataGeo.date = currentDate

		const initialDataOrganization = this.getInitialDataOrganization(daDataOrganization, currentDate)

		const saveGeoLocation = new ServiceGeoLocation(this.INN).setDataLocation(dataGeo)

		const saveInitialDataOrganization = new ControllerRuleOrganizationDB(this.INN).addInfoOrganization(
			initialDataOrganization
		)

		const saveRequisites = new ServiceRequisites(this.INN).addNewRequisites(daDataOrganization)

		const asyncSaveData = await Promise.all([saveGeoLocation, saveInitialDataOrganization, saveRequisites])

		const err = asyncSaveData.find((data) => isError(data))

		if (!err) {
			return
		} else {
			return err
		}
	}
}
