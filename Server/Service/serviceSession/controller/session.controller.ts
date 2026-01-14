import { Model, Types } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
import { sessionSchema } from '../model/schema/sessionSchema'
import { TSession, TUserOnline } from '../model/types/Type'

export class ControllerSession extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	private modelSession  :Model<TSession>|null = null

	private async initModel(){
		await this.connectDB()
		if(!this.dbConnection) throw new Error(`error init session model from INN:${this.INN}`)			
		this.modelSession = this.dbConnection.model<TSession>('session',sessionSchema)	
	}

	private async changeReadinessModel(){
		if(!this.modelSession) await this.initModel()
	}

	public async updateLastAction(idUser: Types.ObjectId) {
		await this.changeReadinessModel()
		await this.modelSession!.findOneAndUpdate({ idUser }, {$set:{online:true,lastAction:new Date()}})
	}


	public async addSession(data: Omit<TSession,'_id'>) {
		await this.changeReadinessModel()
		const newSession = new this.modelSession!(data)
		await newSession.save()
	}

	public async endSession(idUser: Types.ObjectId) {
		await this.changeReadinessModel()
		await this.modelSession!.findOneAndDelete({ idUser })
	}
	public async getPersonalSession(idUser: Types.ObjectId): Promise<TSession | null> {
		await this.changeReadinessModel()
		return await this.modelSession!.findOne({ idUser })
	}
	public async getSessionByRefreshToken(token: string): Promise<null | TSession> {
		await this.changeReadinessModel()

		return await this.modelSession!.findOne({ refreshToken: token })
	}

	public async changeActionSessions(currentDate: Date) {
		await this.changeReadinessModel()
		await this.modelSession!.updateMany(
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
	public async getOnlineSession(): Promise<TUserOnline > {
		await this.changeReadinessModel()
		return await this.modelSession!.find({},{user:1})
	}
}
