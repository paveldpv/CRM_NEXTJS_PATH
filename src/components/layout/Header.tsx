'use client'

import { useSearchParams } from 'next/navigation'

import Link from 'next/link'
import { hasNotIndicatedProperty } from '../../../function/hasNotIndicatedProperty'
import { useConfigApp } from '../../../store/storeConfigApp'
import { useInfoOrganization } from '../../../store/storeInfoOrganization'
import { useInfoUser } from '../../../store/storeInfoUser'

export default function Header() {
	const urlParams = useSearchParams()
	const dataUser = useInfoUser((store) => store.dataUser)
	const { configHeader } = useConfigApp((store) => store.dataConfigApp)
	const { INN, nameOrganization } = useInfoOrganization(
		(state) => state.infoOrganization
	)

	return (
		<div
			style={{
				background: configHeader?.color?.bgColor,
				color: configHeader?.color?.textColor,
				borderColor: configHeader?.color?.borderColor,
				fontSize: configHeader?.textSize,
			}}
			className={`flex h-24 items-center  pr-7 pl-7 border-2 border-solid  rounded-md`}
		>
			<div className='  flex justify-between text-xs  w-full'>
				<ul className='text-list_menu flex flex-col gap-1 text-xs'>
					<li style={{ color: configHeader?.color?.textColor }}>
						тел. : {dataUser.phone}
					</li>
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
						borderColor: configHeader?.color?.borderColor,
						color: configHeader?.color?.textColor,
					}}
					className=' flex gap-1 flex-col text-center border-2  rounded-md p-2'
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
