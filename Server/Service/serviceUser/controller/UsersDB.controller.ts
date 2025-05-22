import { TNewEmployee, TWithoutPassUser } from '@/shared/model/types/Types'
import { ObjectId } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
import modelUSer from '../model/schema/usersSchema'
import { TDBUser, TNewUser } from '../model/types/Types'

export default class ControllerDBUser extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}
	public async restoreUser(idEmployee: ObjectId) {
		await this.contentDB()
		await modelUSer.findOneAndUpdate({ _id: idEmployee }, { $set: { safeDeleted: false } })
	}

	public async updatePas(idEmployee: ObjectId, newPas: string): Promise<void> {
		await this.contentDB()
		await modelUSer.findOneAndUpdate({ _id: idEmployee }, { $set: { password: newPas } })
	}

	public async addNewUser(data: TNewUser | TNewEmployee): Promise<TDBUser> {
		await this.contentDB()
		const newAdmin = new modelUSer(data)
		return await newAdmin.save()//надо сохранить и вернуть то что сохранили
		
		
		//TODO:
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

	public async getUserByID(idEmployee: ObjectId): Promise<TDBUser | null> {
		await this.contentDB()
		const dataUser = await modelUSer.findOne({ _id: idEmployee })
		return dataUser
	}

	public async updateDataUser(updateDataUser: TDBUser | TWithoutPassUser): Promise<void> {
		await this.contentDB()
		await modelUSer.updateOne({ _id: updateDataUser._id }, updateDataUser)
	}

	public async deletedPhotToDB(idEmployee: ObjectId): Promise<void> {
		await this.contentDB()
		await modelUSer.updateOne({ _id: idEmployee }, { $set: { srcPhoto: 'NOT_FOUND' } })
	}

	public async getUsersByGroupID(listID: ObjectId[]): Promise<TDBUser[] | []> {
		await this.contentDB()
		return await modelUSer.find({ _id: { $in: listID } })
	}

	public async getAdmins(): Promise<TDBUser[] | []> {
		await this.contentDB()
		return await modelUSer.find({ linksAllowed: 'ADMIN' })
	}
	public async removeUser(idEmployee: ObjectId): Promise<void> {
		await this.contentDB()
		await modelUSer.findOneAndUpdate({ _id: idEmployee }, { $set: { safeDeleted: true } })
	}
}
