import { TError } from '@/shared/model/types/subtypes/TError'
import { add } from 'date-fns'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongoose'
import { RefreshToken } from '../../classes/RefreshToken'
import { Service } from '../../classes/Service'
import { ControllerSession } from './controller/session.controller'
import { TSession } from './model/types/Type'

export class ServiceSession extends Service {
	constructor(INN: string) {
		super(INN)
	}
	public async updateLastAction(idUser: ObjectId): Promise<TError | void> {
		try {
			const controllerSession = new ControllerSession(this.INN)
			await controllerSession.updateLastAction(idUser)
		} catch (error) {
			return this.createError(`error update last action , id user :${idUser}`, error)
		}
	}

	async addSession(idUser: ObjectId): Promise<TError | void> {
		const currentDate = new Date()
		const newSession: TSession = {
			idUser: idUser,
			refreshToken: RefreshToken.generate(),
			online: true,
			lastAction: currentDate,
		}
		try {
			const controllerSession = new ControllerSession(this.INN)
			await Promise.all([
				controllerSession.addSession(newSession),
				controllerSession.changeActionSessions(new Date())
			])
			
		} catch (error) {
			return this.createError(`error add session , data new session : ${newSession}`, error)
		}
	}

	async endSession(idUser: ObjectId): Promise<TError | void> {
		try {
			const controllerSession = new ControllerSession(this.INN)			
			await controllerSession.endSession(idUser)
			await controllerSession.changeActionSessions(new Date())
		} catch (error) {
			return this.createError(`error end session , id user :${idUser}`, error)
		}
	}

	async getNewJWTToken(idUser: ObjectId, refreshToken: string): Promise<string | TError> {
		try {
			const controllerSession = new ControllerSession(this.INN)
			const changeSession = await controllerSession.getSessionByRefreshToken(refreshToken)
			if (!changeSession || changeSession.refreshToken != refreshToken) {
				return this.createError(
					'error refresh token not found session or refresh token does not match old refresh token'
				)
			}
			const _refreshToken = new RefreshToken()
			const checkRefreshToken = _refreshToken.changeActualToken(refreshToken)
			if (!checkRefreshToken) {
				return this.createError('EXPIRED')
			}
			return jwt.sign(
				{ _id: idUser, exp: add(new Date(), { weeks: 3 }) },
				process.env.NEXTAUTH_SERCRET || 'suerpsercretkey'
			)
		} catch (error) {
			return this.createError(`error get new jwt token, id user :${idUser},refresh token :${refreshToken}`,error)
		}
	}

	async changeActionSessions(idUser: ObjectId): Promise<void | TError> {
		try {
			const controllerSession = new ControllerSession(this.INN)
			await Promise.all([
				controllerSession.changeActionSessions(new Date()),
				controllerSession.updateLastAction(idUser),
			])
		} catch (error) {
			return this.createError(`error change action session , id user :${idUser}`, error)
		}
	}
	async getOnlineUsers(): Promise<TSession[] | null | TError> {
		try {
			const controllerSession = new ControllerSession(this.INN)
			const data = await controllerSession.getOnlineUsers()
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			return this.createError('error get online user', error)
		}
	}
}
