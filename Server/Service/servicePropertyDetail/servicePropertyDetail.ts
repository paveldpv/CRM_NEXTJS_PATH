import { TError } from '@/shared/model/types/subtypes/TError'
import { Service } from '../../classes/Service'
import ControllerPropertyDetail from './controller/PropertyDetailDB.controller'
import { TPropertyDetail } from './model/types/Types'

export class ServicePropertyDetail extends Service {
	constructor(INN: string) {
		super(INN)
	}

	public async addPropertyDetail(property: string): Promise<void | TError> {
		try {
			const controllerPropertyDetail = new ControllerPropertyDetail(this.INN)
			await controllerPropertyDetail.addNewProperty(property.trim())
		} catch (error) {
			return this.createError(`error add new property, INN :${this.INN}, error :${error}`, error)
		}
	}
	public async removeAddPropertyDetail(idProperty: string): Promise<void | TError> {
		try {
			const controllerPropertyDetail = new ControllerPropertyDetail(this.INN)
			await controllerPropertyDetail.removeProperty(idProperty)
		} catch (error) {
			return this.createError(
				`error remove property detail, id property :${idProperty}, INN;${this.INN} error :${error}`,
				error
			)
		}
	}
	public async getProperty(): Promise<TError | TPropertyDetail[] | null> {
		try {
			const controllerPropertyDetail = new ControllerPropertyDetail(this.INN)
			const property = await controllerPropertyDetail.getProperty()
			return this.normalizeDataFromMongoDB(property)
		} catch (error) {
			return this.createError(`error get Property detail , INN:${this.INN} error :${error}`, error)
		}
	}
	public async searchProperty(dataSearch: string): Promise<TError | null | TPropertyDetail[]> {
		const regEx = new RegExp(dataSearch.trim(), 'i')
		try {
			const controllerPropertyDetail = new ControllerPropertyDetail(this.INN)
			const data = await controllerPropertyDetail.searchProperty(regEx)
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			return this.createError(
				`error search property detail , data search :${dataSearch},INN:${this.INN}`,
				error
			)
		}
	}
}
