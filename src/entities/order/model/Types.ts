import { TCounterpartyDTO, TOrderFullInfoDTO } from '@/shared/model/types'

export type TGeneralFormOrder = {
	listCounterparty?: TCounterpartyDTO[] | []
	order?: TOrderFullInfoDTO
}
export type TFormOrder = {
	permission: boolean
	order?: TOrderFullInfoDTO
}

export type TFormCounterparty = {
	permission: boolean
	counterparty?: TCounterpartyDTO[] | []
	selectedCounterparty?:TCounterpartyDTO
}
export type TFormDetails = {
	permission:boolean
	idOrder?:string
}