import { TError } from '@/shared/model/types/subtypes/TError'
import { add } from 'date-fns'
import jwt from 'jsonwebtoken'

import { Types } from 'mongoose'
import { Token } from '../../classes/RefreshToken'
import { Service } from '../../classes/Service'
import { ControllerSession } from './controller/session.controller'
import { TSession, TTokens } from './model/types/Type'

export class ServiceSession extends Service {
	constructor(INN: string) {
		super(INN)
	}

	public async addSession(idUser: Types.ObjectId): Promise<TError | TTokens> {
		const currentDate = new Date()
		const newSession: Omit<TSession, '_id'> = {
			user: idUser,
			refreshToken: Token.generate(),
			online: true,
			lastAction: currentDate,
			safeDeleted: false,
		}
		try {
			const controllerSession = new ControllerSession(this.INN)
			const checkSession = await controllerSession.getPersonalSession(idUser)
			if (checkSession === null) {
				await Promise.all([
					controllerSession.addSession(newSession),
					controllerSession.changeActionSessions(new Date()),
				])
			} else {
				await Promise.all([
					controllerSession.updateLastAction(idUser),
					controllerSession.changeActionSessions(new Date()),
				])
			}
			return {
				refreshToken: newSession.refreshToken,
				jwt: Token.generate(1),
			}
		} catch (error) {
			return this.createError(`error add session , data new session : ${newSession}`, error)
		}
	}

	public async endSession(idUser: Types.ObjectId): Promise<TError | void> {
		try {
			const controllerSession = new ControllerSession(this.INN)
			await controllerSession.endSession(idUser)
			await controllerSession.changeActionSessions(new Date())
		} catch (error) {
			return this.createError(`error end session , id user :${idUser}`, error)
		}
	}

	public async getNewJWTToken(idUser: Types.ObjectId, refreshToken: string): Promise<string | TError> {
		try {
			const controllerSession = new ControllerSession(this.INN)
			const changeSession = await controllerSession.getSessionByRefreshToken(refreshToken)
			if (!changeSession || changeSession.refreshToken != refreshToken) {
				return this.createError(
					'error refresh token not found session or refresh token does not match old refresh token'
				)
			}
			const _refreshToken = new Token()
			const checkRefreshToken = _refreshToken.changeActualToken(refreshToken)
			if (!checkRefreshToken) {
				return this.createError('EXPIRED')
			}
			return jwt.sign(
				{ _id: idUser, exp: add(new Date(), { weeks: 3 }) },
				process.env.NEXTAUTH_SERCRET || 'suerpsercretkey'
			)
		} catch (error) {
			return this.createError(`error get new jwt token, id user :${idUser},refresh token :${refreshToken}`, error)
		}
	}

	public async changeActionSessions(inspector: Types.ObjectId): Promise<void | TError> {
		try {
			const controllerSession = new ControllerSession(this.INN)
			await Promise.all([
				controllerSession.changeActionSessions(new Date()),
				controllerSession.updateLastAction(inspector),
			])
		} catch (error) {
			return this.createError(`error change action session , id user :${inspector}`, error)
		}
	}

	public async getOnlineSession(): Promise<TSession[] | null | TError> {
		try {
			const controllerSession = new ControllerSession(this.INN)
			const data = await controllerSession.getOnlineSession()
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			return this.createError('error get online user', error)
		}
	}
}
