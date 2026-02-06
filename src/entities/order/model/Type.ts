import { viewMode } from '@/shared/components/panelViewMode/model/Types'
import { TCounterpartyDTO, TOrderFullInfoDTO } from '@/shared/model/types'
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

export type TGeneralFormOrder = {
	permission: boolean
	setLoader: Dispatch<SetStateAction<boolean>>
	setDataOrder: Dispatch<SetStateAction<TOrderFullInfoDTO[]>>
	serOpenForm: Dispatch<SetStateAction<boolean>>
	selectedOrder: TOrderFullInfoDTO | null
	
}
export type TFormCounterparty = {
	permission:boolean
	counterparty: TCounterpartyDTO[] | []
	setCounterparty: Dispatch<SetStateAction<TCounterpartyDTO[]>>
	selectedCounterpartyID: string | null
	setSelectCounterpartyID: Dispatch<SetStateAction<string | null>>
	setLoadForm: Dispatch<SetStateAction<boolean>>
	focusForm: TFocusForm
	setFocusForm: Dispatch<SetStateAction<TFocusForm>>
	// setCounterparty:Dispatch<SetStateAction<TCounterpartyDTO>>
}
export type TFocusForm = 'ORDER' | 'DETAIL' | 'CP'

export type TFormOrder = {permission:boolean, focusForm: TFocusForm; setFocusForm: Dispatch<SetStateAction<TFocusForm>> }
export type TFromDetail = {permission:boolean, focusForm: TFocusForm; setFocusForm: Dispatch<SetStateAction<TFocusForm>> }
export type TTitleFormTransform = {title:string,onClick:()=>void }
//,place:TFocusForm, setFocusForm: Dispatch<SetStateAction<TFocusForm>>