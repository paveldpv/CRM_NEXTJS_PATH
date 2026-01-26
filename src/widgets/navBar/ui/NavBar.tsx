'use client'

import { motion } from 'framer-motion'
import { memo, useMemo } from 'react'
import { adminLinks } from '../../../../config/adminLinks'

import ListLinks from '../../../shared/ui/listLInks/ui/ListLinks'

import { useInfoUser } from '@/shared/model/store/storeInfoUser'

import { TLink } from '@/shared/model/types/subtypes/Types'
import { useConfigApp } from '../../../shared/model/store/storeConfigApp'
import BottomNavBar from './BottomNavBar'

export default function NavBar() {
	const userData = useInfoUser((store) => store.dataUser)
	const { configNavMenu } = useConfigApp((store) => store.dataConfigApp)

	const currentLink: TLink[] | null = useMemo(() => {
		if (!userData) return null
		if (userData?.linksAllowed === 'ADMIN') {
			return adminLinks
		} else {
			return userData?.linksAllowed
		}
	}, [userData])

	return (
		<motion.div
			initial={{ width: 45 }}
			transition={{ delay: 0.5, duration: 0.3 }}
			whileHover={{ width: 175 }}
			className=' flex flex-col h-full  gap-3 pt-3  '
			style={{
				background: configNavMenu?.color?.bgColor,
				color: configNavMenu?.color?.textColor,
				borderColor: configNavMenu?.color?.borderColor,
			}}
		>
			{currentLink && (
				<ListLinks
					listLinks={currentLink}
					className='gap-2'
					styleLinks={{ borderColor: configNavMenu?.color?.borderColor }}
				/>
			)}
			<BottomNavBar />
		</motion.div>
	)
}
