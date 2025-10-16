import { changeResponseStatus } from '@/shared/lib/changeResponseStatus'
import { goToPageError } from '@/shared/lib/goToPageError'
import { typicalError } from '@/shared/model/types/enums'

import { TResponse } from '@/shared/model/types/Types'
import { TDBUserWithoutPas } from '../../../../Server/Service/serviceUser/model/types/Types'
import { TConfigAPP } from '../../../../Server/Service/serviceConfigApp/model/types/Type'

export const fetchInitializationApp = async (INN: string, phone: string) => {
	try {
		const jwt = localStorage.getItem(`${phone}-jwt`)
		const refreshToken = localStorage.getItem(`${phone}-refreshToken`)
		if (!jwt || !refreshToken) {
			goToPageError(typicalError.error_authenticate)
		}
		const _response = await fetch(`/api/${INN}/user/${phone}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		})

		const response: TResponse<{ user: TDBUserWithoutPas; dataConfigApp: TConfigAPP }> = {
			status: _response.status,
			response: await _response.json(),
		}

		return changeResponseStatus(response)!
	} catch (error) {
		goToPageError(typicalError.error_DB)
	}
}
