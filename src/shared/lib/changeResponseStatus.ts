import { typicalError } from '../model/types/enums'
import { TResponse } from '../model/types/Types'
import { goToPageError } from './goToPageError'
import { isError } from './IsError'

export const changeResponseStatus = <T>(response: TResponse<T>) => {
	if (response.status == 403) {
		goToPageError(typicalError.error_permission)		
	} else if (response.status != 200 || isError(response.response)) {
		goToPageError(typicalError.error_permission)		
	} else {
		return response.response
		
	}
}
