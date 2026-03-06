'use client'
import { useCusSnackbar } from '@/shared/ui/snackbar/model/useSnackbar.store'
import { useLayoutEffect, useState } from 'react'
import { FaInfo } from 'react-icons/fa'
import { ROOT_LINK } from '../../../../Server/Service/servicePermissionRedactData/model/types/Types'

import { FetchPrevCalc, FetchUser } from '@/shared/api'
import { TUserDTOWithoutPas } from '@/shared/model/types'
import CusSpin from '@/shared/ui/loaders/CusSpin'
import { TNotificationsList } from '../model/Types'
import ListNotification from './ListNotification'

export default function Notifications({ dataUser }: { dataUser: TUserDTOWithoutPas }) {
	const [setOpenSnackbar, setChildrenSnackbar] = useCusSnackbar((state) => [state.setOpen, state.setChildren])

	const [dataNotifications, setDataNotification] = useState<TNotificationsList>({})
	const [amountEvents, setAmountEvents] = useState(0)
	const [load, setLoad] = useState(true)

	useLayoutEffect(() => {
		if (!dataUser) return
		// FetchUser.getUsersWithBirthdayToday(dataUser?.INN).then((el) => {
		// 	console.log(el)
		// })
		const permission =
			dataUser?.linksAllowed === 'ADMIN' || dataUser?.linksAllowed.some((el) => el.href === ROOT_LINK.application)
		if (permission) {
			;(async () => {
				const [dataBirthday, dataApplication] = await Promise.all([
					FetchUser.getUsersWithBirthdayToday(dataUser.INN),
					FetchPrevCalc.getNewRequest(dataUser.INN),
				])

				console.log('🚀 ~ Notifications ~ dataApplication:', dataApplication.length)

				const amountEvent = dataBirthday.length + dataApplication.length
				setAmountEvents(amountEvent)
				setDataNotification({
					birthdayUser: dataBirthday,
					newPrevCalc: dataApplication,
				})
			})()
			setLoad(false)
		} else {
			;(async () => {
				const dataBirthday = await FetchUser.getUsersWithBirthdayToday(dataUser.INN)
				setDataNotification({
					birthdayUser: dataBirthday,
				})
				setLoad(false)
			})()
		}
	}, [dataUser])

	const handlerHover = async () => {
		if(amountEvents ==0){
			return
		}
		
		setChildrenSnackbar(
			<ListNotification newPrevCalc={dataNotifications.newPrevCalc} birthdayUser={dataNotifications.birthdayUser} />,
		)
		setOpenSnackbar({ open: true, autoHidden: true })
		setAmountEvents(0)
	}

	return (
		<div className={`relative text-xs  inline-block ${amountEvents != 0 ? 'cursor-pointer animate-pulse' : ' '}`}>
			{load ? (
				<CusSpin />
			) : (
				<span className='text-xl' onMouseEnter={handlerHover}>
					<FaInfo />
				</span>
			)}

			{amountEvents != 0 && (
				<span className='absolute -top-2 -right-2  opacity-70 bg-text_alert text-white rounded-full px-1 py-0.5 text-[10px] leading-none'>
					{amountEvents}
				</span>
			)}
		</div>
	)
}
