import { changeResponseStatus } from '@/shared/lib/changeResponseStatus'
import { goToPageError } from '@/shared/lib/goToPageError'
import { typicalError } from '@/shared/model/types/subtypes/enums'
import { TResponse } from '@/shared/model/types/Types'
import { ObjectId } from 'm@/shared/model/types/subtypes/Types
import { TInitialValuesFormPrevCalc } from '../../../../Server/Service/servicePrevCacl/model/types/Types'

export const fetchGetDataNewPrevCalc= async(INN:string,idUser:ObjectId,phone:string):Promise<TInitialValuesFormPrevCalc[]| null>=>{
	const jwt = localStorage.getItem(`${phone}-jwt`)
	
		if (!jwt) {
			goToPageError(typicalError.error_authenticate)
			return null
		}
		const _response = await fetch(`/api/${INN}/prevCalc/newPrevCalc?from=${idUser}`,{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			})
	
	
			const response: TResponse<TInitialValuesFormPrevCalc[]| null> = {
						status: _response.status,
						response: await _response.json(),
					}
		return changeResponseStatus(response)!
}