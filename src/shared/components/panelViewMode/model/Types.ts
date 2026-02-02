import { Dispatch, SetStateAction } from 'react'

export type TPanelViewMode = {
	viewMode: viewMode
	load: boolean
	setViewMode: Dispatch<SetStateAction<viewMode>>
}

export type viewMode = 'list' | 'cards'
