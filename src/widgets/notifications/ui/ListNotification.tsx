import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import AutoScrollContainer from '@/shared/ui/autoScrollContainer/ui/AutoScrollContainer'
import Link from 'next/link'
import { BiMessageAdd } from 'react-icons/bi'
import { FaBirthdayCake } from 'react-icons/fa'
import { TNotificationsList } from '../model/types'
import { useMemo } from 'react'


export default function ListNotification({ birthdayUser, newPrevCalc }: TNotificationsList) {
	const configApp = useConfigApp((state) => state.dataConfigApp)
	const { configMain } = configApp
	const speedAutoScroll = useMemo(()=>{
		const countBirthday = birthdayUser?.length||0
		const countNewPrevCalc = newPrevCalc?.length||0

		if(countBirthday+countNewPrevCalc<5){
			return undefined
		}else{
			return countBirthday+countBirthday
		}
	},[])

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
							<li key={index} className=' text-left pb-2'>
								<p>от :{data?.name}</p> тел:{data?.phone} почта:{data?.email} ИНН:{data?.INN}
							</li>
						))}
					</ul>
				)}
			</div>
		</AutoScrollContainer>
	)
}
