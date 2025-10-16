import { Dispatch, SetStateAction } from 'react'
import { TValueCell, TValueTablePrice } from '../../../../Server/Service/servicePrice/model/types/types'

export type TTablePrice = {
	table: TValueTablePrice
	nameTable: string
	setDataTable?: Dispatch<SetStateAction<TValueTablePrice>>
}

export type TPanelRulePrice = {
	setListDescriptionTable: Dispatch<SetStateAction<string[]>>
	listDescriptionTable: string[]
}

export type TModalDescriptionTable = TPanelRulePrice & {
	setOpenModal: Dispatch<SetStateAction<boolean>>
	openModal: boolean
}

export type TCellTablePrice = {
	setDataTable?: Dispatch<SetStateAction<TValueTablePrice>>
	indexCell: TIndexCell
} & TValueCell

export type TIndexCell = {
	indexRow: number
	indexCol: number
}
