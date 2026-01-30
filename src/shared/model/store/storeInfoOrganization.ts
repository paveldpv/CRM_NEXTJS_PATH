
import { create } from 'zustand'
import { TDataOrganizationDTO } from '../types'

type TStoreInfoOrganization = {
	infoOrganization: Partial<TDataOrganizationDTO>
	setInfoOrganization: (data: TDataOrganizationDTO) => void
}

export const useInfoOrganization = create<TStoreInfoOrganization>((set) => ({
	infoOrganization: {},
	setInfoOrganization: (data) => {
		set({ infoOrganization: data })
	},
}))
