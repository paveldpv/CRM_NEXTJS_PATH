import { TEntities } from '@/shared/model/types/subtypes/abstractsType'
import { Types } from 'mongoose'
import { TDBUserWithoutPas, TUserDTOWithoutPas } from '../../../serviceUser/model/types/Types'

export type TGeoLocation = {
	process: PURPOSE_USE
	user: Types.ObjectId
	date: Date
	location?: TCoordinateLocation
	ip?: string
	descriptionProcess?: string //?enums
} & TEntities

export type TNewDataGeoLocationDTO = Omit<TGeoLocation, 'date' | 'user'> & { user: string }

export type TCoordinateLocation = {
	latitude: number
	longitude: number
}

export enum PURPOSE_USE {
	redact = 'REDACT',
	auth = 'AUTH',
	registrate = 'REGISTRATE',
}

export type TGeolLocationFullInfo = Omit<TGeoLocation, 'user'> & { user: TDBUserWithoutPas }

export type TGeolLocationDTO = Omit<TGeoLocation, 'user' | '_id'> & { user: string; _id: string }
export type TGeolLocationFullInfoDTO = Omit<TGeolLocationDTO, 'user'> & { user: TUserDTOWithoutPas }


