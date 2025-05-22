import { ObjectId } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
import modelSession from '../model/schema/sessionSchema'
import { TSession } from '../model/types/Type'

export class ControllerSession extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}
	public async updateLastAction(idUser: ObjectId) {
		await modelSession.findOneAndUpdate({ idUser }, { lastAction: new Date() })
	}
	public async addSession(data: TSession) {
		await this.contentDB()
		const newSession = new modelSession(data)
		await newSession.save()
	}

	public async endSession(idUser: ObjectId) {
		await this.contentDB()
		await modelSession.findOneAndDelete({ idUser })
	}
	public async getPersonalSession(idUser: ObjectId): Promise<TSession | null> {
		await this.contentDB()
		return await modelSession.findOne({ idUser })
	}
	public async getSessionByRefreshToken(token: string): Promise<null | TSession> {
		await this.contentDB()
		return await modelSession.findOne({ refreshToken: token })
	}

	public async changeActionSessions(currentDate: Date) {
		await modelSession.updateMany(
			{
				online: true,
				lastAction: {
					$lt: new Date(currentDate.getTime() - 30 * 60 * 1000),
				},
			},
			{
				$set: {
					online: false,
				},
			}
		)
	}
	public async getOnlineUsers(): Promise<TSession[] | null> {
		await this.contentDB()
		return await modelSession.find({})
	}
}
