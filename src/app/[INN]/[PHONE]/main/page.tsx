import { getServerSession } from 'next-auth'

import { TDBUser } from '@/Types/Types'
import { redirect } from 'next/navigation'
import authConfig from '../../../../../config/authConfig'

import Wrapper from '@/components/layout/Wrapper'
import { typicalError } from '@/Types/enums'
import { TConfigAPP } from '@/Types/subtypes/TAppearanceConfigApp'
import { TError } from '@/Types/subtypes/TError'
import { TDataOrganization, TNameOrganization } from '@/Types/subtypes/TOrganization'
import Link from 'next/link'
import { ServiceConfigApp } from '../../../../../Controllers/Service/serviceConfigApp'
import { ServiceRuleOrganization } from '../../../../../Controllers/Service/serviceRuleOrganization'
import { ServiceUsers } from '../../../../../Controllers/Service/serviceUser'
import { isError } from '../../../../../function/IsError'

const getDataUser = async (
	INN: string,
	phone: string
): Promise<TDBUser | null | TError> => {
	const serviceUsers = new ServiceUsers(INN)
	return await serviceUsers.getUserByPhone(phone)
}
const getConfigApp = async (
	INN: string,
	idUser: string
): Promise<TConfigAPP | TError | null> => {
	const serviceConfigApp = new ServiceConfigApp(INN)
	return await serviceConfigApp.getPersonalConfig(idUser)
}

const getInfoOrganization = async(INN:string):Promise<TDataOrganization|null|TError>=>{
	const serviceOrganization = new ServiceRuleOrganization(INN)
	return await serviceOrganization.getParamsOrganization()
}

export default async function page({
	params,
}: {
	params: { INN: string; PHONE: string }
}) {
	const { PHONE, INN } = params
	const session = await getServerSession(authConfig)
	let dataUser = await getDataUser(INN, PHONE)

	if (dataUser == null || isError(dataUser)) {
		redirect(`/ERROR/${typicalError.error_DB}`)
	}

	const { password, ...userWithoutPas } = dataUser

	const dataApp = await Promise.all([
		getConfigApp(INN, userWithoutPas.idUser),
		
		getInfoOrganization(INN)
	])

	const er = dataApp.some((el) => el == null || isError(el))

	if (er) {
		redirect(`/ERROR/${typicalError.error_DB}`)
	}

	const [configApp,infoOrganization ] = dataApp as [
		TConfigAPP,
		TDataOrganization
	]

	if (session) {
		return (
			<Wrapper
				dataConfigApp={configApp}
				dataUser={userWithoutPas}
				infoOrganization={infoOrganization}
			/>
		)
	} else {
		;<div className=' bg-slate-600'>
			<Link className=' text-6xl bg-slate-700' href={'/sign'}>
				вход не выполнен
			</Link>
		</div>
	}
}
