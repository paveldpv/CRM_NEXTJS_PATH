import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { formatPhoneNumber, maskPhoneNumber } from '@/shared/lib/utils/formatPhoneNumber'
import CusButton from '@/shared/ui/button/ui/CusButton'
import { format } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'
import { FaCalendarAlt, FaChartLine, FaCubes, FaInfoCircle, FaPhoneAlt, FaUser } from 'react-icons/fa'

import { TOrderCardData } from '../../lib/getOrderCardData'
import { TOrderFullInfoDTO } from '@/shared/model/types'

export default function OrderList({
	order,
	pathname,
	orderData,
}: {
	order: TOrderFullInfoDTO
	pathname: string
	orderData: TOrderCardData
}) {
	const [isHovered, setIsHovered] = useState(false)
	const { phone, displayName, detailsCount, startDate, endDate, progress } = orderData
	return (
		<Fieldset
			legend={
				<div className='flex items-center gap-2'>
					<FaInfoCircle className='text-blue-500' />
					<span>№: {order.numberOrder}</span>
				</div>
			}
			className='bg-white shadow-sm hover:shadow-md transition-shadow duration-300 py-1'
		>
			<div className='flex items-center justify-between gap-4 text-sm'>
				<div
					className='flex items-center gap-2 cursor-pointer min-w-[160px]'
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<FaPhoneAlt className='text-gray-400' />
					<span className='font-medium'>{isHovered ? formatPhoneNumber(phone) : maskPhoneNumber(phone)}</span>
				</div>

				<div className='flex items-center gap-2 flex-1 min-w-0'>
					<FaUser className='text-gray-400' />
					<span className='truncate font-semibold' title={displayName}>
						{displayName}
					</span>
				</div>

				<div className='flex items-center gap-2 min-w-[100px]'>
					<FaCubes className='text-gray-400' />
					<span>Деталей: {detailsCount}</span>
				</div>

				<div className='flex items-center gap-2 min-w-[110px]'>
					<FaChartLine className='text-gray-400' />
					<span>Прогресс: {progress}%</span>
				</div>

				<div className='flex items-center gap-4 text-xs text-gray-500 min-w-[200px]'>
					<div className='flex items-center gap-1'>
						<FaCalendarAlt />
						<span>От: {startDate ? format(new Date(startDate), 'dd.MM.yyyy') : '—'}</span>
					</div>
					{endDate && (
						<div className='flex items-center gap-1'>
							<FaCalendarAlt />
							<span>До: {format(new Date(endDate), 'dd.MM.yyyy')}</span>
						</div>
					)}
				</div>

				<div className='flex justify-end'>
					<Link href={`${pathname}/${order._id}`}>
						<CusButton className='text-xs py-1 px-3'>ПОДРОБНЕЕ</CusButton>
					</Link>
				</div>
			</div>
		</Fieldset>
	)
}
