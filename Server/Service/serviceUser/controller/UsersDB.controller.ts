import { TDBUser, TNewEmployee, TWithoutPassUser } from '@/shared/model/types/Types'
// import ContextOrganization from '../../classes/contextOrganization'
import ControllerDB from '../../../classes/ControllerDB'
import modelUSer from '../model/schema/usersSchema'

export default class ControllerDBUser extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}
	public async restoreUser(idEmployee: string) {
		await this.contentDB()
		await modelUSer.findOneAndUpdate({ idUser: idEmployee }, { $set: { safeDeleted: false } })
	}

	public async updatePas(idEmployee: string, newPas: string): Promise<void> {
		await this.contentDB()
		await modelUSer.findOneAndUpdate({ idUser: idEmployee }, { $set: { password: newPas } })
	}

	public async addNewUser(data: TDBUser | TNewEmployee): Promise<void> {
		await this.contentDB()
		const newAdmin = new modelUSer(data)
		await newAdmin.save()
	}

	public async getUsers(): Promise<TWithoutPassUser[] | []> {
		await this.contentDB()
		const dataUSer = await modelUSer.find({ safeDeleted: false }, { password: 0 })
		return dataUSer
	}

	public async getUsersWithDeleted(): Promise<TDBUser[] | []> {
		await this.contentDB()
		const dataUSer = await modelUSer.find({})
		return dataUSer
	}

	public async getUsersByParams(params: Partial<TDBUser>): Promise<TDBUser | null> {
		await this.contentDB()
		const dataUSer = await modelUSer.findOne(params)
		return dataUSer
	}

	public async getUserByID(idEmployee: string): Promise<TDBUser | null> {
		await this.contentDB()
		const dataUser = await modelUSer.findOne({ idUser: idEmployee })
		return dataUser
	}

	public async updateDataUser(updateDataUser: TDBUser | TWithoutPassUser): Promise<void> {
		await this.contentDB()
		await modelUSer.updateOne({ idUser: updateDataUser.idUser }, updateDataUser)
	}

	public async deletedPhotToDB(idEmployee: string): Promise<void> {
		await this.contentDB()
		await modelUSer.updateOne({ idUser: idEmployee }, { $set: { srcPhoto: 'NOT_FOUND' } })
	}

	public async getUsersByGroupID(listID: string[]): Promise<TDBUser[] | []> {
		await this.contentDB()
		return await modelUSer.find({ idUser: { $in: listID } })
	}

	public async getAdmins(): Promise<TDBUser[] | []> {
		await this.contentDB()
		return await modelUSer.find({ linksAllowed: 'ADMIN' })
	}
	public async removeUser(idEmployee: string): Promise<void> {
		await this.contentDB()
		await modelUSer.findOneAndUpdate({ idUser: idEmployee }, { $set: { safeDeleted: true } })
	}
}
