import { TRequestPrevCalc } from '@/shared/model/types/subtypes/TRequestPrevCalc'
import { TAnswerUpdateDB, TResponseService } from '@/shared/model/types/subtypes/Types'

export const fetchRequestPrevCalc = async (
	INN: number,
	data: Omit<TRequestPrevCalc, 'safeDeleted'>
): Promise<TResponseService> => {
	const response = await fetch(`/api/prevcalc/${INN}`, {
		method: 'POST',
		body: JSON.stringify(data),
	})
	console.log(response)

	if (response.ok) {
		return {
			success: true,
			message: 'Запрос отправлен,спасибо',
		}
	} else {
		return {
			success: false,
		}
	}
}

export const fetchDeleteRequest = async (INN: number, idRequest: string): Promise<TAnswerUpdateDB> => {
	try {
		const response = await fetch(`/api/prevcalc/${INN}/deleteRequest`, {
			method: 'POST',
			body: JSON.stringify(idRequest),
		})
		return response.json()
	} catch (error) {
		return {
			success: false,
			message: `error on server,error: ${error}`,
		}
	}
}

export const fetchGetAllRequest = async (INN: number): Promise<TRequestPrevCalc[] | []> => {
	try {
		const dataRequest = await fetch(`/api/prevcalc/${INN}/getAllRequest`, { method: 'GET' })
		return dataRequest.json()
	} catch (error) {
		return []
	}
}

export const fetchGetFavoriteRequest = async (INN: number): Promise<TRequestPrevCalc[] | []> => {
	try {
		const dataRequest = await fetch(`/api/prevcalc/${INN}/getFavoriteRequest`, { method: 'GET' })
		return dataRequest.json()
	} catch (error) {
		return []
	}
}

export const setFavoriteRequest = async (INN: number, idRequest: string, isFavorite: boolean): Promise<TAnswerUpdateDB> => {
	try {
		const response = await fetch(`/api/prevcalc/${INN}/setFavoriteRequest`, {
			method: 'POST',
			body: JSON.stringify({ idRequest, isFavorite }),
		})
		return response.json()
	} catch (error) {
		return {
			success: false,
			message: `error server ,error ${error}`,
		}
	}
}
