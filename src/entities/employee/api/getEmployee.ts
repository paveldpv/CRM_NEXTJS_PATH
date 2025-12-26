import { typicalError } from '@/shared/model/types/subtypes/enums'
import { TError } from '@/shared/model/types/subtypes/TError'
import { TWithoutPassUser } from '@/shared/model/types/subtypes/Types'


export type TParamsAllEmployee = 1 | 0

export const fetchGetEmployee = async (
	INN: string,
	all: TParamsAllEmployee
): Promise<TWithoutPassUser[] | TError> => {
	try {
		const response = await fetch(`/api/user/${INN}/getEmployee?all=${all}`, { method: 'GET', cache: 'no-cache' })
		if (response.status !== 200) {
			return { error: true, message: `error get get data employee from server,`, typeError: typicalError.error_DB }
		}

		return await response.json()
	} catch (error) {
		return { error: true, message: `error fetch ,error get employee ,error :${error}` }
	}
}
