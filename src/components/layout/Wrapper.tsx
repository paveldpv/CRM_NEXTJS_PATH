'use client'
import { TWithoutPassUser } from '@/Types/Types'
import { useEffect } from 'react'
// import { useDataUser } from "../../../store/storeConfigApp";

import { TConfigAPP } from '@/Types/subtypes/TAppearanceConfigApp'
import { TDataOrganization } from '@/Types/subtypes/TOrganization'
import { useConfigApp } from '../../../store/storeConfigApp'
import { useInfoOrganization } from '../../../store/storeInfoOrganization'
import { useInfoUser } from '../../../store/storeInfoUser'
import { useLoader } from '../../../store/storeLoader'

export type TWrapper = {
	dataUser: TWithoutPassUser
	infoOrganization: TDataOrganization
	dataConfigApp: TConfigAPP
}

export default function Wrapper({
	dataConfigApp,
	dataUser,
	infoOrganization,
}: TWrapper) {
	
	const setInfoUser         = useInfoUser((store) => store.setInfoUser)
	const setConfigApp        = useConfigApp((store) => store.setDataConfigApp)
	const setTextLoader       = useLoader((store) => store.setTextLoader)
	const setInfoOrganization = useInfoOrganization(
		(state) => state.setInfoOrganization
	)

	useEffect(() => {
		const { nameOrganization } = infoOrganization
		setInfoUser(dataUser)
		setConfigApp(dataConfigApp)
		setTextLoader(nameOrganization.abbreviated)
		setInfoOrganization(infoOrganization)
	}, [])

	return (
		<div className=' overflow-x-auto p-2 '>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
			praesentium reprehenderit aspernatur sunt deleniti consequatur molestiae
			accusantium error, cupiditate aperiam sint explicabo nobis, incidunt ut
			unde aut, id suscipit laboriosam!
		</div>
	)
}
