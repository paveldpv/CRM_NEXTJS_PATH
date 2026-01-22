import { create } from 'zustand'
import { TDBUserWithoutPas, TUserDTOWithoutPas } from '../../../../Server/Service/serviceUser/model/types/Types'

type TStoreInfoUser = {
	setInfoUser: (state: TUserDTOWithoutPas) => void
	dataUser: TUserDTOWithoutPas | null
}

export const useInfoUser = create<TStoreInfoUser>((set) => ({
	dataUser: null,
	setInfoUser: (state) => {
		set({
			dataUser: { ...state },
		})
	},
}))
