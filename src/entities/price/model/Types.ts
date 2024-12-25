import { Dispatch, SetStateAction } from 'react'

export type TPrice = {
	price: TDataTablePrice
	readonly: boolean
}


export type TDataTablePrice = {
	data: TValueTablePrice
	nameTable: string
	idTable: string
	optionDescriptionTable: string[]
}


export type TValueTablePrice = TValueCell[][]

export type TValueCell ={
	value :string
}

export type TTablePrice = {
	table: TValueTablePrice
	nameTable:string	
	setDataTable?: Dispatch<SetStateAction<TValueTablePrice>>
}


export  type TPanelRulePrice  = {
	setListDescriptionTable:Dispatch<SetStateAction<string[]>>
	listDescriptionTable:string[]
} 

export type TModalDescriptionTable = TPanelRulePrice & {
	setOpenModal: Dispatch<SetStateAction<boolean>>
	openModal:boolean
}


export type TCellTablePrice = {
	
	setDataTable?: Dispatch<SetStateAction<TValueTablePrice>>
	indexCell: TIndexCell
} & TValueCell

export type TIndexCell = {
	indexRow: number
	indexCol: number
}
