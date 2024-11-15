import { TDaDataOrganization } from '@/shared/model/types/subtypes/TDaDataOrganization'
import { TError } from '@/shared/model/types/subtypes/TError'
import { TQueryGetDaDataOrganization } from '@/shared/model/types/subtypes/TQueryGetDaDataOrganization'
import { apiKey } from '../../config/DaDataConfig'
import { isError } from '../../src/shared/lib/IsError'
import { Service } from '../classes/Service'
import ControllerDaDataOrganizationDB from '../ControllersDB/Collection/DaDataOrganizationDB'

export class ServiceDaDataOrganization extends Service {
	private URL_DA_DATA: string
	constructor(INN: string) {
		super(INN)
		this.URL_DA_DATA = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party'
	}

	private async fetchDaDataOrganization(
		queryData: TQueryGetDaDataOrganization
	): Promise<TDaDataOrganization | TError> {
		const responseData = await fetch(this.URL_DA_DATA, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Token ' + apiKey,
			},
			body: JSON.stringify(queryData),
		})

		if (responseData.ok) {
			const daData = await responseData.json()
			return daData.suggestions[0] as TDaDataOrganization
		} else {
			const err: TError = {
				error: true,
				message: `error get data from DaData , response not OK`,
			}
			this.logError(err)
			return err
		}
	}

	public async addDaData(query: TQueryGetDaDataOrganization): Promise<TDaDataOrganization | TError> {
		try {
			const daDataOrganization = await this.fetchDaDataOrganization(query)
			if (isError(daDataOrganization)) {
				const { error, message } = daDataOrganization
				this.logError({ error, message })
				return {
					error,
					message,
				}
			}

			await new ControllerDaDataOrganizationDB(this.INN).addDaData(daDataOrganization)

			return daDataOrganization
		} catch (error) {
			const err: TError = {
				error: true,
				message: `error add daData ,INN:${this.INN},error ;${error}`,
			}
			this.logError(err)
			return err
		}
	}

	public async getDaDataByINN(INN: string): Promise<TDaDataOrganization | null | TError> {
		try {
			const data = await new ControllerDaDataOrganizationDB(this.INN).getDaDataByINN(INN)
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			const err: TError = {
				error: true,
				message: `error get daData by INN inn ${INN}, error ${error}`,
			}
			this.logError(err)
			return err
		}
	}
	public async getAllDaData(): Promise<TDaDataOrganization[] | [] | TError> {
		try {
			const data = await new ControllerDaDataOrganizationDB(this.INN).getAllDaData()
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			const err: TError = {
				error: true,
				message: `error get all  da data ,error ${error}`,
			}
			this.logError(err)
			return err
		}
	}
	public async deletedDaDataByINN(INN: string): Promise<void | TError> {
		try {
			await new ControllerDaDataOrganizationDB(this.INN).deletedDaDataByINN(INN)
		} catch (error) {
			const err: TError = {
				error: true,
				message: `error deleted da data by INN INN:${INN},error :${error}`,
			}
		}
	}
	public async updateDaDataByINN(newDaData: TDaDataOrganization): Promise<void | TError> {
		try {
			await new ControllerDaDataOrganizationDB(this.INN).updateDaDataByINN(newDaData)
		} catch (error) {
			const err: TError = {
				error: true,
				message: `error update da data by INN ,new data :${newDaData},error ${error}`,
			}
			this.logError(err)
			return err
		}
	}
	public async getDaDataRuleOrganization(): Promise<TDaDataOrganization | null | TError> {
		try {
			const data = await new ControllerDaDataOrganizationDB(this.INN).getDataRuleOrganization()
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			const err: TError = {
				error: true,
				message: `error get da data current organization error : ${error}`,
			}
			this.logError(err)
			return err
		}
	}
	public async getAllDaDataWithDeleted(): Promise<TDaDataOrganization[] | [] | TError> {
		try {
			const data = await new ControllerDaDataOrganizationDB(this.INN).getAllDaDataWithDeleted()
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			const err: TError = {
				error: true,
				message: `error get all  da data ,error ${error}`,
			}
			this.logError(err)
			return err
		}
	}
}
