import { TError } from '@/shared/model/types/subtypes/TError'

import bcrypt from 'bcrypt'
import { SALT_ROUND } from '../../../config/RegistrateConfig'
import { Service } from '../../classes/Service'
import { ServiceConfigApp } from '../serviceConfigApp/serviceConfigApp'
import ControllerDBUser from './controller/UsersDB.controller'

import { TOptionQuery } from '@/shared/model/types/optionQuery'
import { idLink } from '@/shared/model/types/subtypes/enums'
import { Types } from 'mongoose'
import { ServiceSession } from '../serviceSession/serviceSession'
import { TDBUser, TDBUserWithoutPas, TNewUser } from './model/types/Types'

export class ServiceUsers extends Service {
	constructor(INN: string) {
		super(INN)
	}

	private changeSettingAppFromProfile(user: TNewUser): boolean {
		if (user.linksAllowed === 'ADMIN') return true

		return user.linksAllowed.some((field) => field.id === idLink.setting)
	}

	public async getAllEmployeeWithDeleted(option?: TOptionQuery<TDBUser>): Promise<TDBUser[] | [] | TError> {
		try {
			const dataAllEmployee = await new ControllerDBUser(this.INN).getUsersWithDeleted(option)
			return this.normalizeDataFromMongoDB(dataAllEmployee)
		} catch (error) {
			return this.createError(`error get all employee , error :${error}`, error)
		}
	}

	public async getAllEmployee(option?: TOptionQuery<TDBUser>): Promise<TDBUserWithoutPas[] | [] | TError> {
		try {
			const dataAllEmployee = await new ControllerDBUser(this.INN).getUsers(option)
			return this.normalizeDataFromMongoDB(dataAllEmployee)
		} catch (error) {
			return this.createError(`error get all employee , error :${error}`, error)
		}
	}

	public async getInfoAdmin(): Promise<TDBUser[] | TError> {
		try {
			const admins = await new ControllerDBUser(this.INN).getAdmins()

			return this.normalizeDataFromMongoDB(admins)
		} catch (error) {
			return this.createError(`error get info admin, INN :${this.INN} , error :${error}`, error)
		}
	}

	public async getUserById(_id: Types.ObjectId): Promise<TDBUser | TError> {
		try {
			const datUser = await new ControllerDBUser(this.INN).getUserByID(_id)
			if (datUser === null) {
				return this.createError(`data user is null ,bad id ${_id}`)
			}

			return this.normalizeDataFromMongoDB(datUser)
		} catch (error) {
			return this.createError(`error add new admin, INN :${this.INN} , error :${error},query :${_id}`, error)
		}
	}

	public async addNewUser(data: TNewUser): Promise<TDBUser | TError> {
		try {
			if (!this.changeSettingAppFromProfile(data)) {
				data = {
					...data,
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

			const controllerDBUser = new ControllerDBUser(this.INN)
			const newUser = await controllerDBUser.addNewUser(data)

			const serviceConfigApp = new ServiceConfigApp(this.INN)
			await serviceConfigApp.addNewPersonalConfig(newUser._id)
			return this.normalizeDataFromMongoDB(newUser)
		} catch (error) {
			return this.createError(`error add new admin, INN :${this.INN} , error :${error} , query :${data}`, error)
		}
	}

	public async getUsersByGroupID(listID: Types.ObjectId[], option: TOptionQuery<TDBUser>): Promise<TDBUser[] | TError> {
		try {
			const groupUsers = await new ControllerDBUser(this.INN).getUsersByGroupID(listID, option)

			return this.normalizeDataFromMongoDB(groupUsers)
		} catch (error) {
			return this.createError(`error add get users by group ID, INN :${this.INN} , error :${error} ,query ${listID}`, error)
		}
	}

	public async updateDataUser(updateDataUser: TDBUser | TDBUserWithoutPas): Promise<void | TError> {
		try {
			await new ControllerDBUser(this.INN).updateDataUser(updateDataUser)
		} catch (error) {
			return this.createError(`error updateData user , error :${error},query :${updateDataUser}`, error)
		}
	}

	public async updatePas(idUser: Types.ObjectId, newPas: string): Promise<void | TError> {
		try {
			const getSalt = await bcrypt.genSalt(SALT_ROUND)
			const hashNewPassword = bcrypt.hashSync(newPas, getSalt)
			const controllerDBUSer = new ControllerDBUser(this.INN)
			await controllerDBUSer.updatePas(idUser, hashNewPassword)
		} catch (error) {
			return this.createError(`error update pas, id employee   :${idUser}, INN :${this.INN},error :${error}`, error)
		}
	}

	public async getUserByPhone(phone: string): Promise<TDBUser | null | TError> {
		try {
			const controllerUser = new ControllerDBUser(this.INN)
			const dataUser = await controllerUser.getUsersByParams({ phone: phone })
			return this.normalizeDataFromMongoDB(dataUser)
		} catch (error) {
			return this.createError(`error get user by phone , phone ${phone},error ${error}`, error)
		}
	}
	public async removeUser(idUser: Types.ObjectId): Promise<void | TError> {
		try {
			const serviceSession = new ServiceSession(this.INN)
			const controllerDBUSer = new ControllerDBUser(this.INN)
			await Promise.all([serviceSession.endSession(idUser), controllerDBUSer.removeUser(idUser)])
			return
		} catch (error) {
			return this.createError(`error remove employee ,id Employee :${idUser},INN :${this.INN}`, error)
		}
	}
	public async restoreUser(idEmployee: Types.ObjectId): Promise<void | TError> {
		try {
			const controllerDBUSer = new ControllerDBUser(this.INN)
			await controllerDBUSer.restoreUser(idEmployee)
			return
		} catch (error) {
			return this.createError(`error restore user , id employee : ${idEmployee},error :${error}`, error)
		}
	}
	public async getUsersWithBirthdayToday(option?: TOptionQuery<TDBUser>): Promise<TDBUserWithoutPas[] | TError> {
		const startDay = new Date(new Date().setHours(0, 0, 0, 0))
		const endDay = new Date(new Date().setHours(23, 59, 59, 999))
		try {
			const controllerDBUSer = new ControllerDBUser(this.INN)
			const dataUser = await controllerDBUSer.getUsersWithBirthdayToday({ startDay, endDay }, option)
			return this.normalizeDataFromMongoDB(dataUser)
		} catch (error) {
			return this.createError(`error get user with birthday today  option :${option} ,error :${error}`, error)
		}
	}
}
