import { TError } from '@/shared/model/types/subtypes/TError'

// import { fetchDeletedFiles } from "../../service/Server/FileManager/deletedFile"
import { TDBUser, TWithoutPassUser } from '@/shared/model/types/Types'
import bcrypt from 'bcrypt'
import { SALT_ROUND } from '../../config/RegistrateConfig'
import { Service } from '../classes/Service'
import ControllerDBUser from '../ControllersDB/Collection/UsersDB'

export class ServiceUsers extends Service {
	constructor(INN: string) {
		super(INN)
	}

	public async getAllEmployeeWithDeleted(): Promise<TDBUser[] | [] | TError> {
		try {
			const dataAllEmployee = await new ControllerDBUser(this.INN).getUsersWithDeleted()
			return this.normalizeDataFromMongoDB(dataAllEmployee)
		} catch (error) {
			const err = {
				error: true,
				message: `error get all employee , error :${error}`,
			}
			this.logError(err)
			return err
		}
	}

	public async getAllEmployee(): Promise<TWithoutPassUser[] | [] | TError> {
		try {
			const dataAllEmployee = await new ControllerDBUser(this.INN).getUsers()
			return this.normalizeDataFromMongoDB(dataAllEmployee)
		} catch (error) {
			const err = {
				error: true,
				message: `error get all employee , error :${error}`,
			}
			this.logError(err)
			return err
		}
	}

	public async getInfoAdmin(): Promise<TDBUser[] | TError> {
		try {
			const admins = await new ControllerDBUser(this.INN).getAdmins()
			return this.normalizeDataFromMongoDB(admins)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error get info admin, INN :${this.INN} , error :${error}`,
			}
			this.logError(er)
			return er
		}
	}

	public async getUserById(idUser: string): Promise<TDBUser | TError> {
		try {
			console.log(idUser);
			
			const datUser = await new ControllerDBUser(this.INN).getUserByID(idUser)
			if (datUser === null) {
				const er = {
					error: true,
					message: `data user is null ,bad id ${idUser}`,
				}
				this.logError(er)
				return er
			}

			return this.normalizeDataFromMongoDB(datUser)
		} catch (error) {
			const er = {
				error: true,
				message: `error add new admin, INN :${this.INN} , error :${error},query :${idUser}`,
			}
			this.logError(er)
			return er
		}
	}

	public async addNewUser(data: TDBUser): Promise<void | TError> {
		try {
			await new ControllerDBUser(this.INN).addNewUser(data as TDBUser)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error add new admin, INN :${this.INN} , error :${error} , query :${data}`,
			}
			this.logError(er)
			return er
		}
	}
	public async getUsersByGroupID(listID: string[]): Promise<TDBUser[] | TError> {
		try {
			const groupUsers = await new ControllerDBUser(this.INN).getUsersByGroupID(listID)

			return this.normalizeDataFromMongoDB(groupUsers)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error add get users by group ID, INN :${this.INN} , error :${error} ,query ${listID}`,
			}
			this.logError(er)
			return er
		}
	}

	public async updateDataUser(updateDataUser: TDBUser | TWithoutPassUser): Promise<void | TError> {
		try {
			await new ControllerDBUser(this.INN).updateDataUser(updateDataUser)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error updateData user , error :${error},query :${updateDataUser}`,
			}
			this.logError(er)
			return er
		}
	}

	public async updatePas(idEmployee: string, newPas: string): Promise<void | TError> {
		try {
			const getSalt = await bcrypt.genSalt(SALT_ROUND)
			const hashNewPassword = bcrypt.hashSync(newPas, getSalt)
			const controllerDBUSer = new ControllerDBUser(this.INN)
			await controllerDBUSer.updatePas(idEmployee, hashNewPassword)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error update pas, id employee   :${idEmployee}, INN :${this.INN},error :${error}`,
			}
			this.logError(er)
			return er
		}
	}

	public async getUserByPhone(phone: string): Promise<TDBUser | null | TError> {
		try {
			const controllerUser = new ControllerDBUser(this.INN)
			const dataUser = await controllerUser.getUsersByParams({ phone: phone })
			return this.normalizeDataFromMongoDB(dataUser)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error get user by phone , phone ${phone},error ${error}`,
			}
			this.logError(er)
			return er
		}
	}
	public async removeUser(idEmployee: string): Promise<void | TError> {
		try {
			const controllerDBUSer = new ControllerDBUser(this.INN)
			await controllerDBUSer.removeUser(idEmployee)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error remove employee ,id Employee :${idEmployee},INN :${this.INN}`,
			}
			this.logError(er)
			return er
		}
	}
	public async restoreUser(idEmployee: string) {
		try {
			const controllerDBUSer = new ControllerDBUser(this.INN)
			return controllerDBUSer.restoreUser(idEmployee)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error restore user , id employee : ${idEmployee},error :${error}`,
			}
			this.logError(er)
			return er
		}
	}
	
}
