import { TError } from '@/shared/model/types/subtypes/TError'
import { ServiceGlobal } from '../../classes/ServiceGlobal'
import ControllerGlobalListCompany from './controller/globalListCompany.controller'
import { TGlobalListCompanyWithoutID } from './model/types/Type'

export default class ServiceGlobalLIstCompany extends ServiceGlobal {
	public async getListCompany(range?: number, searchParams?: string) {
		const regEx = searchParams ? new RegExp(searchParams, 'i') : undefined
		try {
			const controllerGlobalListCompany = new ControllerGlobalListCompany()
			const data = await controllerGlobalListCompany.getListCompany(range, regEx)
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			return this.createError(
				`error get list company ,range :${range},search params :${searchParams}`,
				error
			)
		}
	}

	public async addNewCompany(data: TGlobalListCompanyWithoutID): Promise<void | TError> {
		try {
			const controllerGlobalListCompany = new ControllerGlobalListCompany()
			await controllerGlobalListCompany.addNewCompany(data)
		} catch (error) {
			return this.createError(`error add new company ,INN organization :${data.INN}`, error)
		}
	}

	public async setVisible(INN: string, visible: boolean): Promise<void | TError> {
		try {
			const controllerGlobalListCompany = new ControllerGlobalListCompany()
			await controllerGlobalListCompany.setVisible(INN, visible)
		} catch (error) {
			return this.createError(
				`error set visible global list company,INN :${INN}, params visible :${this.setVisible}`,
				error
			)
		}
	}
	public async updateDescription(INN: string, description: string[]) {
		try {
			const controllerGlobalListCompany = new ControllerGlobalListCompany()
			await controllerGlobalListCompany.updateDescription(INN, description)
		} catch (error) {
			return this.createError(
				`error update description company, INN:${INN},description ;${description.join('\n')}`,
				error
			)
		}
	}
}
