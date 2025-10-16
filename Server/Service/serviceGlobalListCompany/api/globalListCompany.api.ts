import { API } from '../../../classes/API'
import {
	listApi,
	TGlobalListCompany,
	TGlobalListCompanyWithoutID,
	TListAPIGlobalListCompany,
} from '../model/types/Type'

export class ControllerGlobalListCompany extends API {

	private urlServiceGlobalListCompany = process.env.SERVER_DOTNET
	
	private getAPI_URL(command: TListAPIGlobalListCompany): string {				
		return `${this.urlServiceGlobalListCompany}/api/GlobalListCompany/${command}`
	}

	public async getListCompany(searchParams?: string, range = 5) {
		try {
			const response = await fetch(
				`${this.getAPI_URL(listApi.getListCompany)}?query=${searchParams}&range=${range}`,
				{ method: 'GET' }
			)
			const data: TGlobalListCompany[] = await this.getResponse(response)
			return data
		} catch (error) {
			throw error
		}
	}
	
	public async addNewCompany(data: TGlobalListCompanyWithoutID): Promise<void> {
		try {
			const response = await fetch(`${this.getAPI_URL(listApi.addNewCompany)}`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers:{
					'Content-Type': 'application/json'
				}
			})
			return await this.changeStatus(response)
		} catch (error) {
			throw error
		}
	}
	public async setVisible(INN: string, visible: boolean):Promise<void> {
		try {
			const response = await fetch(
				`${this.getAPI_URL(listApi.setVisibleCompany)}?INN=${INN}&visible=${visible}`,
				{
					method: 'POST',
				}
			)
			return await this.changeStatus(response)
		} catch (error) {
			throw error
		}
	}

	public async updateDescription(INN: string, description: string[]):Promise<void> {
		try {
			const response = await fetch(`${this.getAPI_URL(listApi.updateDescriptionCompany)}?INN=${INN}`, {
				method: 'POST',
				body: JSON.stringify(description),
			})
			return await this.changeStatus(response)
		} catch (error) {
			throw error
		}
	}

	public async getCountDocGlobalListCompany ():Promise<number>{
		try {
			const response = await fetch(`${this.getAPI_URL(listApi.getCountDocGlobalListCompany)}`,{method:'GET'})
			const countDoc:number =  await this.getResponse(response)
			return countDoc
		} catch (error) {
			throw error
		}
	}
	public async getALlListCompany():Promise<TGlobalListCompany[]>{
		try {
			const response = await fetch(`${this.getAPI_URL(listApi.getAllGlobalListCompany)}`,{method:'GET'})
			const allCompany:TGlobalListCompany[] = await this.getResponse(response)
			return allCompany
		} catch (error) {
			throw error
		}
	}
	
	public async removeCompany (INN:string):Promise<void>{
		try {
			const response = await fetch (`${this.getAPI_URL(listApi.removeCompany)}?INN=${INN}`)
			return await this.changeStatus(response)
		} catch (error) {
			throw error
		}
	}
}
