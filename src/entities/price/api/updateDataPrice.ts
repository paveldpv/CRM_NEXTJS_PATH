import { changeResponseStatus } from '@/shared/lib/changeResponseStatus'
import { goToPageError } from '@/shared/lib/goToPageError'
import { typicalError } fro@/shared/model/types/subtypes/Typesbtypes/enums'
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { TDataTablePrice } from '../model/Types'



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

