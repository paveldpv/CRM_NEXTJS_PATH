import { getServerSession } from 'next-auth'

import authConfig from '../../../../../config/authConfig'

import { isError } from '@/shared/lib/IsError'
import { TConfigAPP_DTO, TDataOrganizationDTO } from '@/shared/model/types'
import { typicalError } from '@/shared/model/types/subtypes/enums'
import Wrapper from '@/widgets/wrapper/ui/Wrapper'
import { redirect } from 'next/navigation'
import { MongoHelpers } from '../../../../../Server/classes/until/MongoHelpers'
import { ConfigAppDTO } from '../../../../../Server/Service/serviceConfigApp/configApp.dto'
import { ServiceConfigApp } from '../../../../../Server/Service/serviceConfigApp/serviceConfigApp'
import { RuleOrganizationDTO } from '../../../../../Server/Service/serviceRuleOrganization/ruleOrganizzation..dto'
import { ServiceRuleOrganization } from '../../../../../Server/Service/serviceRuleOrganization/serviceRuleOrganization'
import { TUserDTOWithoutPas } from '../../../../../Server/Service/serviceUser/model/types/Types'

const initializationApp = async (
	INN: string,
	idUser: string
): Promise<{ infoOrganization: TDataOrganizationDTO; dataConfigApp: TConfigAPP_DTO } | null> => {
	const _idUser = MongoHelpers.stringToObjectId(idUser)
	if (!_idUser) return null
	const serviceConfigApp = new ServiceConfigApp(INN)
	const serviceRuleOrganization = new ServiceRuleOrganization(INN)
	const [configApp, dataOrganization] = await Promise.all([
		serviceConfigApp.getPersonalConfig(_idUser),
		serviceRuleOrganization.getParamsOrganizationWithoutRequisites(),
	])
	if (isError(configApp) || isError(dataOrganization) || !configApp) {
		return null
	}

	return {
		infoOrganization: RuleOrganizationDTO.createDataOrganizationDTO(dataOrganization),
		dataConfigApp: ConfigAppDTO.createConfigAppDTO(configApp),
	}
}

export default async function page({ params }: { params: { INN: string; USER_ID: string } }) {
	const { USER_ID, INN } = params
	const session = await getServerSession(authConfig)
	const dataUser = session?.user as TUserDTOWithoutPas
	const JWT = session?.jwt
	const refreshToken = session?.refreshToken
	const resultInitializationApp = await initializationApp(INN, USER_ID)
	if (!resultInitializationApp) {
		redirect(`/ERROR/${typicalError.error_sever}`)
	}

	return (
		<Wrapper
			idUSer={USER_ID}
			INN={INN}
			JWT={JWT}
			refreshToken={refreshToken}
			dataConfigApp={resultInitializationApp.dataConfigApp}
			dataUser={dataUser}
			infoOrganization={resultInitializationApp.infoOrganization}
		/>
	)
}
