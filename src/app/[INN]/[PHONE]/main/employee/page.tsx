import { typicalError } from '@/shared/model/types/enums'
import { TError } from '@/shared/model/types/subtypes/TError'

import Employees from '@/entities/employee/ui/Employees'
import { TWithoutPassUser } from '@/shared/model/types/Types'
import DialogWindow from '@/shared/ui/DialogWindow'
import HelpInformerModalWindow from '@/shared/ui/HelpInformerModalWindow/ui/HelpInformerModalWindow'
import { redirect } from 'next/navigation'
import { ServiceUsers } from '../../../../../../Server/Service/serviceUser'
import { isError } from '../../../../../shared/lib/IsError'

const getAllEmployee = async (INN: string): Promise<TWithoutPassUser[] | [] | TError> => {
	const serviceUsers = new ServiceUsers(INN)
	return await serviceUsers.getAllEmployee()
}

export default async function page({ params }: { params: { INN: string; PHONE: string } }) {
	const { INN, PHONE } = params
	const allEmployee = await getAllEmployee(INN)
	if (isError(allEmployee) || getAllEmployee.length === 0) {
		redirect(`/ERROR/${typicalError.error_DB}`)
	}

	return (
		<div>
			<DialogWindow />
			<HelpInformerModalWindow />
			<Employees dataEmployees={allEmployee} />
		</div>
	)
}
