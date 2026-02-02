import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import PanelViewMode from '@/shared/components/panelViewMode/PanelViewMode'
import CusButton from '@/shared/ui/button/ui/CusButton'
import { Button, Checkbox, CheckboxChangeEvent, DatePicker, Input } from 'antd'
import { useCallback, useState } from 'react'
import { FaPlus, FaSearch, FaTools } from 'react-icons/fa'
import { debounce } from 'ts-debounce'
import { TDateSearch, TRulePanelOrder } from '../model/Type'
import { useSearchParams, usePathname } from 'next/navigation'
import { useRouter } from 'next/router'

export default function PanelControlOrder({
	permission,
	serOpenForm,
	setDataOrder,
	setLoader,
	setViewMode,
	viewMode,
	load,
}: TRulePanelOrder) {
	const [valueSearch, setValueSearch] = useState('')
	const [dateSearch, setDateSearch] = useState<TDateSearch | null>()
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
		serOpenForm(true)
	}
	const filterDeleted = async (e: CheckboxChangeEvent) => {
		setLoader(true)
		const checked = e.target.value
		const params = new URLSearchParams(searchParams!.toString())
		params.set('deleted', String(checked))
		//setDataOrder
		router.push(`${pathname}?${params.toString()}`)
		setLoader(false)
	}
	const filterCompleted = async (e: CheckboxChangeEvent) => {
		setLoader(true)
		const checked = e.target.value
		const params = new URLSearchParams(searchParams!.toString())
		params.set('completed', String(checked))
		//setDataOrder
		router.push(`${pathname}?${params.toString()}`)
		setLoader(false)
	}

	return (
		<Fieldset legend={<FaTools />} className=' row-span-1 w-14'>
			<ul>
				<li className='border-l-2'>
					{permission && (
						<CusButton className='p-2' onClick={addNewOrder} disabled={load}>
							<FaPlus />
						</CusButton>
					)}
				</li>
				<li>
					<div className='flex'>
						<Input
							disabled={load}
							placeholder='Поиск...'
							value={valueSearch}
							onChange={(e) => setValueSearch(e.target.value)}
							prefix={<FaSearch />}
							className='w-64 rounded-r-none'
							onPressEnter={handlerSearch}
						/>
						<Button type='primary' icon={<FaSearch />} onClick={handlerSearch} className='rounded-l-none' />
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
					<ul>
						<li>
							<label className='block text-sm mb-1'>Показать удаленные</label>
							<Checkbox onChange={filterDeleted} />
						</li>
						<li>
							<label className='block text-sm mb-1'>Показать завершенные</label>
							<Checkbox onChange={filterCompleted} />
						</li>
					</ul>
				</li>
				<li className=' flex gap-0 ml-2'>
					<PanelViewMode load={load} setViewMode={setViewMode} viewMode={viewMode} />
				</li>
			</ul>
		</Fieldset>
	)
}
