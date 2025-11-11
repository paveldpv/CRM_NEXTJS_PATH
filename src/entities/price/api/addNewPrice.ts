import { changeResponseStatus } from '@/shared/lib/changeResponseStatus'
import { goToPageError } from '@/shared/lib/goToPageError'
import { typicalError } from '@/shared/model/types/subtypes/enums'

import { TResponse } from '@/shared/model/types/subtypes/Types'
import { TGeoLocation } from '../../../../Server/Service/serviceGeoLocation/model/types/type'

export const fetchAddNewPrice = async (
	INN: string,
	nameNewPrice: string,
	dataGeo: Omit<TGeoLocation, 'date'>
): Promise<string|undefined> => {
	try {
		const _response = await fetch(`/api/price/${INN}/addnewprice/${nameNewPrice}`, {
			method: 'POST',
			body: JSON.stringify({ dataGeo }),
			next: { revalidate: 5 },
		})

		const response:TResponse<string> = {
			status: _response.status,
			response: await _response.json(),
		}

		return changeResponseStatus(response)!
		
	} catch (error) {
		goToPageError(typicalError.error_DB)
		
	}
}
