import CusAccordion from '@/shared/components/CusAccordion/CusAccordion'
import CustomTabPanel from '@/shared/components/CustomTabPanel/CustomTabPanel'
import { useMiniLoader } from '@/shared/model/store/storeMiniLoader'
import { TWithoutPassUser } from '@/shared/model/types/Types'
import CusButton from '@/shared/ui/CusButton'
import MiniLoader from '@/shared/ui/loaders/MiniLoader'
import { Tab, Tabs } from '@mui/material'
import { useParams } from 'next/navigation'
import { SyntheticEvent, useCallback, useState } from 'react'
import { FaTrashRestore } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { TDetail } from '../../../../Server/Service/serviceOrder/model/types/Types'
import { fetchGetDataDetailsOrder } from '../api/fetchGetDataOrder'
import { TOrders } from '../model/Types'
import CardDetail from './CardDetail'

import { CiSquarePlus } from 'react-icons/ci'

export default function CardOrder({ data, counterParty }: TOrders) {
	const params = useParams() as { INN: string; PHONE: string }
	const { safeDeleted, numberOrder } = data
	const [valueTab, setValueTab] = useState(0)
	const [details, setDetails] = useState<TDetail[]>([])
	const [employees, setEmployees] = useState<TWithoutPassUser[]>([])
	const [visibleLoader, setVisibleLoader] = useMiniLoader((state) => [
		state.visible,
		state.setVisibleLoader,
	])

	const handlerChangeTabs = useCallback((event: React.SyntheticEvent, newValue: number) => {
		setValueTab(newValue)
	}, [])

	const handlerChangeAccordion = async (e: SyntheticEvent, expand: boolean) => {
		if (!expand) return
		setVisibleLoader(true)
		const getDataDetails = await fetchGetDataDetailsOrder(params.INN, data.id, params.PHONE)
		setDetails(getDataDetails!)
		setVisibleLoader(false)
	}
	const restoreOrder = async () => {}

	const deletedDetail = async () => {}

	const addDetailFromOrder = async (e: React.MouseEvent) => {
		e.preventDefault()
	}

	return (
		<CusAccordion titleAccordion={numberOrder} onChange={handlerChangeAccordion}>
			<div className='grid grid-cols-2'>
				{safeDeleted ? (
					<CusButton onClick={restoreOrder}>
						<FaTrashRestore />
					</CusButton>
				) : (
					<ul className=' grid grid-cols-2 gap-1 pb-1 pt-1'>
						{counterParty.data.map((el, index) => (
							<li key={index} className=' col-span-1'>
								{el.description}
							</li>
						))}
					</ul>
				)}
			</div>
			<hr />
			{visibleLoader ? <MiniLoader /> : <></>}
			<Tabs value={valueTab} onChange={handlerChangeTabs}>
				{details.map((el, index) => (
					<Tab
						key={index}
						label={
							<span>
								{`Деталь ${index + 1}`}
								<CusButton onClick={deletedDetail}>
									<MdDeleteForever />
								</CusButton>
							</span>
						}
					></Tab>
				))}
				<Tab
					label={
						<CusButton onClick={addDetailFromOrder}>
							<CiSquarePlus />
						</CusButton>
					}
				></Tab>
			</Tabs>

			<ul>
				{details.map((el, index) => (
					<CustomTabPanel index={index} value={valueTab} key={index}>
						<CardDetail data={el} employees={employees} />
					</CustomTabPanel>
				))}
			</ul>
		</CusAccordion>
	)
}
