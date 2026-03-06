'use client'
import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { formatPhoneNumber, maskPhoneNumber } from '@/shared/lib/utils/formatPhoneNumber'
import CusButton from '@/shared/ui/button/ui/CusButton'
import { format } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'
import { FaCalendarAlt, FaChartLine, FaCubes, FaInfoCircle, FaPhoneAlt, FaUser } from 'react-icons/fa'

import { TOrderCardData } from '../../lib/getOrderCardData'
import { TOrderFullInfoDTO } from '@/shared/model/types'

export function OrderCard({ order, pathname, orderData }: { order: TOrderFullInfoDTO; pathname: string; orderData: TOrderCardData }) {
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
			className='h-full flex flex-col justify-between bg-white shadow-sm hover:shadow-md transition-shadow duration-300'
		>
			{' '}
			<div className='flex flex-col gap-2 text-sm'>
				<div
					className='flex items-center gap-2 cursor-pointer'
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<FaPhoneAlt className='text-gray-400' />
					<span className='font-medium'>{isHovered ? formatPhoneNumber(phone) : maskPhoneNumber(phone)}</span>
				</div>

				<div className='flex items-center gap-2'>
					<FaUser className='text-gray-400' />
					<span className='truncate' title={displayName}>
						{displayName}
					</span>
				</div>

				<div className='flex items-center gap-2'>
					<FaCubes className='text-gray-400' />
					<span>Деталей: {detailsCount}</span>
				</div>

				<div className='flex items-center gap-2'>
					<FaChartLine className='text-gray-400' />
					<span>Прогресс: {progress}%</span>
				</div>

				<div className='mt-2 pt-2 border-t border-gray-100 flex flex-col gap-1 text-xs text-gray-500'>
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
			</div>
			<div className='mt-4 flex justify-end'>
				<Link href={`${pathname}/${order._id}`}>
					<CusButton className='text-xs py-1 px-3'>ПОДРОБНЕЕ</CusButton>
				</Link>
			</div>
		</Fieldset>
	)
}
