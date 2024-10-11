import { TFormRegistrate, TResponse } from '@/Types/Types'
import { TGeoLocation } from '@/Types/subtypes/TGeoLocation'

export const fetchRegistrate = async (
	data: TFormRegistrate,
	dataGeo: Omit<TGeoLocation, 'date'>
): Promise<TResponse> => {
	const response = await fetch('api/registrate', {
		method: 'POST',
		body: JSON.stringify({ data, dataGeo }),
	})

	return {
		response: await response.json(),
		status: response.status,
	}
}
