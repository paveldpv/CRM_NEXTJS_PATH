import HelpInformerModalWindow from '@/components/additional/HelpInformerModalWindow'
import Employees from '@/containers/Employees'
import { typicalError } from '@/Types/enums'
import { TError } from '@/Types/subtypes/TError'
import { TWithoutPassUser } from '@/Types/Types'
import { redirect } from 'next/navigation'
import { ServiceUsers } from '../../../../../../Controllers/Service/serviceUser'
import { isError } from '../../../../../../function/IsError'
import DialogWindow from '@/components/additional/DialogWindow'

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
			<DialogWindow/>
			<HelpInformerModalWindow />
			<Employees dataEmployees={allEmployee} />
		</div>
	)
}
