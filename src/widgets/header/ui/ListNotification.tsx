import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import AutoScrollContainer from '@/shared/ui/autoScrollContainer/ui/AutoScrollContainer'
import Link from 'next/link'
import { BiMessageAdd } from 'react-icons/bi'
import { FaBirthdayCake } from 'react-icons/fa'

import { formatPhoneNumber, maskPhoneNumber } from '@/shared/lib/utils/formatPhoneNumber'
import { memo, useMemo, useReducer } from 'react'
import { TNotificationsList } from '../model/Types'

function ListNotification({ birthdayUser, newPrevCalc }: TNotificationsList) {
	const configApp = useConfigApp((state) => state.dataConfigApp)
	const { configMain } = configApp
	const [stateEntryPhone, dispatch] = useReducer((state) => !state, false)

	const speedAutoScroll = useMemo(() => {
		const countBirthday = birthdayUser?.length || 0
		const countNewPrevCalc = newPrevCalc?.length || 0

		if (countBirthday + countNewPrevCalc < 5) {
			return undefined
		} else {
			return countBirthday + countBirthday
		}
	}, [])

	return (
		<AutoScrollContainer speed={speedAutoScroll}>
			<div
				className=' rounded-md  text-sm '
				style={{
					color: configMain?.color.textColor,
					background: configMain?.color.bgColor,
				}}
			>
				{birthdayUser?.length != 0 && (
					<ul className='border-b-2 p-2' style={{ borderColor: configMain?.color.borderColor }}>
						<li className=' text-xs text-center'>
							<p>
								<FaBirthdayCake />
							</p>
							<p>Дни рождения</p>
						</li>
						{birthdayUser?.map((data, index) => (
							<li key={index} className=' text-left pb-2'>
								{data.lastName} {data.name} {data.surname}
							</li>
						))}
					</ul>
				)}
				{newPrevCalc?.length != 0 && (
					<ul className='border-b-2 p-2' style={{ borderColor: configMain?.color.borderColor }}>
						<Link href={``}>
							<li className=' text-xs text-center pb-2'>
								<p>
									<BiMessageAdd />
								</p>
								<p>Новые заявки</p>
							</li>
						</Link>
						{newPrevCalc?.map((data, index) => (
							<ul key={index} className=' text-left pb-2'>
								<li>от :{data?.dataClient.name}</li>
								<li onMouseEnter={dispatch} onMouseLeave={dispatch}>
									тел:
									{stateEntryPhone
										? `${formatPhoneNumber(data.dataClient.phone)}`
										: `${maskPhoneNumber(data.dataClient.phone)}`}
								</li>
								<li>почта:{data?.dataClient.email}</li>
								<li>
									ИНН:
									{data?.dataClient.INN || 'не указан'}
								</li>
							</ul>
						))}
					</ul>
				)}
			</div>
		</AutoScrollContainer>
	)
}
export default memo(ListNotification)
