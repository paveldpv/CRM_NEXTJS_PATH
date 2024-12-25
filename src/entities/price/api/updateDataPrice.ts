import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { TResponse } from '@/shared/model/types/Types'
import { TDataTablePrice } from '../model/Types'
import { typicalError } from '@/shared/model/types/enums'

export const fetchUpdateDataPrice = async(INN:string,data:TDataTablePrice,dataGeo:Omit<TGeoLocation,'date'>):Promise<TResponse> =>{
	try {
		const response = await fetch(`/api/price/${INN}/updateprice`,{
			method:"POST",
			body:JSON.stringify({dataGeo,data})
		})
		return {
			status:response.status,
			response:await response.json()
		}
		
	} catch (error) {
		return {
			status:400,
			response:{
				error:true,message:`error fetch add new price , error client request`,
				typeError:typicalError.error_sever
			}
		}
		
	}
}