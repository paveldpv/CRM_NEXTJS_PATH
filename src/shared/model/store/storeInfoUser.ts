import { create } from 'zustand'
import { TDBUserWithoutPas, TUserDTOWithoutPas } from '../../../../Server/Service/serviceUser/model/types/Types'
import { ROOT_LINK } from '../../../../Server/Service/servicePermissionRedactData/model/types/Types'

type TStoreInfoUser = {
	setInfoUser: (state: TUserDTOWithoutPas) => void
	dataUser: TUserDTOWithoutPas | null
	permission:boolean
}

export const useInfoUser = create<TStoreInfoUser>((set) => ({
	permission:false,
	dataUser: null,
	setInfoUser: (state) => {
		set({
			dataUser: { ...state },
			permission:	state?.linksAllowed === 'ADMIN' || state?.linksAllowed.some((el) => el.href === ROOT_LINK.order && !el.readonly)

		})
	},
}))
