import { TEntities } from '@/shared/model/types/abstractsType'
import { TLink, TResponseUploadFiles } from '@/shared/model/types/Types'
import { ObjectId } from 'mongoose'

export type TDBUser = {
	_id:ObjectId,
	phone: string
	password: string
	INN: string
	// idUser: string
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

export type TNewUser = Omit<TDBUser,'_id'>