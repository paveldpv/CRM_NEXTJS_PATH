import { getServerSession } from 'next-auth'

import { redirect } from 'next/navigation'
import authConfig from '../../../../../config/authConfig'

import { typicalError } from '@/shared/model/types/subtypes/enums'

import { TError } from '@/shared/model/types/subtypes/TError'
import { TDataOrganization } from '@/shared/model/types/subtypes/TOrganization'

import Wrapper from '@/widgets/wrapper/ui/Wrapper'

import { ServiceRuleOrganization } from '../../../../../Server/Service/serviceRuleOrganization/serviceRuleOrganization'

import { isError } from '../../../../shared/lib/IsError'

import { Types } from 'mongoose'
import { TConfigAPP } from '../../../../../Server/Service/serviceConfigApp/model/types/Type'
import { ServiceConfigApp } from '../../../../../Server/Service/serviceConfigApp/serviceConfigApp'
import { TDBUserWithoutPas } from '../../../../../Server/Service/serviceUser/model/types/Types'

const initializationConfigApp = async (INN: string, idUser?: Types.ObjectId): Promise<TConfigAPP | TError | null> => {
	if (!idUser) return null
	const serviceConfigApp = new ServiceConfigApp(INN)
	return await serviceConfigApp.getPersonalConfig(idUser)
}

const initializationOrganization = async (INN: string): Promise<TDataOrganization | null | TError> => {
	const serviceOrganization = new ServiceRuleOrganization(INN)
	return await serviceOrganization.getParamsOrganization()
}

export default async function page({ params }: { params: { INN: string; PHONE: string } }) {
	const { PHONE, INN } = params
	const session = await getServerSession(authConfig)
	const dataUser = session?.user as TDBUserWithoutPas
	const jwt = session?.jwt
	const refreshToken = session?.refreshToken

	const dataApp = await Promise.all([initializationConfigApp(INN, dataUser._id), initializationOrganization(INN)])
	console.log(`data app test from page`, dataApp[0])

	const er = dataApp.some((el) => isError(el))

	if (er) {
		redirect(`/ERROR/${typicalError.error_DB}`)
	}

	const [configApp, infoOrganization] = dataApp as [TConfigAPP | null, TDataOrganization]

	return (
		<Wrapper
			phone={PHONE}
			dataConfigApp={configApp}
			dataUser={dataUser}
			infoOrganization={infoOrganization}
			tokens={{ jwt, refreshToken }}
		/>
	)
}
