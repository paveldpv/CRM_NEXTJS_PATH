import { TGeoLocation } from '@/shared/model/types'
import { TFormRegistrate } from '@/shared/model/types/subtypes/Types'

export class FetchRegistrate {
	static async registrateOrganization(data: TFormRegistrate, dataGeo: Omit<TGeoLocation, 'date' | 'user' | '_id'>) {
		const response = await fetch(`api/${data.INN}/v1/registrate`, {
			method: 'POST',
			body: JSON.stringify({ data, dataGeo }),
		})

		return {
			response: await response.json(),
			status: response.status,
		}
	}
}
