import { NotData } from '@/Types/enums'
import { create } from 'zustand'
import { TWithoutPassUser } from '../../../MES_CRM_NEXT/crm_mes/src/Types/Types'

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
		linksAllowed: 'ADMIN',
		safeDeleted: false,
	},

	setInfoUser: (state) => {
		set({
			dataUser: { ...state },
		})
	},
}))
