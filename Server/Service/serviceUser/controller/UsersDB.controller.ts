

import { TOptionQuery } from '@/shared/model/types/optionQuery'
import { Model, Query, Types } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
import { userSchema } from '../model/schema/usersSchema'
import { TBirthdayDate, TDBUser, TDBUserWithoutPas, TNewUser } from '../model/types/Types'

export default class ControllerDBUser extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	private modelUser: Model<TDBUser> | null = null

	private async initModel() {
		await this.connectDB()
		if (!this.dbConnection) throw new Error(`error init model user from INN:${this.INN}`)

		this.modelUser = this.dbConnection.model<TDBUser>('user', userSchema)
	}

	private async changeReadinessModel() {
		if (!this.modelUser) await this.initModel()
	}
	// private getQueryWithOption (data:Query<,TDBUser>,option?:TOptionQuery<TDBUser>){
		
	// }
	

	public async restoreUser(idEmployee: Types.ObjectId): Promise<void> {
		await this.changeReadinessModel()
		await this.modelUser!.findOneAndUpdate({ _id: idEmployee }, { $set: { safeDeleted: false } })
	}

	public async updatePas(idEmployee: Types.ObjectId, newPas: string): Promise<void> {
		await this.changeReadinessModel()
		await this.modelUser!.findOneAndUpdate({ _id: idEmployee }, { $set: { password: newPas } })
	}

	public async addNewUser(data: TNewUser | TDBUserWithoutPas): Promise<TDBUser> {
		await this.changeReadinessModel()
		const newAdmin = new this.modelUser!(data)
		return await newAdmin.save() //надо сохранить и вернуть то что сохранили
	}

	public async getUsers(option?:TOptionQuery<TDBUser>): Promise<TDBUserWithoutPas[] | []> {
		await this.changeReadinessModel()
		const dataUSer =  this.modelUser!.find({ safeDeleted: false }, { password: 0 })
		return this.applyQueryOptions(dataUSer,option).exec()
	}

	public async getUsersWithDeleted(option?:TOptionQuery<TDBUser>): Promise<TDBUser[] | []> {
		await this.changeReadinessModel()
		const dataUser = this.modelUser!.find({})
		return this.applyQueryOptions(dataUser,option).exec()
	}

	public async getUsersByParams(params: Partial<TDBUser>,option?:TOptionQuery<TDBUser>): Promise<TDBUser | null> {
		await this.changeReadinessModel()
		const dataUSer = this.modelUser!.findOne(params)
		return this.applyQueryOptions(dataUSer,option)
	}

	public async getUserByID(idEmployee: Types.ObjectId): Promise<TDBUser | null> {
		await this.changeReadinessModel()
		const dataUser = await this.modelUser!.findOne({ _id: idEmployee })
		return dataUser
	}

	public async updateDataUser(updateDataUser: TDBUser | TDBUserWithoutPas): Promise<void> {
		await this.changeReadinessModel()
		await this.modelUser!.updateOne({ _id: updateDataUser._id }, updateDataUser)
	}

	public async deletedPhotToDB(idEmployee: Types.ObjectId): Promise<void> {
		await this.changeReadinessModel()
		await this.modelUser!.updateOne({ _id: idEmployee }, { $set: { srcPhoto: 'NOT_FOUND' } })
	}

	public async getUsersByGroupID(listID: Types.ObjectId[],option?:TOptionQuery<TDBUser>): Promise<TDBUser[] | []> {
		await this.changeReadinessModel()
		const dataUsers=  this.modelUser!.find({ _id: { $in: listID } })
		return this.applyQueryOptions(dataUsers,option).exec()
	}

	public async getAdmins(): Promise<TDBUser[] | []> {
		await this.changeReadinessModel()

		return await this.modelUser!.find({ linksAllowed: 'ADMIN' })
	}
	public async removeUser(idEmployee: Types.ObjectId): Promise<void> {
		await this.changeReadinessModel()
		await this.modelUser!.findOneAndUpdate({ _id: idEmployee }, { $set: { safeDeleted: true } })
	}

	public async getUsersWithBirthdayToday(
		{ startDay, endDay }: TBirthdayDate,
		option?: TOptionQuery<TDBUser>
	): Promise<TDBUserWithoutPas[] | []> {
		await this.changeReadinessModel()
		let data =  this.modelUser!.find({			
				dateBirthday: {
					$gte: startDay,
					$lte: endDay,
				},
			
		}).select('-password')
		
		return  this.applyQueryOptions(data,option).exec()
		
		
	}
	
}
