'use client'
import { FetchOrder } from '@/shared/api'
import PanelViewMode from '@/shared/components/panelViewMode/PanelViewMode'
import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import CusButton from '@/shared/ui/button/ui/CusButton'
import CusConfigProvider from '@/shared/ui/CusConfigProvider/ui/CusConfigProvider'
import { Checkbox, CheckboxChangeEvent, DatePicker, Input } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import { debounce } from 'ts-debounce'
import { TDateSearch, TRulePanelOrder } from '../model/Type'

// ... existing code ...

export default function PanelControlOrder({ permission, setLoader, setViewMode, viewMode, load, totalOrder, setDataOrder }: TRulePanelOrder) {
	
	const { configMain } = useConfigApp((state) => state.dataConfigApp)
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()
	const params = useParams()
	const INN = params!.INN as string


	useEffect(() => {
		setLoader(true)
	const completed = searchParams!.get('completed') === 'true' 
	const deleted = searchParams!.get('deleted') === 'true'
	const dateStartStr = searchParams!.get('dateStart')
	const dateEndStr = searchParams!.get('dateEnd')


	const dateStart = dateStartStr ? new Date(dateStartStr) : undefined
	const dateEndDate = dateEndStr ? new Date(dateEndStr) : new Date()

	FetchOrder.getOrders({
		INN,
		completed,
		deleted,
		option: { pagination: { offset: 1, limit: 20 } },
		dateStart,
		dateEndDate,
	})
		.then(res=>{
			setDataOrder(res)
			setLoader(false)
		})
	
}, [searchParams, INN, setLoader, setDataOrder])


	const setDate = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
		const params = new URLSearchParams(searchParams!.toString())
		
		if (dates && dates[0] && dates[1]) {
			params.set('dateStart', dates[0].toISOString())
			params.set('dateEnd', dates[1].toISOString())
		} else {
			params.delete('dateStart')
			params.delete('dateEnd')
		}

		router.push(`${pathname}?${params.toString()}`)
	}

	
	const filterDeleted = async (e: CheckboxChangeEvent) => {
		const checked = e.target.checked
		const params = new URLSearchParams(searchParams!.toString())
		params.set('deleted', String(checked))
		router.push(`${pathname}?${params.toString()}`)
	}

	const filterCompleted = async (e: CheckboxChangeEvent) => {
		const checked = e.target.checked
		const params = new URLSearchParams(searchParams!.toString())
		params.set('completed', String(checked))
		router.push(`${pathname}?${params.toString()}`)
	}

	

	return (
		<ul
			className=' flex gap-2 items-center border-b-2 pb-2'
			style={{
				background: configMain?.color.bgColor,
				color: configMain?.color.textColor,
				borderColor: configMain?.color.borderColor,
			}}
		>
			<li className=''>
				{permission && (
					<Link href={`${pathname}/NEW_ORDER`}>
						<CusButton className='p-2' disabled={load}>
							<FaPlus />
						</CusButton>
					</Link>
				)}
			</li>
			<li>
				<div className='flex'>
					{/* ... (поиск пока отключен) ... */}
				</div>
			</li>
			<li>
				<DatePicker.RangePicker
					disabled={load}
					onChange={setDate}
					value={
						searchParams!.get('dateStart') && searchParams!.get('dateEnd')
							? [
									dayjs(searchParams!.get('dateStart')),
									dayjs(searchParams!.get('dateEnd')),
							  ]
							: null
					}
					placeholder={['Начальная дата', 'Конечная дата']}
					style={{ width: '100%' }}
				/>
			</li>
			<li>
				<ul className='flex gap-2 items-center'>
					<li className='flex border-2 p-1 pl-2 gap-1  items-center'>
						<label className='block text-xs  rounded-sm'>удаленные</label>
						<Checkbox
							checked={searchParams!.get('deleted') === 'true'}
							onChange={filterDeleted}
						/>
					</li>
					<li className=' flex border-2 p-1 gap-1 pl-2 items-center'>
						<label className='block text-xs  rounded-sm'>завершенные</label>
						<Checkbox
							checked={searchParams!.get('completed') === 'true'}
							onChange={filterCompleted}
						/>
					</li>
				</ul>
			</li>
			<li className=' flex gap-0 ml-2'>
				<PanelViewMode load={load} setViewMode={setViewMode} viewMode={viewMode} />
			</li>
		</ul>
	)
}
