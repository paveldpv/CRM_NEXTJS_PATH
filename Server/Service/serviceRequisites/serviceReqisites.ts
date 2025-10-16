import { NotData } from '@/shared/model/types/enums'

import { TError } from '@/shared/model/types/subtypes/TError'

import { Service } from '../../classes/Service'
import { TDaDataOrganization } from '../serviceDaData/model/types/Type'
import ControllerDBRequisites from './controller/RequisitesDB.controller'
import { TNewRequisites, TRequisites } from './model/types/Type'

export class ServiceRequisites extends Service {
	constructor(INN: string) {
		super(INN)
	}

	private getInitialDataRequisites(daData: TDaDataOrganization): Partial<TNewRequisites> {
		const { data, unrestricted_value, value } = daData
		const { management, name, state, address, ...otherData } = data

		const dataRequisites: TNewRequisites = {
			safeDeleted: false,
			INN: {
				title: 'ИНН',
				value: data.inn!,
			},
			KPP: {
				title: 'КПП',
				value: data.kpp,
			},
			legalAddress: {
				title: 'Юр.Адрес',
				value: address.value,
			},
			mailAddress: {
				title: 'почтовый адрес',
				value: address.unrestricted_value,
			},
			phone: {
				title: 'телефон',
				value: 'не задано',
			},
			nameDirector: {
				title: 'Руководитель',
				value: management.name,
			},
			email: {
				title: 'элю.почта',
				value: data.emails ? data.emails.reduce((acum, cur) => (acum += cur.value), ` `) : 'не заданно',
			},
			OGRN: {
				title: 'ОГРН',
				value: data.ogrn || 'не задано',
			},
			OKVD: {
				title: 'ОКВЭД',
				value: data.okved?.split('.') || 'не задано',
			},
			srcRequisites: NotData.notFile,
			requisitesBank: {
				checkingAccount: {
					title: 'Расчетный счет',
					value: 'не задано',
				},
				nameBank: {
					title: 'Наименование банка',
					value: 'не задано',
				},
				korAccount: {
					title: 'Кор.Счет',
					value: 'не задано',
				},
				BIK: {
					title: 'БИК',
					value: 'не задано',
				},
			},
		}
		return dataRequisites
	}

	public async getRequisitesCurrentOrganization(): Promise<TRequisites | TError> {
		try {
			const data = await new ControllerDBRequisites(this.INN).getRequisitesCurrentOrganization()
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			return this.createError(
				`error get requisites current organization , INN:${this.INN},error:${error}`,
				error
			)
		}
	}
	public async getAllRequisites(): Promise<TRequisites[] | TError | []> {
		try {
			const allRequisites = await new ControllerDBRequisites(this.INN).getAllRequisites()
			return this.normalizeDataFromMongoDB(allRequisites)
		} catch (error) {
			return this.createError(`error service requisites - all Requisites ,error :${error}`, error)
		}
	}
	public async deletedRequisites(INN: string): Promise<void | TError> {
		try {
			await new ControllerDBRequisites(this.INN).deleteRequisites(INN)
		} catch (error) {
			return this.createError(`error service requisites - deleted Requisites ,error :${error}`, error)
		}
	}
	public async getRequisiteByParams(params: TRequisites): Promise<TRequisites | TError | null> {
		try {
			const requisites = await new ControllerDBRequisites(this.INN).getRequisiteByParams(params)
			return this.normalizeDataFromMongoDB(requisites)
		} catch (error) {
			return this.createError(
				`error service requisites - get Requisites by params ,error :${error}`,
				error
			)
		}
	}
	public async updateRequisites(dataUpdateRequites: TRequisites): Promise<void | TError> {
		try {
			await new ControllerDBRequisites(this.INN).updateRequisites(dataUpdateRequites)
		} catch (error) {
			return this.createError(`error service requisites - update requisites ,error :${error}`, error)
		}
	}

	public async addNewRequisites(daData: TDaDataOrganization): Promise<TRequisites | TError> {
		try {
			const initialDataRequisites = this.getInitialDataRequisites(daData)
			const saveRequisites = await new ControllerDBRequisites(this.INN).addNewRequisites(
				initialDataRequisites
			)
			return saveRequisites
		} catch (error) {
			return this.createError(`error service requisites - update requisites ,error :${error}`, error)
		}
	}
}
