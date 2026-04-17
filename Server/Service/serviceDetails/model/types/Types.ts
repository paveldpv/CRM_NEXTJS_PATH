import { TResponseUploadFiles } from '@/shared/model/types/subtypes/Types'
import { TEntities } from '@/shared/model/types/subtypes/abstractsType'
import { Types } from 'mongoose'
import { TOrderFullInfo, TOrderFullInfoDTO } from '../../../serviceOrder/model/types/Types'
import { TSketchDetail } from '../../../servicePrevCacl/model/types/Types'

export type TPropertyStep = {
	name: string
	completed: boolean
	createBy: Types.ObjectId
	employeeId: Types.ObjectId
	dateCompleted?: Date
	dateCreateStep?: Date
}

export type TNewStep = Omit<TPropertyStep, 'employeeId'>



export type TBaseDetail = {
	entitiesType: "DETAIL"
	order: Types.ObjectId
	nameDetail: string
	dateAddDetail: Date
	completed: boolean
	amount: number
	completedAmount: number
	description?: string[]
	files?: TResponseUploadFiles[] | []
	price?: { price: number }
	propertyDetail?: string[]
	sketch?: TSketchDetail
	step?: TPropertyStep[]
	components?: never
} & TEntities

export type TAssemblyDetail = {
	entitiesType: "ASSEMBLY"
	order: Types.ObjectId
	nameDetail: string
	dateAddDetail: Date
	completed: boolean
	amount: number
	completedAmount: number
	components?: Types.ObjectId[]
	description?: string[]
	files?: TResponseUploadFiles[] | []
	price?: { price: number }
	propertyDetail?: string[]
	sketch?: TSketchDetail
	step?: TPropertyStep[]
} & TEntities

export type TDetail = TBaseDetail | TAssemblyDetail


//#region  NEW TYPES
export type TNewBaseDetail = Omit<TBaseDetail, '_id' | 'safeDeleted' | 'dateAddDetail'>
export type TNewAssemblyDetail = Omit<TAssemblyDetail, '_id' | 'safeDeleted' | 'dateAddDetail'>
export type TNewDetail = TNewBaseDetail | TNewAssemblyDetail
//#endregion



//#region DTO TYPES
export type TBaseDetailDTO = Omit<TBaseDetail, '_id' | 'order' | 'components'> & {
    _id: string
    order: string
    components?: never
}

export type TAssemblyDetailDTO = Omit<TAssemblyDetail, '_id' | 'order' | 'components'> & {
    _id: string
    order: string
    components: string[]
}

export type TDetailDTO = TBaseDetailDTO | TAssemblyDetailDTO
//#endregion


//#region  FULL INFO TYPES
export type TFullInfoBaseDetail = Omit<TBaseDetail, 'order'> & { 
    order: TOrderFullInfo 
}

export type TFullInfoAssemblyDetail = Omit<TAssemblyDetail, 'order' | 'components'> & { 
    order: TOrderFullInfo
    components: TFullInfoBaseDetail[]
}

export type TFullInfoTDetail = TFullInfoBaseDetail | TFullInfoAssemblyDetail
//#endregion


//#region FULL INFO DTO TYPES
export type TFullInfoBaseDetailDTO = Omit<TBaseDetail, '_id' | 'order' | 'components'> & {
    _id: string
    order: TOrderFullInfoDTO
    components?: never
}

export type TFullInfoAssemblyDetailDTO = Omit<TAssemblyDetail, '_id' | 'order' | 'components'> & {
    _id: string
    order: TOrderFullInfoDTO
    components: TFullInfoBaseDetailDTO[]
}
export type TFullInfoTDetailDTO = TFullInfoBaseDetailDTO | TFullInfoAssemblyDetailDTO
//#endregion




//#region NEW DTO TYPES
export type TNewBaseDetailDTO = Omit<TNewBaseDetail, 'order' | 'components'> & {
    order: string
    components?: never
}

export type TNewAssemblyDetailDTO = Omit<TNewAssemblyDetail, 'order' | 'components'> & {
    order: string
    components: string[]
}

export type TNewDetailDTO = TNewBaseDetailDTO | TNewAssemblyDetailDTO
//#endregion