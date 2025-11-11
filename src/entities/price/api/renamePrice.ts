import { changeResponseStatus } from '@/shared/lib/changeResponseStatus'
import { goToPageError } from '@/shared/lib/goToPageError'
import { typicalError } from '@/shared/model/types/subtypes/enums'
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'

export const fetchRenamePri@/shared/model/types/subtypes/Types
	INN: string,
	newNamePrice: string,
	idPrice: string,
	dataGeo: Omit<TGeoLocation, 'date'>
): Promise<"OK"|undefined> => {
	try {
		const dataRequest = {
			newNamePrice,
			dataGeo,
			idPrice,
		}
		const _response = await fetch(`/api/price/${INN}/rename`, {
			method: 'POST',
			body: JSON.stringify(dataRequest),
			cache:'no-cache'
		})
		const response = {
			status: _response.status,
			response: await _response.json()
		}
		return changeResponseStatus(response)!
		
	} catch (error) {
		goToPageError(typicalError.error_DB)
		
	}
}
