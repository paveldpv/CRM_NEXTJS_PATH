import { typicalError } from '@/shared/model/types/enums'
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { TResponse } from '@/shared/model/types/Types'

export const fetchAddNewPrice = async (
	INN: string,
	nameNewPrice: string,
	dataGeo: Omit<TGeoLocation, 'date'>
): Promise<TResponse<string>> => {
	try {
		
		
		const response = await fetch(`/api/price/${INN}/addnewprice/${nameNewPrice}`, {
			method: 'POST',
			body: JSON.stringify({dataGeo}),
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
				message: `error fetch add new price , error client request`,
				typeError: typicalError.error_sever,
			},
		}
	}
}
