import { TResponseUploadFiles } from '@/shared/model/types/subtypes/Types'
import { TEntities } from '@/shared/model/types/subtypes/abstractsType'

export type TCounterparty = {
	dateCreate: Date
} & TNewDataCounterparty &
	TEntities

export type TDataCounterparty = {
	description: string
}

export type TNewDataCounterparty = {
	phone: string
	data?: TDataCounterparty[]
	name?: string
	email?: string
	INN?: string
	srcRequisites?: 'NOT_FOUND' | TResponseUploadFiles
}

export type TCounterpartyDTO = Omit<TCounterparty, '_id'> & { _id: string }
