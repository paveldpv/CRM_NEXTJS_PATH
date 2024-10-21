'use client'
import { TWithoutPassUser } from '@/Types/Types'
import moment from 'moment'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { FaEdit } from 'react-icons/fa'
import { GoGraph } from 'react-icons/go'
import { MdDelete } from 'react-icons/md'
import { employeeImage } from '../../../config/urls'
import { useInfoUser } from '../../../store/storeInfoUser'
import { TPanelRuleEmployee } from '../rulePanels/PanelRuleEmployee'

type TItemEmployee = {
	index: number
} & TWithoutPassUser &
	TPanelRuleEmployee

export default function ItemsEmployee({
	index,
	setVisibleCardEmployee,
	setRedactProfile,
	...dataProfile
}: TItemEmployee) {
	const { PHONE } = useParams()
	const { linksAllowed } = useInfoUser((state) => state.dataUser)
	const permissionRedact = useMemo(() => {
		if (linksAllowed === 'ADMIN') {
			return true
		}
		const permission = linksAllowed.find((link) => link.href === 'employee' && !link.readonly)
		return !!permission
	}, [linksAllowed])

	const { push } = useRouter()

	const redactProfile = () => {
		setRedactProfile(dataProfile)
		setVisibleCardEmployee(true)
	}

	const goToStatistic = () => {
		push(`employee/${dataProfile.idUser}/statistic`)
	}
	const deletedEmployee = async () => {}

	return (
		<div
			className={`${index % 2 === 0 ? ' bg-list_menu_even' : ' bg-list_menu'} ${
				dataProfile.phone === PHONE && 'border-2  border-solid  border-highlight_three'
			}  rounded-md p-1 grid grid-cols-4  align-middle `}
		>
			<section className=' col-span-2 grid grid-cols-8'>
				{dataProfile.srcPhoto === 'NOT_FOUND' ? (
					<Image src={employeeImage} alt={'no found'} height={50} width={50} className='rounded-xl col-span-1  ' />
				) : (
					<Image
						src={dataProfile.srcPhoto.FullPath}
						alt={'not found'}
						height={50}
						width={50}
						className=' rounded-xl  col-span-1'
					/>
				)}
				<ul className=' text-xs col-span-2'>
					<li>{dataProfile.surname}</li>
					<li>{dataProfile.name}</li>
					<li>{dataProfile.lastName}</li>
				</ul>
				<ul className='text-xs col-span-2'>
					<li>{dataProfile.phone}</li>
					<li className='flex items-baseline'>
						<sub>д.р.</sub>
						<p>{moment(dataProfile.dateBirthday).format('DD/MM/YY')}</p>
					</li>
					<li>{dataProfile.nameJobTitle || 'дол. не указана'}</li>
				</ul>
			</section>
			<section className=' col-span-2 text-xl m-2 flex gap-2'>
				<button onClick={redactProfile} hidden={!permissionRedact}>
					<FaEdit />
				</button>
				<button onClick={deletedEmployee} hidden={linksAllowed == 'ADMIN' && permissionRedact}>
					<MdDelete />
				</button>
				<button onClick={goToStatistic}>
					<GoGraph />
				</button>
			</section>
			<section className=' col-span-1'></section>
		</div>
	)
}
