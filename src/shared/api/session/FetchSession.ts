import { serverClient } from '@/shared/lib/api/serverClient'
import { TNewDataGeoLocationDTO } from '@/shared/model/types'
import { TSessionFullInfoDTO, TTokens,TUserOnlineDTO } from '../../../../Server/Service/serviceSession/model/types/Type'

export class FetchSession {
   
    static async addSession(INN: string,  dataGeo: TNewDataGeoLocationDTO): Promise<TTokens> {
        const dataBody = {  dataGeo }
        const fetch = await serverClient.api<TTokens>(INN,`${INN}/session/add`, {
            method: 'POST',
            body: JSON.stringify(dataBody)
        })
        return fetch
    }

   
    static async endSession(INN: string, idUser: string, dataGeo: TNewDataGeoLocationDTO): Promise<void> {
        const dataBody = { idUser, dataGeo }
        const fetch = await serverClient.api<void>(INN,`${INN}/session/end`, {
            method: 'POST',
            body: JSON.stringify(dataBody)
        })
        return fetch
    }

    
    static async getOnlineUsers(INN: string): Promise<TUserOnlineDTO[]> {
        const fetch = await serverClient.api<TUserOnlineDTO[]>(INN,`${INN}/session/online`, {
            method: 'GET'
        })
        return fetch
    }
}