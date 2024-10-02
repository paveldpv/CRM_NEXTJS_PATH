import { TDataOrganization } from '@/Types/subtypes/TOrganization'
import { create } from 'zustand'

type TStoreInfoOrganization = {
	infoOrganization: Partial<TDataOrganization>
	setInfoOrganization: (data: TDataOrganization) => void
}

export const useInfoOrganization = create<TStoreInfoOrganization>((set) => ({
	infoOrganization: {},
	setInfoOrganization: (data) => {
		set({ infoOrganization: data })
	},
}))
