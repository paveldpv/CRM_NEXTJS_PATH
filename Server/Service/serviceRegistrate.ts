import { TDBUser, TFormRegistrate } from '@/Types/Types'

import bcrypt from 'bcrypt'
import moment from 'moment'
import { isAllowINN } from '../../src/shared/lib/changeAllowINN'

import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { SALT_ROUND } from '../../config/RegistrateConfig'

import { TError } from '@/shared/model/types/subtypes/TError'
import { isError } from '../../src/shared/lib/IsError'
import { Service } from '../classes/Service'
import { ServiceConfigApp } from './serviceConfigApp'
import { ServiceRuleOrganization } from './serviceRuleOrganization'
import { ServiceUsers } from './serviceUser'
/**
 *  while creating new organization create new data user  with params "linksAllowed " == "ADMIN"
 * create  initial view config
 * create initial params organization
 */

export class ServiceRegistrated extends Service {
	private dataUser: TFormRegistrate
	private dataGeo: TGeoLocation
	private currentDate = moment().toDate()

	constructor(dataUser: TFormRegistrate, dataGeo: TGeoLocation) {
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
				this.logError(changeOrganization)
				return changeOrganization //TERROR
			}

			if (changeOrganization.length != 0) {
				const er: TError = {
					error: true,
					message: `organization with the same INN is exist`,
				}
				this.logError(er)
				return er
			}

			const genSalt = await bcrypt.genSalt(SALT_ROUND)
			const password = bcrypt.hashSync(this.dataUser.password, genSalt)

			const dataRegistratedUser: TDBUser = {
				...this.dataUser,
				safeDeleted: false,
				dateRegistrate: this.currentDate,
				password,
				linksAllowed: 'ADMIN',
				srcPhoto: 'NOT_FOUND',
			}

			const serviceOrganization = new ServiceRuleOrganization(this.INN)
			const serviceConfigApp = new ServiceConfigApp(this.INN)

			const registrated = await Promise.all([
				serviceUser.addNewUser(dataRegistratedUser),
				serviceOrganization.createNewRuleOrganization(this.dataGeo),
				serviceConfigApp.addNewPersonalConfig(dataRegistratedUser.idUser),
			])

			const resultRegistratedNewRuleOrganization = registrated.find((data) => isError(data))
			if (resultRegistratedNewRuleOrganization) {
				this.logError(resultRegistratedNewRuleOrganization)
				return resultRegistratedNewRuleOrganization
			}
			return
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error registrated new organization,data user :${this.dataUser},data geo location :${this.dataGeo}`,
			}
			this.logError(er)
			return er
		}
	}
}
