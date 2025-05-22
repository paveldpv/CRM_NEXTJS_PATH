import { ObjectId } from 'mongoose'

export type TSession = {
	idUser: ObjectId
	refreshToken: string
	online: boolean
	lastAction: Date
}
