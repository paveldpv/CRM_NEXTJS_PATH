import { TCounterpartyDTO, TDetailDTO, TOrderFullInfoDTO } from '@/shared/model/types'
import { Dispatch, SetStateAction } from 'react'

export type TGeneralFormOrder = {
	listCounterparty?: TCounterpartyDTO[] | []
	order?: TOrderFullInfoDTO
}
export type TFormOrder = {
	permission: boolean
	setOrderData: Dispatch<SetStateAction<TOrderFullInfoDTO | undefined>>
	order?: TOrderFullInfoDTO
}

export type TFormCounterparty = {
	permission: boolean
	counterparty?: TCounterpartyDTO[] | []
	selectedCounterparty?: TCounterpartyDTO
	setCounterparty: Dispatch<SetStateAction<TCounterpartyDTO[]>>
}
export type TFormDetails = {
	permission: boolean
	amountDetails: number
	idOrder?: string
}
export type TListDetails = {
	permission: boolean
	setRedactDetail: Dispatch<SetStateAction<TDetailDTO | null>>
	setModalDetail: Dispatch<SetStateAction<boolean>>
	details: TDetailDTO[]
}
export type TFormUpdateDetail = {
	setDetails: Dispatch<SetStateAction<TDetailDTO[]>>
	setModalDetail: Dispatch<SetStateAction<boolean>>
	setLoader: Dispatch<SetStateAction<boolean>>
	redactDetail: TDetailDTO | null
}

export type TDetail = {
	permission: boolean
	detail: TDetailDTO
	setRedactDetail: Dispatch<SetStateAction<TDetailDTO | null>>
	setModalDetail: Dispatch<SetStateAction<boolean>>
}

export type TTooltipAcceptOfCargoEmployee = {
	_id:string,
	phone: string
	name?: string
	surname?: string
	lastNam?: string
	nameJobTitle?: string
}
