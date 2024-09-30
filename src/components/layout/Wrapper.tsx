'use client'
import { TWithoutPassUser } from '@/Types/Types'
import { useEffect } from 'react'
// import { useDataUser } from "../../../store/storeConfigApp";

import { TConfigAPP } from '@/Types/subtypes/TAppearanceConfigApp'
import { useConfigApp } from '../../../store/storeConfigApp'
import { useInfoUser } from '../../../store/storeInfoUser'
import { useLoader } from '../../../store/storeLoader'

export type TWrapper = {
	dataUser: TWithoutPassUser

	nameOrganization: string
	dataConfigApp: TConfigAPP
}

export default function Wrapper({
	dataConfigApp,
	dataUser,
	nameOrganization,
}: TWrapper) {
	const setInfoUser = useInfoUser((store) => store.setInfoUser)
	const setConfigApp = useConfigApp((store) => store.setDataConfigApp)
	const setTextLoader = useLoader((store) => store.setTextLoader)
	const { configMain } = dataConfigApp

	useEffect(() => {
		console.log(nameOrganization);
		
		setInfoUser(dataUser)
		setConfigApp(dataConfigApp)
		setTextLoader(nameOrganization)
	}, [])

	return (
		<div
			className=' overflow-x-auto p-2 '
			style={{
				background: configMain?.color?.bgColor,
				color: configMain?.color?.textColor,
				borderColor: configMain?.color?.borderColor,
				//fontSize: configMain.textSize,
			}}
		>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
			praesentium reprehenderit aspernatur sunt deleniti consequatur molestiae
			accusantium error, cupiditate aperiam sint explicabo nobis, incidunt ut
			unde aut, id suscipit laboriosam!
		</div>
	)
}
