'use client'

import { useEffect } from 'react'

import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import { useInfoOrganization } from '@/shared/model/store/storeInfoOrganization'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import { useLoader } from '@/shared/model/store/storeLoader'
import { TConfigAPP } from '@/shared/model/types/subtypes/TAppearanceConfigApp'
import { TDataOrganization } from '@/shared/model/types/subtypes/TOrganization'
import { TWithoutPassUser } from '@/shared/model/types/Types'

export type TWrapper = {
	dataUser: TWithoutPassUser
	infoOrganization: TDataOrganization
	dataConfigApp: TConfigAPP
}

export default function Wrapper({ dataConfigApp, dataUser, infoOrganization }: TWrapper) {
	const setInfoUser         = useInfoUser((store) => store.setInfoUser)
	const setConfigApp        = useConfigApp((store) => store.setDataConfigApp)
	const setTextLoader       = useLoader((store) => store.setTextLoader)
	const setInfoOrganization = useInfoOrganization((state) => state.setInfoOrganization)

	useEffect(() => {
		const { nameOrganization } = infoOrganization
		setInfoUser(dataUser)
		setConfigApp(dataConfigApp)
		setTextLoader(nameOrganization.abbreviated)
		setInfoOrganization(infoOrganization)
	}, [])

	return (
		<div className=' overflow-x-auto p-2 '>
			Lorem 
		</div>
	)
}
