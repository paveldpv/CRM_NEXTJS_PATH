import { TError } from '@/shared/model/types/subtypes/TError'


import { TGlobalListCompany, TGlobalListCompanyWithoutID } from './model/types/Type'
import { Service } from '../../classes/Service'
import { ControllerGlobalListCompany } from './api/globalListCompany.api'

export default class ServiceGlobalLIstCompany extends Service {

	public async getListCompany(range?: number, searchParams?: string):Promise<TGlobalListCompany[]|TError> {
		
		try {
			const controllerGlobalListCompany = new ControllerGlobalListCompany()
			const data = await controllerGlobalListCompany.getListCompany(searchParams,range)
			return data
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
			return this.createError(`error add new company to global list ,INN organization :${data.INN}`, error)
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

	public async getCountDocGlobalListCompany():Promise<number|TError>{
		try {
			const controllerGlobalListCompany = new ControllerGlobalListCompany()
			const countDoc = await controllerGlobalListCompany.getCountDocGlobalListCompany()
			return countDoc
		} catch (error) {
			return this.createError('error get count list global list company ',error)
		}
	}

	public async getAllListCompany ():Promise<TGlobalListCompany[]|TError>{
		try {
			const controllerGlobalListCompany = new ControllerGlobalListCompany()
			const data = await controllerGlobalListCompany.getALlListCompany()
			return data
		} catch (error) {
			return this.createError('error get all list company ',error)
		}
	}
	public async removeCompany(INN:string):Promise<void|TError>{
		try {
			const controllerGlobalListCompany = new ControllerGlobalListCompany()
			await controllerGlobalListCompany.removeCompany(INN)
		} catch (error) {
			return this.createError(`error remove company INN :${INN}`,error)
		}
	}


}
