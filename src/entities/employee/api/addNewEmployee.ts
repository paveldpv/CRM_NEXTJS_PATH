import { typicalError } from '@/shared/model/types/subtypes/enums'
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { TResponse } from '@/shared/model/types/subtypes/Types'
import { TNewUser } from '../../../../Server/Service/serviceUser/model/types/Types'


export const fetchAddNewEmployee = async (
	INN: string,
	employee: TNewUser,
	dataGeo: Omit<TGeoLocation, 'date'>
): Promise<TResponse> => {
	try {
		const response = await fetch(`/api/user/${INN}/addNewEmployee`, {
			method: 'POST',
			body: JSON.stringify({ employee, dataGeo }),
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
				message: `error fetch add new employee ,data new Employee :${employee},error ${error}`,
				typeError: typicalError.error_sever,
			},
		}
	}
}
