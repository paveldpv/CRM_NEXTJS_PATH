import { cache } from 'react'

import ProgressLoader from '@/components/UI/Loaders/ProgressLoader'
import DialogWindow from '@/components/additional/DialogWindow'
import { typicalError } from '@/Types/enums'
import { TRequisites } from '@/Types/subtypes/TRequisites'
import { TDataOrganization } from '@/Types/subtypes/TOrganization'
import { TApprover } from '@/Types/customType'
import { TDBUser } from '@/Types/Types'
import { TError } from '@/Types/subtypes/TError'
import { TDaDataOrganization } from '@/Types/subtypes/TDaDataOrganization'

import FormAdminPanel from '@/components/form/formAdminPanel/FormAdminPanel'

import { ServiceUsers } from '../../../../../../../Controllers/Service/serviceUser'
import { ServiceDaDataOrganization } from '../../../../../../../Controllers/Service/serviceDaDataOrganization'
import { ServiceRequisites } from '../../../../../../../Controllers/Service/serviceReqisites'
import { ServiceRuleOrganization } from '../../../../../../../Controllers/Service/serviceRuleOrganization'

import { redirect } from 'next/navigation'
import { isError } from '../../../../../../../function/IsError'
import HelpInformerModalWindow from '@/components/additional/HelpInformerModalWindow'





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
			dataOrganization: infoOrganization[1] as TApprover<
				TDataOrganization,
				'INN'
			>,
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
