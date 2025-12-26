import { TResponseUploadFiles } from '@/shared/model/types/subtypes/Types'
import { TEntities } from '@/shared/model/types/subtypes/abstractsType'
import { Types } from 'mongoose'
import { TOrderFullInfo, TOrderFullInfoDTO } from '../../../serviceOrder/model/types/Types'
import { TSketchDetail } from '../../../servicePrevCacl/model/types/Types'

export type TNewDetail = Omit<TDetail, '_id' | 'safeDeleted' | 'dateAddDetail'>

export type TPropertyStep = {
	name: string
	completed: boolean
	createBy: Types.ObjectId
	employeeId: Types.ObjectId
	dateCompleted?: Date
	dateCreateStep?: Date
}

export type TNewStep = Omit<TPropertyStep, 'employeeId'>

export type TDetail = {
	order: Types.ObjectId
	nameDetail: string
	dateAddDetail: Date
	completed: boolean
	description?: string[]
	files?: TResponseUploadFiles[] | []
	price?: {
		price: number
	}
	propertyDetail?: string[] // TPropertyDetail
	sketch?: TSketchDetail
	step?: TPropertyStep[]
} & TEntities

export type TFullInfoTDetail = Omit<TDetail, 'order'> & { order: TOrderFullInfo }
export type TDetailDTO = Omit<TDetail, '_id' | 'order'> & { _id: string; order: string }

export type TFullInfoTDetailDTO = Omit<TFullInfoTDetail, '_id' | 'order'> & {
	_id: string
	order: TOrderFullInfoDTO
}

export type TNewDetailDTO = Omit<TNewDetail, 'order'> & { order: string }

// export type TDetailDTO = Omit<TDetail,'_id'> & {_id:string}
