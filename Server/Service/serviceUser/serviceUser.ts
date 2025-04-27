import { TError } from '@/shared/model/types/subtypes/TError'

import { TDBUser, TWithoutPassUser } from '@/shared/model/types/Types'
import bcrypt from 'bcrypt'
import { SALT_ROUND } from '../../../config/RegistrateConfig'
import { Service } from '../../classes/Service'
import { ServiceConfigApp } from '../serviceConfigApp/serviceConfigApp'
import ControllerDBUser from './controller/UsersDB.controller'

import applyMixins from '../../function/applyMixinst'
import EncryptionService from '../../classes/Encryption'



 export class ServiceUsers extends Service {
	
	constructor(INN: string) {
		super(INN)
	}

	public async getAllEmployeeWithDeleted(): Promise<TDBUser[] | [] | TError> {
		try {
			
			const dataAllEmployee = await new ControllerDBUser(this.INN).getUsersWithDeleted()
			return this.normalizeDataFromMongoDB(dataAllEmployee)
		} catch (error) {
			return this.createError(`error get all employee , error :${error}`, error)
		}
	}

	public async getAllEmployee(): Promise<TWithoutPassUser[] | [] | TError> {
		try {
			const dataAllEmployee = await new ControllerDBUser(this.INN).getUsers()
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

	public async getUserById(idUser: string): Promise<TDBUser | TError> {
		try {
			const datUser = await new ControllerDBUser(this.INN).getUserByID(idUser)
			if (datUser === null) {
				return this.createError(`data user is null ,bad id ${idUser}`)
			}

			return this.normalizeDataFromMongoDB(datUser)
		} catch (error) {
			return this.createError(
				`error add new admin, INN :${this.INN} , error :${error},query :${idUser}`,
				error
			)
		}
	}

	public async addNewUser(data: TDBUser): Promise<void | TError> {
		try {
			const serviceConfigApp = new ServiceConfigApp(this.INN)
			const newPersonalConfig = serviceConfigApp.addNewPersonalConfig(data.idUser)
			const controllerDBUser = new ControllerDBUser(this.INN)
			const addNewUser = controllerDBUser.addNewUser(data as TDBUser)
			await Promise.all([newPersonalConfig, addNewUser])
		} catch (error) {
			return this.createError(
				`error add new admin, INN :${this.INN} , error :${error} , query :${data}`,
				error
			)
		}
	}
	public async getUsersByGroupID(listID: string[]): Promise<TDBUser[] | TError> {
		try {
			const groupUsers = await new ControllerDBUser(this.INN).getUsersByGroupID(listID)

			return this.normalizeDataFromMongoDB(groupUsers)
		} catch (error) {
			return this.createError(
				`error add get users by group ID, INN :${this.INN} , error :${error} ,query ${listID}`,
				error
			)
		}
	}

	public async updateDataUser(updateDataUser: TDBUser | TWithoutPassUser): Promise<void | TError> {
		try {
			await new ControllerDBUser(this.INN).updateDataUser(updateDataUser)
		} catch (error) {
			return this.createError(`error updateData user , error :${error},query :${updateDataUser}`, error)
		}
	}

	public async updatePas(idEmployee: string, newPas: string): Promise<void | TError> {
		try {
			const getSalt = await bcrypt.genSalt(SALT_ROUND)
			const hashNewPassword = bcrypt.hashSync(newPas, getSalt)
			const controllerDBUSer = new ControllerDBUser(this.INN)
			await controllerDBUSer.updatePas(idEmployee, hashNewPassword)
		} catch (error) {
			return this.createError(
				`error update pas, id employee   :${idEmployee}, INN :${this.INN},error :${error}`,
				error
			)
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
	public async removeUser(idEmployee: string): Promise<void | TError> {
		try {
			const controllerDBUSer = new ControllerDBUser(this.INN)
			await controllerDBUSer.removeUser(idEmployee)
		} catch (error) {
			return this.createError(
				`error remove employee ,id Employee :${idEmployee},INN :${this.INN}`,
				error
			)
		}
	}
	public async restoreUser(idEmployee: string) {
		try {
			const controllerDBUSer = new ControllerDBUser(this.INN)
			return controllerDBUSer.restoreUser(idEmployee)
		} catch (error) {
			return this.createError(`error restore user , id employee : ${idEmployee},error :${error}`, error)
		}
	}
}

