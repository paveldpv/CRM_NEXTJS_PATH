import { TDBUser, TFormLogin } from '@/shared/model/types/Types'
import bcrypt from 'bcrypt'
import { isError } from '../../../src/shared/lib/IsError'
import { Service } from '../../classes/Service'
import { ServiceUsers } from '../serviceUser/serviceUser'


export class ServiceAuth extends Service {
	private phone: string
	private password: string
	constructor(dataFormLogin: TFormLogin) {
		super(dataFormLogin.INN)
		this.phone = dataFormLogin.phone
		this.password = dataFormLogin.password
	}
	async auth(): Promise<TDBUser | null> {
		const serviceUser = new ServiceUsers(this.INN)
		const candidateAuth = await serviceUser.getUserByPhone(this.phone)

		if (!candidateAuth) return null

		if (isError(candidateAuth)) {
			this.createError(candidateAuth.message)
			return null //?as TError
		}

		const isCorrectedPassword = await bcrypt.compare(this.password, candidateAuth.password)

		if (isCorrectedPassword) {
			return candidateAuth
		} else {
			this.createError(`error auth ,invalid password phone user:${this.phone},inn  :${this.INN}`)
			return null
		}
	}
}
