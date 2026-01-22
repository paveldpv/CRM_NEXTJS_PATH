import { TFormLogin } from '@/shared/model/types/subtypes/Types'
import bcrypt from 'bcrypt'
import { isError } from '../../../src/shared/lib/IsError'
import { Service } from '../../classes/Service'
import { TTokens } from '../serviceSession/model/types/Type'
import { ServiceSession } from '../serviceSession/serviceSession'

import { ServiceUserDTO } from '../serviceUser/user.dto'
import { TUserDTOWithoutPas } from '@/shared/model/types'
import { ServiceUsers } from '../serviceUser/serviceUser'
import { MongoHelpers } from '../../classes/until/MongoHelpers'

export class ServiceAuth extends Service {
	private phone: string
	private password: string
	constructor(dataFormLogin: TFormLogin) {
		super(dataFormLogin.INN)
		this.phone = dataFormLogin.phone
		this.password = dataFormLogin.password
	}

	async auth(): Promise<{ dataUser: TUserDTOWithoutPas; token: TTokens } | null> {
		const serviceUser = new ServiceUsers(this.INN)
		const candidateAuth = await serviceUser.getUserByPhone(this.phone)

		if (!candidateAuth || isError(candidateAuth)) return null

		if (isError(candidateAuth)) {
			this.createError(candidateAuth.message)
			return null //?as TError
		}

		const isCorrectedPassword = await bcrypt.compare(this.password, candidateAuth.password)

		if (isCorrectedPassword) {
			const serviceSession = new ServiceSession(this.INN)
			const idCandidate = MongoHelpers.stringToObjectId(candidateAuth._id.toString())
			const token = await serviceSession.addSession(idCandidate!)

			if (isError(token)) {
				this.createError(`error create new session , data user :${candidateAuth}`)
				return null
			}
			const userDTO = ServiceUserDTO.createUserDTO(candidateAuth)			
			return { token, dataUser: userDTO }
		} else {
			this.createError(`error auth ,invalid password phone user:${this.phone},inn  :${this.INN}`)
			return null
		}
	}
}
