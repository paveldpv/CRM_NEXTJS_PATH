'use client'
import PanelViewMode from '@/shared/components/panelViewMode/PanelViewMode'
import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import CusButton from '@/shared/ui/button/ui/CusButton'
import CusConfigProvider from '@/shared/ui/CusConfigProvider/ui/CusConfigProvider'
import { Checkbox, CheckboxChangeEvent, DatePicker, Input } from 'antd'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import { debounce } from 'ts-debounce'
import { TDateSearch, TRulePanelOrder } from '../model/Type'
import Link from 'next/link'

export default function PanelControlOrder({
	permission,	
	setLoader,
	setViewMode,
	viewMode,
	load,totalOrder
}: TRulePanelOrder) {
	const [valueSearch, setValueSearch] = useState('')
	const [dateSearch, setDateSearch] = useState<TDateSearch | null>()
	const { configMain } = useConfigApp((state) => state.dataConfigApp)
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()		


	const handlerSearch = useCallback(async () => {
		if (!valueSearch) return
		debounce(async () => {
			setLoader(true)
			//set data search
			//TODO:
			setLoader(false)
		}, 1000)
	}, [])

	

	const filterDeleted = async (e: CheckboxChangeEvent) => {
		setLoader(true)
		const checked = e.target.checked		
		const params = new URLSearchParams(searchParams!.toString())
		params.set('deleted', String(checked))
		//setDataOrder
		router.push(`${pathname}?${params.toString()}`)
		setLoader(false)
	}

	const filterCompleted = async (e: CheckboxChangeEvent) => {
		setLoader(true)
		const checked = e.target.checked
		const params = new URLSearchParams(searchParams!.toString())
		params.set('completed', String(checked))
		//setDataOrder
		router.push(`${pathname}?${params.toString()}`)
		setLoader(false)
	}

	return (
		<ul className=' flex gap-2 items-center border-b-2 pb-2'>
			<li className=''>
				{permission && (
					<Link href={`${pathname}/NEW_ORDER`}>
						<CusButton className='p-2'  disabled={load}>
							<FaPlus />
						</CusButton>
					</Link>
				)}
			</li>
			<li>
				<div className='flex'>
					<CusConfigProvider >
						<Input
							disabled={load || totalOrder == 0}
							placeholder='Поиск...'
							value={valueSearch}
							onChange={(e) => setValueSearch(e.target.value)}
							prefix={<FaSearch />}
							className='w-64 rounded-r-none '
							onPressEnter={handlerSearch}
						/>
					</CusConfigProvider>
					<CusButton onClick={handlerSearch} className='rounded-l-none'>
						<FaSearch />
					</CusButton>
				</div>
			</li>
			<li>
				<DatePicker.RangePicker
					disabled={load}
					onChange={(dates) => {
						if (dates && dates[0] && dates[1]) {
							setDateSearch({
								dateStart: dates[0].toDate(),
								dateEndDate: dates[1].toDate() || Date.now(),
							})
						} else {
							setDateSearch(null)
						}
					}}
					placeholder={['Начальная дата', 'Конечная дата']}
					style={{ width: '100%' }}
				/>
			</li>
			<li>
				<ul className='flex gap-2 items-center'>
					<li className='flex border-2 p-1 pl-2 gap-1  items-center'>
						<label className='block text-xs  rounded-sm'>удаленные</label>
						<Checkbox onChange={filterDeleted} />
					</li>
					<li className=' flex border-2 p-1 gap-1 pl-2 items-center'>
						<label className='block text-xs  rounded-sm'>завершенные</label>
						<Checkbox onChange={filterCompleted} />
					</li>
				</ul>
			</li>
			<li className=' flex gap-0 ml-2'>
				<PanelViewMode load={load} setViewMode={setViewMode} viewMode={viewMode} />
			</li>
		</ul>
	)
}
