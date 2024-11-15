import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { TResponse } from '@/shared/model/types/Types'


export const fetchUpdatePasEmployee = async (
	INN: string,
	newPas: string,
	idEmployee: string,
	dataGeo: Omit<TGeoLocation, 'date'>
): Promise<TResponse> => {
	try {
		const response = await fetch(`/api/user/${INN}/${idEmployee}/updatePas`, {
			method: 'POST',
			body: JSON.stringify({ newPas, dataGeo }),
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
				message: `error fetch ,update password employee with id :${idEmployee},error :${error}`,
			},
		}
	}
}
