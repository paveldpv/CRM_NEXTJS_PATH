'use client'

import { hasNotIndicatedProperty } from '@/shared/lib/hasNotIndicatedProperty'
import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import { useInfoOrganization } from '@/shared/model/store/storeInfoOrganization'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'
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
			className={`flex h-20 items-center  pr-7 pl-7 border-2 border-solid  rounded-md`}
		>
			<div className='  flex justify-between text-xs  w-full '>
				<ul className='text-list_menu flex flex-col gap-1 text-xs '>
					<li style={{ color: configHeader?.color?.textColor }}>тел. : {dataUser.phone}</li>
					{hasNotIndicatedProperty(dataUser) ? (
						<Link
							className=' p-2 bg-menu_color rounded-md hover:text-color_header duration-700 active:text-color_header'
							href={`/${INN}/${dataUser.phone}/main/setting/profile`}
						>
							Данные не заполнены
						</Link>
					) : (
						<ul style={{ color: configHeader?.color?.textColor }}>
							<li>{dataUser.lastName}</li>
							<li>{dataUser.name}</li>
							<li>{dataUser.surname}</li>
						</ul>
					)}
				</ul>
				<ul
					style={{
						color: configHeader?.color?.textColor,
					}}
					className=' flex gap-1 flex-col text-center   rounded-md p-2'
				>
					<li>«{nameOrganization?.abbreviated}»</li>
					<li className=' underline font-bold '>ИНН ОРГАНИЗАЦИИ : {INN}</li>
				</ul>
			</div>
		</div>
	)
}
{
	/* <li> - {dataUser.phone}</li>
					{hasNotIndicatedProperty(dataUser) ? (
						<Link
							className=' p-2 bg-menu_color rounded-md'
							href={`/main/setting`}
						>
							Данные не заполнены
						</Link>
					) : (
						<ul>
							<li>{dataUser.lastName}</li>
							<li>{dataUser.name}</li>
							<li>{dataUser.surname}</li>
						</ul>
					)} */
}
