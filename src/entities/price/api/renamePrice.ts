import { typicalError } from '@/shared/model/types/enums'
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { TResponse } from '@/shared/model/types/Types'

export const fetchRenamePrice = async (
	INN: string,
	newNamePrice: string,
	idPrice: string,
	dataGeo: Omit<TGeoLocation, 'date'>
): Promise<TResponse> => {
	try {
		const dataRequest = {
			newNamePrice,
			dataGeo,
			idPrice,
		}
		const response = await fetch(`/api/price/${INN}/rename`, {
			method: 'POST',
			body: JSON.stringify(dataRequest),
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
				message: `error fetch rename price , error client request`,
				typeError: typicalError.error_sever,
			},
		}
	}
}
