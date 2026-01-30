import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaEdit, FaTrashRestore } from 'react-icons/fa'
import { GoGraph } from 'react-icons/go'
import { MdDelete } from 'react-icons/md'

import { useInfoUser } from '@/shared/model/store/storeInfoUser'

import { isError } from '@/shared/lib/IsError'
import useGeo from '@/shared/model/hooks/useGeo'

import { useDialogWindow } from '@/shared/ui/dialogWindow/model/storeDialogWindow'

import { PURPOSE_USE, TUserDTOWithoutPas } from '@/shared/model/types'
import CusButton from '@/shared/ui/button/ui/CusButton'
import { typeDialog } from '@/shared/ui/dialogWindow/model/Types/Types'
import { TPanelRuleEmployee } from './PanelRuleEmployee'
import { typicalError } from '@/shared/model/types/subtypes/enums'

type PanelEditEmployee = TUserDTOWithoutPas & Omit<TPanelRuleEmployee, 'setVisibleAllEmployee'>

export default function PanelEditEmployee({
	setVisibleCardEmployee,
	setRedactProfile,
	setVisibleLoader,
	setEmployee,

	...dataProfile
}: PanelEditEmployee) {
	const searchParams = useSearchParams()
	const [setOpenDialogWindow, dispatchFn] = useDialogWindow((state) => [state.setOpen, state.setDispatchFn])
	const { _id, phone, INN } = useInfoUser((state) => state.dataUser!)
	const { push } = useRouter()
	const { dataGeo } = useGeo(_id, PURPOSE_USE.redact)

	const deletedEmployee = async () => {
		setOpenDialogWindow(
			true,
			{ title: 'удалить сотрудника ', message: `${dataProfile.surname} ${dataProfile.name}` },
			typeDialog.dialog
		)
		dispatchFn(async () => {
			//TODO:
			setVisibleLoader(true)
			setVisibleLoader(false)
		})
	}

	const restoreEmployee = async () => {
		setVisibleLoader(true)
		setVisibleLoader(false)

		
	}

	const redactProfile = () => {
		setRedactProfile(dataProfile)
		setVisibleCardEmployee(true)
	}

	return (
		<section className=' col-span-2 text-xl m-2 flex gap-2'>
			{dataProfile._id === _id ? (
				<CusButton>
					<Link href={`/${INN}/${_id}/main/setting/profile`}>
						<FaEdit />
					</Link>
				</CusButton>
			) : (
				<CusButton onClick={redactProfile}>
					<FaEdit />
				</CusButton>
			)}
			<Link href={`employee/${dataProfile._id}/statistic`}>
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
