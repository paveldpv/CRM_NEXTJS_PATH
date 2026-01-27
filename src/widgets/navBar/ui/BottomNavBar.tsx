'use client'
import { FetchSession, FetchUser } from '@/shared/api'
import { setJWTToken, setRefreshToken } from '@/shared/lib/authToken'
import useGeo from '@/shared/model/hooks/useGeo'
import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import { PURPOSE_USE } from '@/shared/model/types'

import { signOut } from 'next-auth/react'
import { PiSignOutBold } from 'react-icons/pi'


export default function BottomNavBar() {
	const { configNavMenu } = useConfigApp((state) => state.dataConfigApp)
	const dataUser=useInfoUser(state=>state.dataUser)
	const {dataGeo} = useGeo(dataUser?._id!,PURPOSE_USE.out)
	
	const out = async() => {
		await FetchSession.endSession(dataUser?.INN!,dataUser?._id!,dataGeo)
		
		localStorage.clear()
		signOut({ callbackUrl: '/' })
	}
	return (
		<>
			<br />
			<div style={{ borderColor: configNavMenu?.color.borderColor }} className=' w-full border-b-2 '></div>
			<button
				style={{
					
					background: configNavMenu?.color?.bgColor,
					color: configNavMenu?.color?.textColor,
					borderColor: configNavMenu?.color?.borderColor,
					fontSize: configNavMenu?.textSize,
				}}
				className='border-2 border-solid p-2 border-menu_color rounded-xs h-16 text-list_menu_even hover:bg-color_header  '
				onClick={out}
			>
				<span className='flex  gap-2 items-center   mx-auto my-0 duration-300  '>
					<span className=' text-2xl'>
						<PiSignOutBold />
					</span>
					<span className=' truncate text-xs'>Выйти</span>
				</span>
			</button>
		</>
	)
}
