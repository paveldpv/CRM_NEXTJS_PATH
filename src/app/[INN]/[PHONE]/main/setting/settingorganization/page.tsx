import { cache } from 'react'

import { TApprover } from '@/shared/model/types/customType'
import { typicalError } from '@/shared/model/types/enums'
import { TDaDataOrganization } from '@/shared/model/types/subtypes/TDaDataOrganization'
import { TError } from '@/shared/model/types/subtypes/TError'
import { TDataOrganization } from '@/shared/model/types/subtypes/TOrganization'
import { TRequisites } from '@/shared/model/types/subtypes/TRequisites'
import ProgressLoader from '@/shared/ui/ProgressLoader/ui/ProgressLoader'

import { ServiceDaDataOrganization } from '../../../../../../../Server/Service/serviceDaDataOrganization'
import { ServiceRequisites } from '../../../../../../../Server/Service/serviceRequisites/serviceReqisites'
import { ServiceRuleOrganization } from '../../../../../../../Server/Service/serviceRuleOrganization/serviceRuleOrganization'
import { ServiceUsers } from '../../../../../../../Server/Service/serviceUser'

import { TDBUser } from '@/shared/model/types/Types'
import { redirect } from 'next/navigation'
import { isError } from '../../../../../../shared/lib/IsError'

import FormAdminPanel from '@/entities/organizationSetting/ui/FormAdminPanel'
import DialogWindow from '@/shared/ui/DialogWindow'
import HelpInformerModalWindow from '@/shared/ui/HelpInformerModalWindow/ui/HelpInformerModalWindow'
//entities
export const revalidate = 10

export type TFullDataSettingOrganization = {
	dataOrganization: TApprover<TDataOrganization, 'INN'>
	admins: TDBUser[]
	daDataOrganization: TDaDataOrganization
	dataRequisites: TRequisites
}

export const getDataOrganization = cache(
	async (INN: string): Promise<TFullDataSettingOrganization | TError> => {
		const infoOrganization = await Promise.all([
			new ServiceUsers(INN).getInfoAdmin(),
			new ServiceRuleOrganization(INN).getParamsOrganization(),
			new ServiceDaDataOrganization(INN).getDaDataRuleOrganization(),
			new ServiceRequisites(INN).getRequisitesCurrentOrganization(),
		])

		const errorData = infoOrganization.find((data) => isError(data))
		if (errorData) {
			return errorData
		}

		return {
			admins: infoOrganization[0] as TDBUser[],
			dataOrganization: infoOrganization[1] as TApprover<TDataOrganization, 'INN'>,
			daDataOrganization: infoOrganization[2] as TDaDataOrganization,
			dataRequisites: infoOrganization[3] as TRequisites,
		}
	}
)

export default async function page({ params }: { params: { INN: string } }) {
	const dataOrganization = await getDataOrganization(params.INN)

	if (isError(dataOrganization)) {
		redirect(`/ERROR/${typicalError.error_DB}`)
	}

	return (
		<div>
			<FormAdminPanel INN={params.INN} data={dataOrganization} />
			<ProgressLoader />
			<DialogWindow />
			<HelpInformerModalWindow />
		</div>
	)
}
