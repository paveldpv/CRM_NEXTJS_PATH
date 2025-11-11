import { TFormLogin } from '@/shared/model/types/subtypes/Types'
import bcrypt from 'bcrypt'
import { isError } from '../../../src/shared/lib/IsError'
import { Service } from '../../classes/Service'
import { TTokens } from '../serviceSession/model/types/Type'
import { ServiceSession } from '../serviceSession/serviceSession'
import { TDBUserWithoutPas } from '../serviceUser/model/types/Types'
import { ServiceUsers } from '../serviceUser/serviceUser'

export class ServiceAuth extends Service {
	private phone: string
	private password: string
	constructor(dataFormLogin: TFormLogin) {
		super(dataFormLogin.INN)
		this.phone = dataFormLogin.phone
		this.password = dataFormLogin.password
	}

	async auth(): Promise<{ dataUser: TDBUserWithoutPas; token: TTokens } | null> {
		const serviceUser = new ServiceUsers(this.INN)
		const candidateAuth = await serviceUser.getUserByPhone(this.phone)

		if (!candidateAuth) return null

		if (isError(candidateAuth)) {
			this.createError(candidateAuth.message)
			return null //?as TError
		}

		const isCorrectedPassword = await bcrypt.compare(this.password, candidateAuth.password)

		if (isCorrectedPassword) {
			const serviceSession = new ServiceSession(this.INN)
			const token = await serviceSession.addSession(candidateAuth._id)
			if (isError(token)) {
				this.createError(`error create new session , data user :${candidateAuth}`)
				return null
			}
			const { password, ...dataUser } = candidateAuth
			return { dataUser, token }
		} else {
			this.createError(`error auth ,invalid password phone user:${this.phone},inn  :${this.INN}`)
			return null
		}
	}
}
