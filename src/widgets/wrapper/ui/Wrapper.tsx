'use client'

import { useEffect } from 'react'

import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import { useInfoOrganization } from '@/shared/model/store/storeInfoOrganization'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'

import { setJWTToken, setRefreshToken } from '@/shared/lib/authToken'
import { TDataOrganization } from '@/shared/model/types/subtypes/TOrganization'
import { useLoader } from '@/shared/ui/namedLoader/model/storeLoader'
import CusSnackbar from '@/shared/ui/snackbar/ui/CusSnackbar'
import { SessionProvider } from 'next-auth/react'
import { TConfigAPP } from '../../../../Server/Service/serviceConfigApp/model/types/Type'
import { TTokens } from '../../../../Server/Service/serviceSession/model/types/Type'
import { TDBUserWithoutPas } from '../../../../Server/Service/serviceUser/model/types/Types'
import { fetchInitializationApp } from '../api/InitializationApp'

export type TWrapper = {
	phone: string
	infoOrganization: TDataOrganization
	dataConfigApp: TConfigAPP | null
	tokens?: Partial<TTokens>
	dataUser?: TDBUserWithoutPas
}

export default function Wrapper({ dataConfigApp, dataUser, infoOrganization, tokens, phone }: TWrapper) {
	const setInfoUser = useInfoUser((store) => store.setInfoUser)
	const setConfigApp = useConfigApp((store) => store.setDataConfigApp)
	const setTextLoader = useLoader((store) => store.setTextLoader)
	const setInfoOrganization = useInfoOrganization((state) => state.setInfoOrganization)

	useEffect(() => {
		if (tokens?.jwt && tokens.refreshToken) {
			setJWTToken(tokens.jwt)
			setRefreshToken(tokens.refreshToken)
		}

		setInfoOrganization(infoOrganization)
		const { nameOrganization } = infoOrganization
		setTextLoader(nameOrganization.abbreviated)

		if (dataConfigApp && dataUser) {
			setInfoUser(dataUser)
			setConfigApp(dataConfigApp)
		} else {
			fetchInitializationApp(infoOrganization.INN, phone).then((res) => {
				if (res) {
					setInfoUser(res.user)
					setConfigApp(res.dataConfigApp)
				}
			})
		}
	}, [])

	return (
		<SessionProvider>
			<div className=' overflow-x-auto p-2 '></div>
			<CusSnackbar />
		</SessionProvider>
	)
}
