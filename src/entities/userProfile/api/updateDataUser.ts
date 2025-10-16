import { typicalError } from '@/shared/model/types/enums'

import { TResponse,  } from '@/shared/model/types/Types'
import { TGeoLocation } from '../../../../Server/Service/serviceGeoLocation/model/types/type'
import { TDBUserWithoutPas } from '../../../../Server/Service/serviceUser/model/types/Types'


export const fetchUpdateDataUser = async (
	dataUser: TDBUserWithoutPas,
	dataGeo: Omit<TGeoLocation, 'date'>,
	INN: string
): Promise<TResponse> => {
	

	try {
		const response = await fetch(`/api/user/${INN}/updatedatauser`, {
			method: 'POST',
			body: JSON.stringify({ dataUser, dataGeo }),
		})

		return {
			status: response.status,
			response: await response.json(),
		}
	} catch (error) {
		return {
			status: 400,
			response: {
				error: true,
				message: `error fetch update data user,error ${error}`,
				typeError: typicalError.error_sever,
			},
		}
	}
}
