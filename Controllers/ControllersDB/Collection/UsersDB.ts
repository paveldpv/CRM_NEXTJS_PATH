import { TDBUser, TNewEmployee, TWithoutPassUser } from '@/Types/Types'
import { connect } from 'mongoose'
import ContextOrganization from '../../classes/contextOrganization'
import modelUSer from '../SCHEMAS/usersSchema'

export default class ControllerDBUser extends ContextOrganization {
	constructor(INN: string) {
		super(INN)
	}

	public async updatePas(idEmployee: string, newPas: string): Promise<void> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		await modelUSer.findOneAndUpdate({ idUser: idEmployee }, { $set: { password: newPas } })
	}

	public async addNewUser(data: TDBUser | TNewEmployee): Promise<void> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		const newAdmin = new modelUSer(data)
		await newAdmin.save()
	}

	public async getUsers(): Promise<TWithoutPassUser[] | []> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		const dataUSer = await modelUSer.find({safeDeleted: false}, {  password: 0 })
		return dataUSer
	}

	public async getUsersWithDeleted(): Promise<TDBUser[] | []> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		const dataUSer = await modelUSer.find({})
		return dataUSer
	}

	public async getUsersByParams(params: Partial<TDBUser>): Promise<TDBUser | null> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		const dataUSer = await modelUSer.findOne(params)
		return dataUSer
	}

	public async getUserByID(idEmployee: string): Promise<TDBUser | null> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		const dataUser = await modelUSer.findOne({ idUser: idEmployee })
		return dataUser
	}

	public async updateDataUser(updateDataUser: TDBUser | TWithoutPassUser): Promise<void> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		await modelUSer.updateOne({ idUser: updateDataUser.idUser }, updateDataUser)
	}

	public async deletedPhotToDB(idEmployee: string): Promise<void> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		await modelUSer.updateOne({ idUser: idEmployee }, { $set: { srcPhoto: 'NOT_FOUND' } })
	}

	public async getUsersByGroupID(listID: string[]): Promise<TDBUser[] | []> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		return await modelUSer.find({ idUser: { $in: listID } })
	}

	public async getAdmins(): Promise<TDBUser[] | []> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		return await modelUSer.find({ linksAllowed: 'ADMIN' })
	}
	public async removeUser(idEmployee: string): Promise<void> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		await modelUSer.findOneAndUpdate({ idUser: idEmployee }, { $set: { safeDeleted: true } })
	}
}
