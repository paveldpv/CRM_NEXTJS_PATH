import { typicalError } from '@/shared/model/types/enums'
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { TResponse } from '@/shared/model/types/Types'
import { TDataTablePrice } from '../model/Types'
import { changeResponseStatus } from '@/shared/lib/changeResponseStatus'
import { goToPageError } from '@/shared/lib/goToPageError'



export const fetchUpdateDataPrice = async (
	INN: string,
	data: TDataTablePrice,
	dataGeo: Omit<TGeoLocation, 'date'>
): Promise<"OK"|undefined> => {
	try {
		const _response = await fetch(`/api/price/${INN}/updateprice`, {
			method: 'POST',
			body: JSON.stringify({ dataGeo, data }), cache: 'no-store', next: { revalidate: 10 } 
		})
		const response = {
			status: _response.status,
			response: await _response.json(),
		}
		return changeResponseStatus(response)!
	} catch (error) {
		goToPageError(typicalError.error_DB)
		
	}
}

