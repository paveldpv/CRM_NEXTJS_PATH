import { TEntities } from '@/shared/model/types/subtypes/abstractsType'
import { TLink, TResponseUploadFiles } from '@/shared/model/types/subtypes/Types'

export type TDBUser = {
	phone: string
	password: string
	INN: string
	email: string
	dateRegistrate?: Date
	name?: string
	surname?: string
	lastName?: string
	dateBirthday?: Date
	nameJobTitle?: string
	linksAllowed: TLink[] | 'ADMIN'
	srcPhoto: 'NOT_FOUND' | TResponseUploadFiles
} & TEntities

export type TDBUserWithoutPas = Omit<TDBUser, 'password'>

export type TBirthdayDate = { startDay: Date; endDay: Date }
export type TNewUser = Omit<TDBUser, '_id'>

export type TUserDTO = Omit<TDBUser, '_id'> & { _id: string }

export type TUserDTOWithoutPas = Omit<TUserDTO, 'password'>//152 фз - так должно быть 

export type TUserDTOByBirthday = Pick<TUserDTOWithoutPas, 'name' | 'lastName' | 'surname' >
