'use client'
import { maskPhoneNumber } from '@/shared/lib/utils/formatPhoneNumber'
import { hasNotIndicatedProperty } from '@/shared/lib/utils/hasNotIndicatedProperty'
import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import { useInfoOrganization } from '@/shared/model/store/storeInfoOrganization'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import Notifications from '@/widgets/header/ui/Notifications'
import Link from 'next/link'

export default function Header() {
	const dataUser = useInfoUser((store) => store.dataUser)
	const { configHeader } = useConfigApp((store) => store.dataConfigApp)

	const { INN, nameOrganization } = useInfoOrganization((state) => state.infoOrganization)

	return (
		<div
			style={{
				background: configHeader?.color?.bgColor,
				color: configHeader?.color?.textColor,
				borderColor: configHeader?.color?.borderColor,
			}}
			className={`flex h-20 items-center  pr-7 pl-7 border-2 border-solid  rounded-b-md`}
		>
			<div className='  flex justify-between text-xs  w-full '>
				<ul className='text-list_menu flex flex-col gap-1 text-xs '>
					<li style={{ color: configHeader?.color?.textColor }}>тел. : {maskPhoneNumber(dataUser?.phone)}</li>
					{!dataUser || hasNotIndicatedProperty(dataUser) ? (
						<Link
							className=' p-2 bg-menu_color rounded-md hover:text-color_header duration-700 active:text-color_header'
							href={`/${INN}/${dataUser?._id}/main/setting/profile`}
						>
							Данные профиля не заполнены
						</Link>
					) : (
						<ul style={{ color: configHeader?.color?.textColor }}>
							<li>{dataUser?.lastName}</li>
							<li>{dataUser?.name}</li>
							<li>{dataUser?.surname}</li>
						</ul>
					)}
				</ul>
				<ul
					style={{
						color: configHeader?.color?.textColor,
					}}
					className=' flex gap-1 flex-col  rounded-md p-2 '
				>
					<li className=' flex gap-2 '>
						<Notifications />
						<span className=' font-bold text-center grow '>«{nameOrganization?.abbreviated}»</span>
					</li>
					<li className=' underline font-bold '>ИНН ОРГАНИЗАЦИИ : {INN}</li>
				</ul>
			</div>
		</div>
	)
}
