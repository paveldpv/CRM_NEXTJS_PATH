import { idLink } from '@/shared/model/types/enums'
import { TError } from '@/shared/model/types/subtypes/TError'

import { TDBUser, TNewEmployee } from '@/shared/model/types/Types'
import bcrypt from 'bcrypt'
import uiqid from 'uniqid'
import { SALT_ROUND } from '../../../config/RegistrateConfig'
import { isError } from '../../../src/shared/lib/IsError'
import { Service } from '../../classes/Service'
import { ServiceUsers } from '../serviceUser/serviceUser'
import { ServiceConfigApp } from '../serviceConfigApp/serviceConfigApp'


export class ServiceEmployee extends Service {
	constructor(INN: string) {
		super(INN)
	}
	private changeSettingAppFromProfile(user: TDBUser): boolean {
		if (user.linksAllowed === 'ADMIN') return true

		return user.linksAllowed.some((field) => field.id === idLink.setting)
	}

	public async restoreEmployee(idEmployee: string) {
		const serviceUser = new ServiceUsers(this.INN)
		return serviceUser.restoreUser(idEmployee)
	}

	public async deletedEmployee(idEmployee: string) {
		const serviceUser = new ServiceUsers(this.INN)
		return serviceUser.removeUser(idEmployee)
	}

	public async addNewEmployee(newEmployee: TNewEmployee): Promise<void | TError> {
		const serviceUser = new ServiceUsers(this.INN)
		const serviceConfigApp = new ServiceConfigApp(this.INN)
		const getSalt = await bcrypt.genSalt(SALT_ROUND)
		const hashNewPassword = bcrypt.hashSync(newEmployee.password, getSalt)
		const idUser = uiqid()
		let dataNewUser = { ...newEmployee, idUser, password: hashNewPassword } as TDBUser
		if (!this.changeSettingAppFromProfile(dataNewUser)) {
			dataNewUser = {
				...dataNewUser,
				linksAllowed: [
					{
						href: 'setting',
						description: 'Настройки',
						title: 'Настройки',
						id: idLink.setting,
					},
				],
			}
		}

		const saveNewEmployee = await Promise.all([
			serviceUser.addNewUser(dataNewUser),
			serviceConfigApp.addNewPersonalConfig(dataNewUser.idUser),
		])
		return saveNewEmployee.find((res) => isError(res))
	}
}
