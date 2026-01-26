import { serverClient } from '@/shared/lib/api/serverClient'
import { TUserDTOWithoutPas, TNewUser, TGeolLocationDTO, TUserDTOByBirthday, TDBUser } from '@/shared/model/types'

import { TOptionQuery } from '@/shared/model/types/subtypes/optionQuery'

export class FetchUser {
	static async getAllUsers(INN: string, optionQuery: TOptionQuery<TDBUser>): Promise<TUserDTOWithoutPas[] | []> {
		const fetch = await serverClient.api<TUserDTOWithoutPas[] | []>(INN,`${INN}/users/all`, {
			method: 'POST',
			body: JSON.stringify(optionQuery),
		})
		return fetch
	}

	static async getAllUsersWithoutDeleted(
		INN: string,
		optionQuery: TOptionQuery<TDBUser>
	): Promise<TUserDTOWithoutPas[]> {
		const fetch = await serverClient.api<TUserDTOWithoutPas[]>(INN,`${INN}/users/withoutDeleted`, {
			method: 'POST',
			body: JSON.stringify(optionQuery),
		})
		return fetch
	}

	static async getDataAdmins(INN: string): Promise<TUserDTOWithoutPas[]> {
		const fetch = await serverClient.api<TUserDTOWithoutPas[]>(INN,`${INN}/users/admins`, { method: 'GET' })
		return fetch
	}

	static async getUserById(INN: string, _id: string): Promise<TUserDTOWithoutPas> {
		const fetch = await serverClient.api<TUserDTOWithoutPas>(INN,`${INN}/user/id?id=${_id}`, { method: 'GET' })
		return fetch
	}

	static async addNewUser(INN: string, newUser: TNewUser, dataGeo: TGeolLocationDTO) {
		const dataBody = {
			newUser,
			dataGeo,
		}

		const fetch = await serverClient.api<TUserDTOWithoutPas>(INN,`${INN}/user/newUser`, {
			method: 'POST',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}

	static async getUserByGroupID(INN: string, list_id: string[]): Promise<TUserDTOWithoutPas[]> {
		const params = new URLSearchParams()
		params.append('ids', list_id.join('!'))
		const fetch = await serverClient.api<TUserDTOWithoutPas[]>(INN,`${INN}/users/batch?${params}`, {
			method: 'GET',
		})
		return fetch
	}

	static async updateDataUser(INN: string, newDataUser: TUserDTOWithoutPas, dataGeo: TGeolLocationDTO): Promise<void> {
		const dataBody = { newDataUser, dataGeo }

		const fetch = await serverClient.api<void>(INN,`${INN}/user/update/data`, {
			method: 'PUT',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}

	static async updatePass(
		INN: string,
		data: {
			idUser: string
			newPas: string
		},
		dataGeo: TGeolLocationDTO
	): Promise<void> {
		const dataBody = {
			data,
			dataGeo,
		}
		const fetch = await serverClient.api<void>(INN,`${INN}/user/update/password`, {
			method: 'PUT',
			body: JSON.stringify(dataBody),
		})
		return fetch
	}

	static async getUserByPhone(INN: string, phone: string): Promise<TUserDTOWithoutPas> {
		const fetch = await serverClient.api<TUserDTOWithoutPas>(INN,`${INN}/user/phone?phone=${phone}`)
		return fetch
	}

	static async removeUser(INN: string, _id: string, dataGeo: TGeolLocationDTO): Promise<void> {
		const fetch = await serverClient.api<void>(INN,`${INN}/user/remove/${_id}`, {
			method: 'POST',
			body: JSON.stringify(dataGeo),
		})
		return fetch
	}

	static async restoreUser(INN: string, _id: string, dataGeo: TGeolLocationDTO): Promise<void> {
		const fetch = await serverClient.api<void>(INN,`${INN}/user/restore/${_id}`, {
			method: 'POST',
			body: JSON.stringify(dataGeo),
		})
		return fetch
	}

	static async getUsersWithBirthdayToday(INN: string): Promise<TUserDTOByBirthday[]> {
		const fetch = await serverClient.api<TUserDTOByBirthday[]>(INN,`${INN}/users/batch/birthday`, { method: 'GET' })
		return fetch
	}
}
