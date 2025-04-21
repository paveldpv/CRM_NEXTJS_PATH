import { TResponseUploadFiles } from '@/shared/model/types/Types'
import { TEntities } from '@/shared/model/types/abstractsType'
import { ObjectId } from 'mongoose'


export type TCounterparty = {
	_id: ObjectId
	dateCreate:Date
} & TNewDataCounterparty & TEntities

export type TDataCounterparty = {
	description: string
}
export type TNewDataCounterparty = {
	phone:string,
	data?: TDataCounterparty[]
	name?:string
	email?:string
	INN?: string
	srcRequisites?: 'NOT_FOUND' | TResponseUploadFiles
}

