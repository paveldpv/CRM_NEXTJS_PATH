import { TEntities } from '@/shared/model/types/abstractsType'
import { Types } from 'mongoose'
import { TDBUserWithoutPas, TUserDTOWithoutPas } from '../../../serviceUser/model/types/Types'

export type TSession = {
	user: Types.ObjectId
	refreshToken: string
	online: boolean
	lastAction: Date
} & TEntities

export type TTokens = {
	jwt: string
	refreshToken: string
}
export type TSessionFullInfo = Omit<TSession, 'user'> & { user: TDBUserWithoutPas }
export type TSessionDTO = Omit<TSession, '_id' | 'user'> & { _id: string; user: string }
export type TSessionFullInfoDTO = Omit<TSession, '_id' | 'user'> & {
	_id: string
	user: TUserDTOWithoutPas
}
