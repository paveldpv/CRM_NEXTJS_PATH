import { typeDialog, typicalError } from '@/shared/model/types/subtypes/enums'
import { PURPOSE_USE } from '@/shared/model/types/subtypes/TGeoLocation'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaEdit, FaTrashRestore } from 'react-icons/fa'
import { GoGraph } from 'react-icons/go'
import { MdDelete } from 'react-icons/md'

import { useInfoUser } from '@/shared/model/store/storeInfoUser'

import { isError } from '@/shared/lib/IsError'
import useGeo from '@/shared/model/hooks/useGeo'
import { TWithoutPassUser } from '@/shared/model/types/subtypes/Types'
import CusButton from '@/shared/ui/CusButton'
import { useDialogWindow } from '@/shared/ui/dialogWindow/model/storeDialogWindow'
import { fetchGetEmployee, TParamsAllEmployee } from '../api/getEmployee'
import { fetchRemoveEmployee } from '../api/removeEmployee'
import { fetchRestoreEmployee } from '../api/restoreEmployee'
import { TPanelRuleEmployee } from './PanelRuleEmployee'

type PanelEditEmployee = TWithoutPassUser & Omit<TPanelRuleEmployee, 'setVisibleAllEmployee'>

export default function PanelEditEmployee({
	setVisibleCardEmployee,
	setRedactProfile,
	setVisibleLoader,
	setEmployee,

	...dataProfile
}: PanelEditEmployee) {
	const searchParams = useSearchParams()
	const [setOpenDialogWindow, dispatchFn] = useDialogWindow((state) => [
		state.setOpen,
		state.setDispatchFn,
	])
	const { idUser, phone, INN } = useInfoUser((state) => state.dataUser)
	const { push } = useRouter()
	const { dataGeo } = useGeo(idUser, PURPOSE_USE.redact)

	const deletedEmployee = async () => {
		setOpenDialogWindow(
			true,
			{ title: 'удалить сотрудника ', message: `${dataProfile.surname} ${dataProfile.name}` },
			typeDialog.dialog
		)
		dispatchFn(async () => {
			setVisibleLoader(true)

			const response = await fetchRemoveEmployee(INN, dataProfile.idUser, dataGeo!)
			if (response.status === 403) {
				setOpenDialogWindow(true, { title: 'отказано в доступе' }, typeDialog.error)
			} else if (response.status !== 200) {
				push(`/ERROR/${typicalError.error_DB}`)
			} else {
				const isListEmployeeWithDeleted =
					searchParams!.get('all') === null
						? 0
						: (Number(searchParams!.get('all')) as TParamsAllEmployee)
				const updateListEmployee = await fetchGetEmployee(INN, isListEmployeeWithDeleted)
				if (isError(updateListEmployee)) {
					push(`/ERROR/${typicalError.error_DB}`)
				} else {
					setEmployee(updateListEmployee)
					setVisibleLoader(false)
				}
			}
		})
	}

	const restoreEmployee = async () => {
		setVisibleLoader(true)

		const response = await fetchRestoreEmployee(INN, dataProfile.idUser, dataGeo!)
		if (response.status == 403) {
			setOpenDialogWindow(true, { title: 'отказано в доступе' }, typeDialog.error)
		} else if (response.status != 200) {
			push(`/ERROR/${typicalError.error_DB}`)
		} else {
			const isListEmployeeWithDeleted =
				searchParams!.get('all') === null ? 0 : (Number(searchParams!.get('all')) as TParamsAllEmployee)
			const updateListEmployee = await fetchGetEmployee(INN, isListEmployeeWithDeleted)
			if (isError(updateListEmployee)) {
				push(`/ERROR/${typicalError.error_DB}`)
			} else {
				setEmployee(updateListEmployee)
				setVisibleLoader(false)
			}
		}
	}

	const redactProfile = () => {
		setRedactProfile(dataProfile)
		setVisibleCardEmployee(true)
	}

	return (
		<section className=' col-span-2 text-xl m-2 flex gap-2'>
			{dataProfile.idUser === idUser ? (
				<CusButton>
					<Link href={`/${INN}/${phone}/main/setting/profile`}>
						<FaEdit />
					</Link>
				</CusButton>
			) : (
				<CusButton onClick={redactProfile}>
					<FaEdit />
				</CusButton>
			)}
			<Link href={`employee/${dataProfile.idUser}/statistic`}>
				<CusButton>
					<GoGraph />
				</CusButton>
			</Link>

			{dataProfile.safeDeleted ? (
				<CusButton onClick={restoreEmployee} hidden={dataProfile.linksAllowed == 'ADMIN'}>
					<FaTrashRestore />
				</CusButton>
			) : (
				<CusButton onClick={deletedEmployee} hidden={dataProfile.linksAllowed == 'ADMIN'}>
					<MdDelete />
				</CusButton>
			)}
		</section>
	)
}
