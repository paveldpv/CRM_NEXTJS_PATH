import bcrypt from 'bcrypt'
import { isAllowINN } from '../../../src/shared/lib/changeAllowINN'

import { SALT_ROUND } from '../../../config/RegistrateConfig'

import { TError } from '@/shared/model/types/subtypes/TError'
import { TFormRegistrate } from '@/shared/model/types/subtypes/Types'
import { isError } from '../../../src/shared/lib/IsError'
import { Service } from '../../classes/Service'
import { TGeoLocation } from '../serviceGeoLocation/model/types/type'
import { ServiceGeoLocation } from '../serviceGeoLocation/serviceGeoLocation'
import { ServiceRuleOrganization } from '../serviceRuleOrganization/serviceRuleOrganization'
import { TNewUser } from '../serviceUser/model/types/Types'
import { ServiceUsers } from '../serviceUser/serviceUser'

/**
 *  while creating new organization create new data user  with params "linksAllowed " == "ADMIN"
 * create  initial view config
 * create initial params organization
 */

export class ServiceRegistrated extends Service {
	private dataUser: TFormRegistrate
	private dataGeo: Omit<TGeoLocation, 'date' | 'user' | '_id'>
	private currentDate = new Date()

	constructor(dataUser: TFormRegistrate, dataGeo: Omit<TGeoLocation, 'date' | 'user' | '_id'>) {
		super(dataUser.INN)
		this.dataUser = dataUser
		this.dataGeo = dataGeo
	}

	async registratedNewOrganization(): Promise<TError | void> {
		try {
			const changeAllowINN = isAllowINN(this.dataUser.INN)
			if (!changeAllowINN)
				return {
					error: true,
					message: `error registrated , INN:${this.INN} absent list allow INN`,
				}

			const serviceUser = new ServiceUsers(this.INN)
			const changeOrganization = await serviceUser.getInfoAdmin()

			if (isError(changeOrganization)) {
				return this.createError(changeOrganization.message)
			}

			if (changeOrganization.length != 0) {
				return this.createError(`organization with the same INN is exist`)
			}

			const genSalt = await bcrypt.genSalt(SALT_ROUND)
			const password = bcrypt.hashSync(this.dataUser.password, genSalt)

			const dataRegistratedUser: TNewUser = {
				...this.dataUser,
				safeDeleted: false,
				dateRegistrate: this.currentDate,
				password,
				linksAllowed: 'ADMIN',
				srcPhoto: 'NOT_FOUND',
			}

			const newUser = await serviceUser.addNewUser(dataRegistratedUser)
			if (isError(newUser)) throw new Error('error create new user')

			const serviceRuleOrganization = new ServiceRuleOrganization(this.INN)
			const serviceGeoLocation = new ServiceGeoLocation(this.INN)
			const newDataGeo: Omit<TGeoLocation, 'date' | '_id'> = { ...this.dataGeo, user: newUser._id }

			const setGeoLocation = serviceGeoLocation.setDataLocation(newDataGeo)
			const resultRegistratedNewRuleOrganization = serviceRuleOrganization.createNewRuleOrganization()

			const registrated = await Promise.all([setGeoLocation, resultRegistratedNewRuleOrganization])
			const error = registrated.find((data) => isError(data))
			if (error) {
				return error
			} else {
				return
			}
		} catch (error) {
			return this.createError(
				`error registrated new organization,data user :${this.dataUser},data geo location :${this.dataGeo}`,
				error
			)
		}
	}
}
