import { typicalError } from '@/shared/model/types/enums'
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { TResponse } from '@/shared/model/types/Types'

export const fetchRemovePrice = async(INN:string,idPrice:string,dataGeo:Omit<TGeoLocation,'date'>):Promise<TResponse> =>{
	try {
		const response = await fetch(`/api/price/${INN}/removeprice/${idPrice}`,{
			method:"POST",
			body:JSON.stringify({dataGeo})
		})
		return {
			status:response.status,
			response:await response.json()
		}
		
	} catch (error) {
		return {
			status:400,
			response:{
				error:true,message:`error fetch remove price , error client request`,
				typeError:typicalError.error_sever
			}
		}
		
	}
}