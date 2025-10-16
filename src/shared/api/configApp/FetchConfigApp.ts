import { serverClient } from '@/shared/lib/api/serverClient'
import { TConfigAPP_DTO } from '../../../../Server/Service/serviceConfigApp/model/types/Type'

export class FetchConfigApp {
	static async getPersonalConfigApp(INN:string,idUser:string): Promise<TConfigAPP_DTO> {
		const fetch = await serverClient.api<TConfigAPP_DTO>(`${INN}/configapp/${idUser}`,{method:'GET'})
		return fetch
	}
	static async updatePersonalConfig(INN:string,data:TConfigAPP_DTO): Promise<void> {
		await serverClient.api<void>(`${INN}/configapp/update`,{method:"PUT",body:JSON.stringify(data)})
	}
}
