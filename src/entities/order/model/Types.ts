import { TAssemblyDetailDTO, TBaseDetailDTO, TCounterpartyDTO, TDetailDTO, TOrderFullInfoDTO } from '@/shared/model/types'
import { Dispatch, SetStateAction } from 'react'

export type TGeneralFormOrder = {
	listCounterparty?: TCounterpartyDTO[] | []
	order?: TOrderFullInfoDTO
}
export type TFormOrder = {
	permission: boolean
}
export type TFormCounterparty = {
	permission: boolean
	onSelectCounterparty: (counterparty: TCounterpartyDTO) => void
	counterparty?: TCounterpartyDTO[] | []
	selectedCounterparty?: TCounterpartyDTO
	setCounterparty: Dispatch<SetStateAction<TCounterpartyDTO[]>>
}
export type TFormDetails = {
	permission: boolean
	amountDetails: number
	idOrder?: string
	numberOrder?: number
}
export type TListDetails = {
	setLoader: Dispatch<SetStateAction<boolean>>
	permission: boolean
	setRedactDetail: Dispatch<SetStateAction<TBaseDetailDTO | null>>
	setModalDetail: Dispatch<SetStateAction<boolean>>
	setRedactAssemblyDetail: (detail: TAssemblyDetailDTO) => void
	setDetails: Dispatch<SetStateAction<TDetailDTO[]>>
	setModalAssemblyDetail: (open: boolean) => void
	details: TDetailDTO[]
}
export type TFormUpdateDetail = {
	setDetails: Dispatch<SetStateAction<TDetailDTO[]>>
	setModalDetail: Dispatch<SetStateAction<boolean>>
	setLoader: Dispatch<SetStateAction<boolean>>
	redactDetail: TBaseDetailDTO | null
	idOrder: string
	numberOrder?: number
}
export type TDetail = {
	setLoader: Dispatch<SetStateAction<boolean>>
	setDetails: Dispatch<SetStateAction<TDetailDTO[]>>
	permission: boolean
	detail: TBaseDetailDTO
	setRedactDetail: Dispatch<SetStateAction<TBaseDetailDTO | null>>
	setModalDetail: Dispatch<SetStateAction<boolean>>
}

export type TTooltipAcceptOfCargoEmployee = {
	_id: string
	phone: string
	name?: string
	surname?: string
	lastNam?: string
	nameJobTitle?: string
}

export type TAssemblyDetailProps = {
	setLoader: Dispatch<SetStateAction<boolean>>
	setDetails: Dispatch<SetStateAction<TDetailDTO[]>>
	detail: TAssemblyDetailDTO
	setRedactAssemblyDetail: (detail: TAssemblyDetailDTO) => void
	setModalAssemblyDetail: (open: boolean) => void
	setRedactDetail: Dispatch<SetStateAction<TBaseDetailDTO | null>>
	setModalDetail: Dispatch<SetStateAction<boolean>>
	permission: boolean
	
}
export type TListComponentsAssemblyDetail = {
	permission: boolean
	componentsAssemblyDetail: TBaseDetailDTO[] | []
	setComponents: Dispatch<SetStateAction<TBaseDetailDTO[]>>
	openRedactComponentDetail: (component: TBaseDetailDTO) => void
	removeComponent: (componentId: string) => void
}