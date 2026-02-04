'use client'
import PanelViewMode from '@/shared/components/panelViewMode/PanelViewMode'
import CusButton from '@/shared/ui/button/ui/CusButton'
import { Checkbox, CheckboxChangeEvent, ConfigProvider, DatePicker, Input } from 'antd'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import { debounce } from 'ts-debounce'
import { TDateSearch, TRulePanelOrder } from '../model/Type'
import { useConfigApp } from '@/shared/model/store/storeConfigApp'

export default function PanelControlOrder({
	permission,
	setOpenForm,
	setDataOrder,
	setLoader,
	setViewMode,
	viewMode,
	load,
}: TRulePanelOrder) {
	const [valueSearch, setValueSearch] = useState('')
	const [dateSearch, setDateSearch] = useState<TDateSearch | null>()
	const {configMain}=useConfigApp(state=>state.dataConfigApp)
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

	const addNewOrder = async () => {
		setOpenForm(true)
	}

	const filterDeleted = async (e: CheckboxChangeEvent) => {
		setLoader(true)
		const checked = e.target.checked
		console.log('🚀 ~ filterDeleted ~ checked:', e.target)
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
					<CusButton className='p-2' onClick={addNewOrder} disabled={load}>
						<FaPlus />
					</CusButton>
				)}
			</li>
			<li>
				<div className='flex'>
					<ConfigProvider
						theme={{
							token: {
								colorPrimary: configMain?.color.borderColor,
								colorPrimaryHover: configMain?.color.bgColor,
							},
						}}
					>
						<Input
							disabled={load}
							placeholder='Поиск...'
							value={valueSearch}
							onChange={(e) => setValueSearch(e.target.value)}
							prefix={<FaSearch />}
							className='w-64 rounded-r-none '
							onPressEnter={handlerSearch}
						/>
					</ConfigProvider>
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
					<li className='flex border-2 p-1 gap-1  items-center'>
						<label className='block text-xs  rounded-sm'>удаленные</label>
						<Checkbox onChange={filterDeleted} />
					</li>
					<li className=' flex border-2 p-1 gap-1 items-center'>
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
