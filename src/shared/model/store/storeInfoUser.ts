import { NotData } from '@/shared/model/types/enums'

import { create } from 'zustand'
import { TWithoutPassUser } from '../types/Types'

type TStoreInfoUser = {
	setInfoUser: (state: TWithoutPassUser) => void
	dataUser: TWithoutPassUser
}

export const useInfoUser = create<TStoreInfoUser>((set) => ({
	dataUser: {
		INN: '',
		phone: '',
		idUser: '',
		srcPhoto: NotData.notFile,
		email: '',
		linksAllowed: [],
		safeDeleted: false,
	},

	setInfoUser: (state) => {
		set({
			dataUser: { ...state },
		})
	},
}))
