import { typicalError } from '@/Types/enums'
import { TGeoLocation } from '@/Types/subtypes/TGeoLocation'
import { TResponse, TWithoutPassUser } from '@/Types/Types'

export const fetchUpdateDataUser = async (
	dataUser: TWithoutPassUser,
	dataGeo: Omit<TGeoLocation, 'date'>,
	INN: string
): Promise<TResponse> => {
	
	
	try {
		const response = await fetch(`/api/user/${INN}/updatedatauser`, {
			method: 'POST',
			body: JSON.stringify({ dataUser, dataGeo }),
		})
		return {
			status:response.status,
			response:await response.json()
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
