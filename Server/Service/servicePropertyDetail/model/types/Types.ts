import { TEntities } from '@/shared/model/types/abstractsType'

export type TPropertyDetail = {
	property: string
} & TEntities

export type TPropertyDetailDTO = Omit<TPropertyDetail,'_id'>&{_id:string}