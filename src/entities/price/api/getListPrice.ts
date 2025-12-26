import { changeResponseStatus } from '@/shared/lib/changeResponseStatus'
import { goToPageError } from '@/shared/lib/goToPageError'
import { typicalError } from '@/shared/model/types/subtypes/enums'
import { TLink, TResponse } from '@/shared/model/types/Types'
@/shared/model/types/subtypes/Types
export const fetchGetListPrice = async(INN:string):Promise<TLink[]|undefined> =>{
	try {
		const _response  = await fetch(`/api/price/${INN}/getlistprice`,{
			method:'GET',
			next:{revalidate:0}
		})
		
		const response:TResponse<TLink[]> = {
			status:_response.status,
			response:await _response.json() 
		}
		return changeResponseStatus(response)!
		
		
	} catch (error) {
		goToPageError(typicalError.error_DB)
		
	}
}