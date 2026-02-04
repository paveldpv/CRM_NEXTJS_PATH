import { viewMode } from '@/shared/components/panelViewMode/model/Types'
import { TOrderFullInfoDTO } from '@/shared/model/types'
import { Dispatch, SetStateAction } from 'react'

export type TDateSearch = {
	dateStart: Date
	dateEndDate: Date
}

export type TRulePanelOrder = {
	permission: boolean
	setOpenForm: Dispatch<SetStateAction<boolean>>
	load: boolean
	setLoader: Dispatch<SetStateAction<boolean>>
	setDataOrder: Dispatch<SetStateAction<TOrderFullInfoDTO[]>>
	setViewMode: Dispatch<SetStateAction<viewMode>>
	viewMode: viewMode
}
export type TListOrder = {
	viewMode: viewMode
	dataOrder: TOrderFullInfoDTO[]
	permission: boolean
	setOpenForm: Dispatch<SetStateAction<boolean>>
	setSelectedOrder: Dispatch<SetStateAction<TOrderFullInfoDTO | null>>
}
export type TPaginationPanel = {
	totalOrder: number
	setLoader: Dispatch<SetStateAction<boolean>>
	setDataOrder: Dispatch<SetStateAction<TOrderFullInfoDTO[]>>
}

export type TFormOrder = {
	permission: boolean
	setLoader: Dispatch<SetStateAction<boolean>>
	setDataOrder: Dispatch<SetStateAction<TOrderFullInfoDTO[]>>
	serOpenForm: Dispatch<SetStateAction<boolean>>
	selectedOrder: TOrderFullInfoDTO|null
}
