import { isError } from '@/shared/lib/IsError'
import { ROOT_LINK, typicalError } from '@/shared/model/types/enums'
import { TError } from '@/shared/model/types/subtypes/TError'
import { TDBUser } from '@/shared/model/types/Types'
import { redirect } from 'next/navigation'
import ServicePermissionRedactData from '../../../../../../../../Server/Service/ServicePermissionRedactData'
import { ServiceUsers } from '../../../../../../../../Server/Service/serviceUser'
import FormProfile from '@/entities/userProfile/ui/FormProfile'
import ProgressLoader from '@/shared/ui/loaders/ProgressLoader'
import DialogWindow from '@/shared/ui/DialogWindow'

const getFullDataEmployee = async (INN: string, phone: string, idEmployee: string): Promise<TDBUser | TError> => {
	const servicePermissionRedactData = new ServicePermissionRedactData(INN, ROOT_LINK.employee)
	const permission = await servicePermissionRedactData.PermissionByPhone(phone)
	if (!permission) {
		const er: TError = {
			error: true,
			message: `refusal`,
		}
	}
	const serviceUser = new ServiceUsers(INN)
	return await serviceUser.getUserById(idEmployee)
}

export default async function page({ params }: { params: { INN: string; PHONE: string; IdEmployee: string } }) {
	const { INN, IdEmployee, PHONE } = params
	const dataProfile = await getFullDataEmployee(INN, PHONE, IdEmployee)
	
	
	if (isError(dataProfile)) {
		redirect(`/ERROR/${typicalError.error_DB}`)
	}

	return (
		<div className='mt-2'>
			<FormProfile initialValues={dataProfile}  /> 	
			<DialogWindow />
		</div>
	)
}
