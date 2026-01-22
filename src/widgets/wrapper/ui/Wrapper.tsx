'use client'

import { useEffect } from 'react'

import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import { useInfoOrganization } from '@/shared/model/store/storeInfoOrganization'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'

import { setJWTToken, setRefreshToken } from '@/shared/lib/authToken'
import { useLoader } from '@/shared/ui/namedLoader/model/storeLoader'
import CusSnackbar from '@/shared/ui/snackbar/ui/CusSnackbar'
import { SessionProvider } from 'next-auth/react'

import { TConfigAPP_DTO, TDataOrganizationDTO, TUserDTOWithoutPas } from '@/shared/model/types'
import { FetchRuleOrganization } from '@/shared/api/ruleOrganization/fetchRuleOrganization'
import { useParams } from 'next/navigation'
import { FetchUser } from '@/shared/api'


export type TWrapper = {
	INN:string
	idUSer:string,
	infoOrganization: TDataOrganizationDTO
	dataConfigApp: TConfigAPP_DTO
	dataUser: TUserDTOWithoutPas
	JWT?: string
	refreshToken?: string
}

export default function Wrapper({idUSer,INN, dataConfigApp, dataUser, infoOrganization,JWT,refreshToken }: TWrapper) {
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
			Promise.all([FetchUser.getUserById(INN,idUSer),
				FetchRuleOrganization.getParams(INN)
			]).then(([actualDataUser,actualDataOrganization])=>{
				setInfoUser(actualDataUser)
				setInfoOrganization(actualDataOrganization)
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
