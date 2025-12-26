import { create } from 'zustand'
import { TDBUserWithoutPas } from '../../../../Server/Service/serviceUser/model/types/Types'

type TStoreInfoUser = {
	setInfoUser: (state: TDBUserWithoutPas) => void
	dataUser: TDBUserWithoutPas | null
}

export const useInfoUser = create<TStoreInfoUser>((set) => ({
	dataUser: null,
	setInfoUser: (state) => {
		set({
			dataUser: { ...state },
		})
	},
}))
