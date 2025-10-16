import { goToPageError } from '@/shared/lib/goToPageError'
import { typicalError } from '@/shared/model/types/enums'
import { ObjectId } from 'mongoose'
import { TDBUser } from '../../../../Server/Service/serviceUser/model/types/Types'
import { TResponse } from '@/shared/model/types/Types'
import { changeResponseStatus } from '@/shared/lib/changeResponseStatus'

export const fetchGetBirthdayUser = async (INN: string, idUser: ObjectId, phone: string):Promise<Pick<TDBUser,'name'|'surname'|'lastName'>[]|null> => {
	const jwt = localStorage.getItem(`${phone}-jwt`)

	if (!jwt) {
		goToPageError(typicalError.error_authenticate)
		return null
	}
	const _response = await fetch(`/api/${INN}/users/birthday?from=${idUser}`,{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		})


		const response: TResponse<Pick<TDBUser,'name'|'surname'|'lastName'>[]> = {
					status: _response.status,
					response: await _response.json(),
				}
	return changeResponseStatus(response)!
}
