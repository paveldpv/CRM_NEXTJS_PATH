'use client'

import moment from 'moment'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import { TWithoutPassUser } from '@/shared/model/types/Types'
import { employeeImage } from '../../../../config/urls'
import PanelEditEmployee from './PanelEditEmployee'
import { TPanelRuleEmployee } from './PanelRuleEmployee'

type TItemEmployee = {
	index: number
} & TWithoutPassUser &
	Omit<TPanelRuleEmployee, 'setVisibleAllEmployee'>

export default function ItemsEmployee({
	index,
	setVisibleCardEmployee,
	setRedactProfile,
	setVisibleLoader,
	setEmployee,

	...dataProfile
}: TItemEmployee) {
	const { PHONE } = useParams()
	const { linksAllowed, idUser, phone, INN } = useInfoUser((state) => state.dataUser)
	

	const permissionRedact = useMemo(() => {
		if (linksAllowed === 'ADMIN') {
			return true
		}

		const permission = linksAllowed.find((link) => link.href === 'employee' && !link.readonly)
		return !!permission
	}, [linksAllowed])

	

	return (
		<div
			className={`${index % 2 === 0 ? ' bg-list_menu_even' : ' bg-list_menu'} ${
				dataProfile.phone === PHONE && 'border-2  border-solid  border-highlight_three'
			}  rounded-md m-1 grid grid-cols-4  align-middle p-1  `}
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
			{permissionRedact && (
				<PanelEditEmployee
					{...dataProfile}
					setEmployee={setEmployee}
					setVisibleCardEmployee={setVisibleCardEmployee}
					setRedactProfile={setRedactProfile}
					setVisibleLoader={setVisibleLoader}
				/>
			)}

			<section className=' col-span-1'></section>
		</div>
	)
}
