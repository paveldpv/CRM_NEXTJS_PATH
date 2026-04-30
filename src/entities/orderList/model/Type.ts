import { viewMode } from '@/shared/components/panelViewMode/model/Types'
import { TCounterpartyDTO, TOrderFullInfoDTO } from '@/shared/model/types'
import { Dispatch, SetStateAction } from 'react'

export type TDateSearch = {
	dateStart: Date
	dateEndDate: Date
}

export type TRulePanelOrder = {
	permission: boolean
	totalOrder: number
	load: boolean
	setLoader: (state:boolean)=>void
	setDataOrder: Dispatch<SetStateAction<TOrderFullInfoDTO[]>>
	setViewMode: Dispatch<SetStateAction<viewMode>>
	viewMode: viewMode
}
export type TListOrder = {
	viewMode: viewMode
	dataOrder: TOrderFullInfoDTO[]
	

}
export type TPaginationPanel = {
	totalOrder: number
	setLoader: (state:boolean)=>void
	setDataOrder: Dispatch<SetStateAction<TOrderFullInfoDTO[]>>
}


