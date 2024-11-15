
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { TFormRegistrate, TResponse } from '@/shared/model/types/Types'

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
