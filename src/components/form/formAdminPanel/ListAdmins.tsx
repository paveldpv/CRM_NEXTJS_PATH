'use client'
import {memo} from'react'
import Fieldset from '@/containers/Fieldset'
import { TDBUser } from '@/Types/Types'

 function ListAdmins({ admins }: { admins: TDBUser[] }) {
	

	return (
		<Fieldset
			legend={
				admins.length > 2 ? (
					<span>Администраторы</span>
				) : (
					<span>Администратор</span>
				)
			}
		>
			<ul className=' flex flex-col   gap-5 max-h-20 overflow-auto'>
				{admins.map((admin, index) => (
					<li
						key={index}
						className=' text-menu_color bg-color_header rounded-md  p-2 text-center'
					>
						<span className=' text-xs '>
							{admin.surname} {admin.name} {admin.lastName}
						</span>
					</li>
				))}
			</ul>
		</Fieldset>
	)
}

export default memo(ListAdmins)
