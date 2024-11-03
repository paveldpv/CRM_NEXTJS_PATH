import { typicalError } from '@/Types/enums'
import { TGeoLocation } from '@/Types/subtypes/TGeoLocation'
import { TNewEmployee, TResponse } from '@/Types/Types'

export const fetchAddNewEmployee = async (
	INN: string,
	employee: TNewEmployee,
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
