import { TSketchDetail } from '@/shared/model/types/TRequestPrevCalc'
import { TResponseUploadFiles } from '@/shared/model/types/Types'
import { TEntities } from '@/shared/model/types/abstractsType'
import { Types } from 'mongoose'
import { TOrder, TOrderFullInfo, TOrderFullInfoDTO } from '../../../serviceOrder/model/types/Types'

export type TNewDetail = Omit<TDetail, '_id' | 'safeDeleted' | 'dateAddDetail'>

export type TDetail = {
	order: Types.ObjectId
	nameDetail: string
	dateAddDetail: Date
	description?: string[]
	files?: TResponseUploadFiles[] | []
	price?: {
		price: number
	}
	propertyDetail?: string[] // TPropertyDetail
	sketch?: TSketchDetail
	amount?: number
} & TEntities

export type TFullInfoTDetail = Omit<TDetail, 'order'> & { order: TOrderFullInfo }
export type TDetailDTO = Omit<TDetail, '_id'> & { _id: string }

export type TFullInfoTDetailDTO = Omit<TFullInfoTDetail, '_id' | 'order'> & {
	_id: string
	order: TOrderFullInfoDTO
}

// export type TDetailDTO = Omit<TDetail,'_id'> & {_id:string}
