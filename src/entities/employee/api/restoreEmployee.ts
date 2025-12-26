import { typicalError } from '@/shared/model/types/subtypes/enums'
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { TResponse } from '@/shared/model/types/subtypes/Types'


export const fetchRestoreEmployee = async (
	INN: string,
	idEmployee: string,
	dataGeo: Omit<TGeoLocation, 'date'>
): Promise<TResponse> => {
	try {
		const response = await fetch(`/api/user/${INN}/${idEmployee}/restoreEmployee`, {
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
