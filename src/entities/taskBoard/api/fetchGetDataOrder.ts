import { changeResponseStatus } from '@/shared/lib/changeResponseStatus'
import { goToPageError } from '@/shared/lib/goToPageError'
import { typicalError } from '@/shared/model/types/enums'
import { TResponse } from '@/shared/model/types/Types'
import { TDetail } from '../../../../Server/Service/serviceOrder/model/types/Types'

export const fetchGetDataDetailsOrder = async (
	INN: string,
	idOrder: string,
	phone: string
): Promise<TDetail[] | undefined> => {
	try {
		const _response = await fetch(`api/order/${INN}/getdatadetails/${idOrder}?employeePhone=${phone}`, {
			method: 'GET',
			next: { revalidate: 0 },
		})
		const response: TResponse<TDetail[]> = {
			status: _response.status,
			response: await _response.json(),
		}
		return changeResponseStatus(response)
	} catch (error) {
		goToPageError(typicalError.error_DB)
	}
}
