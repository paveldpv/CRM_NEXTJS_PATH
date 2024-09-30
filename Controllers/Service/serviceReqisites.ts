import { NotData } from '@/Types/enums'
import { TDaDataOrganization } from '@/Types/subtypes/TDaDataOrganization'
import { TError } from '@/Types/subtypes/TError'
import { TRequisites } from '@/Types/subtypes/TRequisites'
import ControllerDBRequisites from '../ControllersDB/Collection/RequisitesDB'
import { Service } from '../classes/Service'

export class ServiceRequisites extends Service {
	constructor(INN: string) {
		super(INN)
	}

	private getInitialDataRequisites(
		daData: TDaDataOrganization		
	): Partial<TRequisites> {
		const { data, unrestricted_value, value } = daData
		const { management, name, state, address, ...otherData } = data

		const dataRequisites: TRequisites = {
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
				value: data.emails
					? data.emails.reduce((acum, cur) => (acum += cur.value), ` `)
					: 'не заданно',
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

	public async getRequisitesCurrentOrganization(): Promise<
		TRequisites | TError
	> {
		try {
			const data = await new ControllerDBRequisites(
				this.INN
			).getRequisitesCurrentOrganization()
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			let er: TError = {
				error: true,
				message: `error get requisites current organization , INN:${this.INN},error:${error}`,
			}
			this.logError(er)
			return er
		}
	}
	public async getAllRequisites(): Promise<TRequisites[] | TError | []> {
		try {
			const allRequisites = await new ControllerDBRequisites(
				this.INN
			).getAllRequisites()
			return this.normalizeDataFromMongoDB(allRequisites)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error service requisites - all Requisites ,error :${error}`,
			}
			this.logError(er)
			return er
		}
	}
	public async deletedRequisites(INN: string): Promise<void | TError> {
		try {
			await new ControllerDBRequisites(this.INN).deleteRequisites(INN)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error service requisites - deleted Requisites ,error :${error}`,
			}
			this.logError(er)
			return er
		}
	}
	public async getRequisiteByParams(
		params: TRequisites
	): Promise<TRequisites | TError | null> {
		try {
			const requisites = await new ControllerDBRequisites(
				this.INN
			).getRequisiteByParams(params)
			return this.normalizeDataFromMongoDB(requisites)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error service requisites - get Requisites by params ,error :${error}`,
			}
			this.logError(er)
			return er
		}
	}
	public async updateRequisites(
		dataUpdateRequites: TRequisites
	): Promise<void | TError> {
		try {
			await new ControllerDBRequisites(this.INN).updateRequisites(
				dataUpdateRequites
			)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error service requisites - update requisites ,error :${error}`,
			}
			this.logError(er)
			return er
		}
	}

	public async addNewRequisites(
		daData:TDaDataOrganization
	): Promise<void | TError> {
		
		try {
      const initialDataRequisites = this.getInitialDataRequisites(daData)
			await new ControllerDBRequisites(this.INN).addNewRequisites(initialDataRequisites)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error service requisites - update requisites ,error :${error}`,
			}
			this.logError(er)
			return er
		}
	}
}
