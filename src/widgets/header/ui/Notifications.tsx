'use client'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import { useCusSnackbar } from '@/shared/ui/snackbar/model/useSnackbar.store'
import { useEffect, useState } from 'react'
import { FaInfo } from 'react-icons/fa'
import { ROOT_LINK } from '../../../../Server/Service/servicePermissionRedactData/model/types/Types'

import { FetchPrevCalc, FetchUser } from '@/shared/api'
import { TNotificationsList } from '../model/Types'
import ListNotification from './ListNotification'

export default function Notifications() {
	const [setOpenSnackbar, setChildrenSnackbar] = useCusSnackbar((state) => [state.setOpen, state.setChildren])
	const user = useInfoUser((state) => state.dataUser)
	const [dataNotifications, setDataNotification] = useState<TNotificationsList>({})
	const [amountEvents, setAmountEvents] = useState(0)
	const [load, setLoad] = useState(true)

	useEffect(() => {
		if (user?.linksAllowed === 'ADMIN' || user?.linksAllowed.some((el) => el.href === ROOT_LINK.application)) {
			Promise.all([FetchUser.getUsersWithBirthdayToday(user.INN), FetchPrevCalc.getNewRequest(user.INN)]).then((res) => {
				
				const birthdayUser = res[0]
				console.log(birthdayUser);
				const newPrevCalc = res[1]
				const countEvents = (birthdayUser?.length || 0) + (newPrevCalc?.length || 0)
				setDataNotification({
					birthdayUser,
					newPrevCalc,
				})

				// setAmountEvents(countEvents)
				setLoad(false)
			})
		}
		{
			FetchUser.getUsersWithBirthdayToday(user?.INN!).then((res) => {
				setDataNotification({ birthdayUser: res })
				setAmountEvents(res?.length || 0)
				setLoad(false)
			})
		}
	}, [])

	const handlerHover = async () => {
		setChildrenSnackbar(
			<ListNotification newPrevCalc={dataNotifications.newPrevCalc} birthdayUser={dataNotifications.birthdayUser} />
		)
		setOpenSnackbar({ open: true, autoHidden: true })
		setAmountEvents(0)
	}
	
	
	return (
		<div className={`relative text-xs  inline-block ${amountEvents != 0 ? 'cursor-pointer animate-pulse' : ' '}`}>
			{load ? (
				<span className='loaderSpinner'></span>
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
