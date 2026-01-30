'use client'

import { useEffect } from 'react'

import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import { useInfoOrganization } from '@/shared/model/store/storeInfoOrganization'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'

import { setJWTToken, setRefreshToken } from '@/shared/lib/authToken'

import CusSnackbar from '@/shared/ui/snackbar/ui/CusSnackbar'

import { FetchUser } from '@/shared/api'
import { FetchRuleOrganization } from '@/shared/api/ruleOrganization/fetchRuleOrganization'
import { useLoader } from '@/shared/ui/loaders/namedLoader/model/storeLoader'
import { TWrapper } from '../model/Types/Type'

export default function Wrapper({ idUSer, INN, dataConfigApp, dataUser, infoOrganization, JWT, refreshToken }: TWrapper) {
	const setInfoUser = useInfoUser((store) => store.setInfoUser)
	const setConfigApp = useConfigApp((store) => store.setDataConfigApp)
	const setTextLoader = useLoader((store) => store.setTextLoader)
	const setInfoOrganization = useInfoOrganization((state) => state.setInfoOrganization)

	useEffect(() => {
		if (JWT && refreshToken) {
			setJWTToken(JWT)
			setRefreshToken(refreshToken)
		}

		setInfoOrganization(infoOrganization)
		const { nameOrganization } = infoOrganization
		setTextLoader(nameOrganization.abbreviated)

		if (dataConfigApp && dataUser) {
			setInfoUser(dataUser)
			setConfigApp(dataConfigApp)
		} else {
			Promise.all([FetchUser.getUserById(INN, idUSer), FetchRuleOrganization.getParams(INN)]).then(
				([actualDataUser, actualDataOrganization]) => {
					setInfoUser(actualDataUser)
					setInfoOrganization(actualDataOrganization)
				}
			)
		}
	}, [])

	return (
		<div>
			<div className=' overflow-x-auto p-2 '></div>
			<CusSnackbar />
		</div>
	)
}
