import { changeResponseStatus } from '@/shared/lib/changeResponseStatus'
import { goToPageError } from '@/shared/lib/goToPageError'
import { typicalError } from '@/shared/model/types/subtypes/enums'
import { TResponse } from '@/shared/model/types/subtypes/Types'
import { TPrice } from '../model/Types'

export const fetchGetDataPrice = async (
	INN: string,
	idTable: string,
	phone?: string
): Promise<TPrice | undefined> => {
	try {
		const _response = await fetch(`/api/price/${INN}/getdataprice/${idTable}?employeephone=${phone}`, {
			method: 'GET',
			next: { revalidate: 0 },
		})
		const response: TResponse<TPrice> = {
			status: _response.status,
			response: await _response.json(),
		}
		return changeResponseStatus(response)!
	} catch (error) {
		goToPageError(typicalError.error_DB)
	}
}
