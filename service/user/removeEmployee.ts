import { typicalError } from '@/Types/enums'
import { TGeoLocation } from '@/Types/subtypes/TGeoLocation'
import { TResponse } from '@/Types/Types'

export const fetchRemoveEmployee = async (
	INN: string,
	idEmployee: string,
	dataGeo:  Omit<TGeoLocation, 'date'>,
): Promise<TResponse> => {
	try {
		const response = await fetch(`/api/user/${INN}/${idEmployee}/removeEmployee`, {
			method: 'POST',
			body: JSON.stringify({ dataGeo }),
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
				message: `error fetch remove employee,id employee :${idEmployee},error:${error}`,
				typeError: typicalError.error_sever,
			},
		}
	}
}
