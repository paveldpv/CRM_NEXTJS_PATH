import { TSketchDetail } from '@/shared/model/types/TRequestPrevCalc'
import { TResponseUploadFiles } from '@/shared/model/types/Types'
import { TEntities } from '@/shared/model/types/abstractsType'
import { ObjectId } from 'mongoose'

export type TNewDetail = Omit<TDetail, 'id' | 'safeDeleted'|'dateAddDetail'>

export type TDetail = {
	_id: ObjectId
	idOrder: ObjectId
	nameDetail: string
	dateAddDetail:Date,
	description?: string[]
	files?: TResponseUploadFiles[] | 'NOT_FOUND'
	price?: {
		price: number
	}	
	propertyDetail?: string[] // TPropertyDetail
	sketch?: TSketchDetail
} & TEntities
