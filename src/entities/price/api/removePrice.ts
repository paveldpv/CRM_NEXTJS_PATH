import { changeResponseStatus } from '@/shared/lib/changeResponseStatus'
import { goToPageError } from '@/shared/lib/goToPageError'
import { typicalError } from '@/shared/model/types/subtypes/enums'
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { TResponse } from '@/shared/model/types/subtypes/Types'

export const fetchRemovePrice = async (
	INN: string,
	idPrice: string,
	dataGeo: Omit<TGeoLocation, 'date'>
): Promise<"OK"|undefined> => {
	try {
		const _response = await fetch(`/api/price/${INN}/removeprice/${idPrice}`, {
			method: 'POST',
			body: JSON.stringify({ dataGeo }),
			next: { revalidate: 5 },
			cache: 'no-store',
		})
		const response:TResponse = {
			status: _response.status,
			response: await _response.json(),
		}
		return changeResponseStatus(response)
		
	} catch (error) {
		goToPageError(typicalError.error_DB)
		
	}
}
