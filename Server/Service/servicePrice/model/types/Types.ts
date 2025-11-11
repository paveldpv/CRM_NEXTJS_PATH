import { TEntities } from '@/shared/model/types/subtypes/abstractsType'

export type TPrice = {
	price: TDataTablePrice
	readonly: boolean
}

export type TDataTablePrice = {
	data: TValueTablePrice
	nameTable: string
	optionDescriptionTable: string[]
} & TEntities

export type TDataNewTablePrice = Omit<TDataTablePrice, '_id'>
export type TValueTablePrice = TValueCell[][]

export type TValueCell = {
	value: string
}

export type TDataTablePriceDTO = Omit<TDataTablePrice, '_id'> & { _id: string }
export type TPriceDTO = {
	price: TDataTablePriceDTO
	readonly: boolean
}
