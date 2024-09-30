import { TConfigAPP } from '@/Types/subtypes/TAppearanceConfigApp'
import { TResponse } from '@/Types/Types'

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
		status:response.status,
		response:await response.json()
	}
}
