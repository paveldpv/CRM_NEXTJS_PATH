import { getServerSession } from 'next-auth'


import { redirect } from 'next/navigation'
import authConfig from '../../../../../config/authConfig'

import { typicalError } from '@/shared/model/types/enums'
import { TConfigAPP } from '@/shared/model/types/subtypes/TAppearanceConfigApp'
import { TError } from '@/shared/model/types/subtypes/TError'
import { TDataOrganization } from '@/shared/model/types/subtypes/TOrganization'

import Link from 'next/link'
import { ServiceConfigApp } from '../../../../../Server/Service/serviceConfigApp'
import { ServiceRuleOrganization } from '../../../../../Server/Service/serviceRuleOrganization'
import { ServiceUsers } from '../../../../../Server/Service/serviceUser'
import { isError } from '../../../../shared/lib/IsError'
import { TDBUser } from '@/shared/model/types/Types'
import Wrapper from '@/widgets/wrapper/ui/Wrapper'

const getDataUser = async (INN: string, phone: string): Promise<TDBUser | null | TError> => {
	const serviceUsers = new ServiceUsers(INN)
	return await serviceUsers.getUserByPhone(phone)
}
const getConfigApp = async (INN: string, idUser: string): Promise<TConfigAPP | TError | null> => {
	const serviceConfigApp = new ServiceConfigApp(INN)
	return await serviceConfigApp.getPersonalConfig(idUser)
}

const getInfoOrganization = async (INN: string): Promise<TDataOrganization | null | TError> => {
	const serviceOrganization = new ServiceRuleOrganization(INN)
	return await serviceOrganization.getParamsOrganization()
}

export default async function page({ params }: { params: { INN: string; PHONE: string } }) {
	const { PHONE, INN } = params
	const session = await getServerSession(authConfig)
	let dataUser = await getDataUser(INN, PHONE)

	if (dataUser == null || isError(dataUser)) {
		redirect(`/ERROR/${typicalError.error_DB}`)
	}

	const { password, ...userWithoutPas } = dataUser

	const dataApp = await Promise.all([getConfigApp(INN, userWithoutPas.idUser), getInfoOrganization(INN)])

	const er = dataApp.some((el) => el == null || isError(el))

	if (er) {
		redirect(`/ERROR/${typicalError.error_DB}`)
	}

	const [configApp, infoOrganization] = dataApp as [TConfigAPP, TDataOrganization]

	if (session) {
		return <Wrapper dataConfigApp={configApp} dataUser={userWithoutPas} infoOrganization={infoOrganization} />
	} else {
		;<div className=' bg-slate-600'>
			<Link className=' text-6xl bg-slate-700' href={'/sign'}>
				вход не выполнен
			</Link>
		</div>
	}
}
