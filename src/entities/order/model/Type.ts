import { TOrderFullInfoDTO } from '@/shared/model/types'
import { Dispatch, SetStateAction } from 'react'

export type viewMode = 'list' | 'cards'
export type TRulePanelOrder = {
	load: boolean
	setLoader: Dispatch<SetStateAction<boolean>>
	setDataOrder: Dispatch<SetStateAction<TOrderFullInfoDTO[]>>
	setViewMode:Dispatch<SetStateAction<viewMode>>
	viewMode:viewMode
}
export type TListOrder = {
	dataOrder:TOrderFullInfoDTO[]
} 