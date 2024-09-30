import {
	TAnswerUpdateDB,
	TDBUser,
	TFormRegistrate,
	TResponse,
} from '@/Types/Types'
import { TConfigAPP } from '@/Types/subtypes/TAppearanceConfigApp'
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

