import { TConfigAPP } from '@/shared/model/types/subtypes/TAppearanceConfigApp'
import { TResponse } from '@/shared/model/types/Types'


export const fetchSaveConfigApp = async (
	dataConfig: Partial<TConfigAPP>,
	INN: string,
	idUser: string
): Promise<TResponse> => {
	
	
	const response = await fetch(`/api/submitconfigapp/${INN}`, {
		method: 'POST',
		body: JSON.stringify({ idUser, dataConfig }),
	})

	return {
		status: response.status,
		response: await response.json(),
	}
}
